// Change a field in the firebase document when a card is opened

import { doc, updateDoc } from 'firebase/firestore';
import db from './FirebaseConfig';

export const changeChallengeOpen = async (challengeId) => {
  try {
    const challengeRef = doc(db, 'challenges', challengeId);
    await updateDoc(challengeRef, {
      isOpened: true,
    });
    console.log('Document updated successfully');
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};
