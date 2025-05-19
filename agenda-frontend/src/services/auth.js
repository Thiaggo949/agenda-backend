import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const login = async (email, senha) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, senha);
  return userCredential.user.getIdToken();
};
