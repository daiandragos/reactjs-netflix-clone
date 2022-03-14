import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtVCdwjNv-L-FISGYEyFORY2N9ge5tkvw",
  authDomain: "netflix-clone-app-d170e.firebaseapp.com",
  projectId: "netflix-clone-app-d170e",
  storageBucket: "netflix-clone-app-d170e.appspot.com",
  messagingSenderId: "866018915383",
  appId: "1:866018915383:web:5e6caa6ced305c8475fbb2",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(firebaseApp);

export { auth };
export default db;
