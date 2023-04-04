import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FITEBASE_API_KEY,
  authDomain: process.env.REACT_APP_FITEBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FITEBASE_PRODUCTID,
  storageBucket: process.env.REACT_APP_FITEBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FITEBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FITEBASE_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const googleSignIn = async () =>
  await signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    console.log(user);
    return user;
  });

export const googleSignOut = async () => await signOut(auth);
