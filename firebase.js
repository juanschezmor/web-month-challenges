// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCkb7He4lGWCoCoY9Sh1lCQV75BknpiM_I',
  authDomain: 'hive-challenges.firebaseapp.com',
  projectId: 'hive-challenges',
  storageBucket: 'hive-challenges.appspot.com',
  messagingSenderId: '280742580629',
  appId: '1:280742580629:web:cb854d5904e5f5df92a69c',
  measurementId: 'G-BYQXVET3ZW',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
