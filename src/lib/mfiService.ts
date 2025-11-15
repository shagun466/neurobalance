import { auth } from './firebase'
import { LRUCache } from './cache'

export type MfiInput = {
  sentiment: number
  activity: number
  rest: number
}

const cache = new LRUCache<string, number>(100)
const inflight = new Map<string, Promise<number>>()

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n))
}

async function hashInput(input: MfiInput) {
  const s = `${clamp(input.sentiment)}|${clamp(input.activity)}|${clamp(input.rest)}`
  const enc = new TextEncoder().encode(s)
  const digest = await crypto.subtle.digest('SHA-256', enc)
  const arr = Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('')
  return arr
}

function fallbackScore(input: MfiInput) {
  const s = clamp(input.sentiment)
  const a = clamp(input.activity)
  const r = clamp(input.rest)
  return Math.round(0.4 * s + 0.3 * a + 0.3 * r)
}

export async function computeMfi(input: MfiInput) {
  const key = await hashInput(input)
  const cached = cache.get(key)
  if (cached !== undefined) return cached
  if (inflight.has(key)) return inflight.get(key) as Promise<number>
  const p = (async () => {
    const token = await auth.currentUser?.getIdToken(true)
    const controller = new AbortController()
    const t = setTimeout(() => controller.abort(), 450)
    try {
      const resp = await fetch('http://localhost:8000/api/mfi/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ sentiment: clamp(input.sentiment), activity: clamp(input.activity), rest: clamp(input.rest) }),
        signal: controller.signal
      })
      clearTimeout(t)
      if (!resp.ok) throw new Error('Bad response')
      const data = await resp.json()
      const mfi = clamp(Number(data.mfi))
      cache.set(key, mfi)
      return mfi
    } catch {
      const mfi = fallbackScore(input)
      cache.set(key, mfi)
      return mfi
    } finally {
      inflight.delete(key)
    }
  })()
  inflight.set(key, p)
  return p
}
