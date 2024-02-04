import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCcf7kWbYdRKjWEzP-eNakUs6dRxao6gEc',
  authDomain: 'music-b9fad.firebaseapp.com',
  projectId: 'music-b9fad',
  storageBucket: 'music-b9fad.appspot.com',
  appId: '1:850746271173:web:2dc9ebe62e888468ea17ac'
}

const firebaseApp = initializeApp(firebaseConfig)

const firebaseDB = getFirestore(firebaseApp)

const firebaseStorage = getStorage(firebaseApp)

const firebaseCollections = {
  "users": collection(firebaseDB, "users"),
  "songs": collection(firebaseDB, "songs")
}


const auth = getAuth()

export default firebaseApp
export { firebaseDB, firebaseCollections, auth, firebaseStorage }
