import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCQiIIqvDrHCsZvjjUik5FO1vr4tpuULMQ",
  authDomain: "th-d-shops-be.firebaseapp.com",
  projectId: "th-d-shops-be",
  storageBucket: "th-d-shops-be.appspot.com",
  messagingSenderId: "449833903149",
  appId: "1:449833903149:web:8e4fda24bdc5e0ff0a04a4",
  measurementId: "G-GJSHLEJ3ED"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth()
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account',
})
export const googleSignIn = async () => await signInWithPopup(auth, provider).then((result)=>{
  const user = result.user;
  console.log(user)
  return user;
})

export const googleSignOut = async () => await signOut(auth)
