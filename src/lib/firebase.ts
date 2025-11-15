import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics, isSupported } from 'firebase/analytics'

const app = initializeApp({
  apiKey: 'AIzaSyDABtdDrtbwttQ17uGgqnzY8x9mP8a7uDo',
  authDomain: 'neuro2-a5646.firebaseapp.com',
  projectId: 'neuro2-a5646',
  storageBucket: 'neuro2-a5646.firebasestorage.app',
  messagingSenderId: '360580501530',
  appId: '1:360580501530:web:32602183f9499ade1941a3',
  measurementId: 'G-3YK45KDY9V'
})

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

isSupported().then((supported) => {
  if (supported) getAnalytics(app)
})

export { app, auth, db, storage }
export const projectId = app.options.projectId as string
