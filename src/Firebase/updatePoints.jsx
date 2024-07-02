//update points in firebase
import { doc, updateDoc } from 'firebase/firestore';
import db from './FirebaseConfig';

export const updatePoints = (points) => {
  try {
    const userRef = doc(db, 'points', 'points');
    updateDoc(userRef, {
      num_points: points,
    });
    console.log('Points updated successfully');
  } catch (error) {
    console.error('Error updating points: ', error);
    throw error;
  }
};

export const updateMaxPoints = (maxPoints) => {
  try {
    const userRef = doc(db, 'points', 'points');
    updateDoc(userRef, {
      max_points: maxPoints,
    });
    console.log('Max points updated successfully');
  } catch (error) {
    console.error('Error updating max points: ', error);
    throw error;
  }
};
