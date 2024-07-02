// src/Firebase/addChallenge.jsx

import { collection, addDoc } from 'firebase/firestore';
import db from './FirebaseConfig';

const addChallenge = async (challengeData) => {
  try {
    const docRef = await addDoc(collection(db, 'challenges'), challengeData);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

export default addChallenge;
