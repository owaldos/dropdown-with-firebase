import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";;

const firebaseConfig = {
  apiKey: "AIzaSyDJqeoHAtPvxA2LzLSc8vjyJKAgg1ipADI",
  authDomain: "dropdown-oswaldo-salas-e0863.firebaseapp.com",
  databaseURL: "https://dropdown-oswaldo-salas-e0863-default-rtdb.firebaseio.com",
  projectId: "dropdown-oswaldo-salas-e0863",
  storageBucket: "dropdown-oswaldo-salas-e0863.appspot.com",
  messagingSenderId: "171382307621",
  appId: "1:171382307621:web:3532b9dcc35b3d272b78cc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db;