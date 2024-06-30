import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAF2MjPXnIh11sFLcBB9zLfbt-CFXfrzR0",
  authDomain: "fir-1e452.firebaseapp.com",
  projectId: "fir-1e452",
  storageBucket: "fir-1e452.appspot.com",
  messagingSenderId: "863830188049",
  appId: "1:863830188049:web:61048ce8211d010d0951b0",
  measurementId: "G-YV5CEKNLWE"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth ,getStorage,ref};
