import { db } from './firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export async function logEvent(type: string, data: Record<string, unknown>) {
  await addDoc(collection(db, 'audit_logs'), {
    type,
    data,
    createdAt: serverTimestamp()
  })
}