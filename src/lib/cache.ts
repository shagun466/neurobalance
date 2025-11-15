export class LRUCache<K, V> {
  private map = new Map<K, V>()
  constructor(private capacity: number = 50) {}
  get(key: K) {
    if (!this.map.has(key)) return undefined
    const v = this.map.get(key) as V
    this.map.delete(key)
    this.map.set(key, v)
    return v
  }
  set(key: K, value: V) {
    if (this.map.has(key)) this.map.delete(key)
    this.map.set(key, value)
    if (this.map.size > this.capacity) {
      const k = this.map.keys().next().value as K
      this.map.delete(k)
    }
  }
}
