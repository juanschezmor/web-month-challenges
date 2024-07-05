// src/services/firebaseService.js
import { collection, getDocs, addDoc, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';
import db from '../../firebase';

/* CHALLENGES */
export const fetchChallenges = async () => {
  const challengesCollection = collection(db, 'challenges');
  const challengesSnapshot = await getDocs(challengesCollection);
  return challengesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addChallenge = async (challengeData) => {
  try {
    const docRef = await addDoc(collection(db, 'challenges'), challengeData);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

export const deleteChallenge = async (challengeId) => {
  try {
    await deleteDoc(doc(db, 'challenges', challengeId));
    console.log('Document deleted successfully');
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

export const updateChallengeOpened = async (challengeId) => {
  try {
    const challengeRef = doc(db, 'challenges', challengeId);
    await updateDoc(challengeRef, {
      isOpened: true,
    });
    console.log('Document updated successfully');
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const updateChallengeCompleted = async (challengeId, value) => {
  try {
    const challengeRef = doc(db, 'challenges', challengeId);
    await updateDoc(challengeRef, {
      completed: value,
    });
    console.log('Document updated successfully');
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const resetChallengesInFirestore = async () => {
  const challengesCollection = collection(db, 'challenges');
  const challengesSnapshot = await getDocs(challengesCollection);
  const resetPromises = challengesSnapshot.docs.map((challenge) =>
    updateDoc(doc(db, 'challenges', challenge.id), { isOpened: false, completed: 2 }),
  );
  await Promise.all(resetPromises);
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const shuffleChallengesInFirestore = async () => {
  const challengesCollection = collection(db, 'challenges');
  const challengesSnapshot = await getDocs(challengesCollection);
  const shuffledChallenges = challengesSnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));

  // Reordenar aleatoriamente los desafíos
  shuffle(shuffledChallenges);

  // Actualizar el campo 'order' con los nuevos índices aleatorios
  const shufflePromises = shuffledChallenges.map((challenge, index) =>
    updateDoc(doc(db, 'challenges', challenge.id), { order: index }),
  );

  await Promise.all(shufflePromises);
};

/* MAX POINTS */
export const fetchMaxPoints = async () => {
  const pointsDoc = doc(db, 'points', 'points');
  const pointsSnapshot = await getDoc(pointsDoc); // Correct usage
  return pointsSnapshot.data().max_points;
};

export const updateMaxPointsInFirestore = async (maxPoints) => {
  try {
    const userRef = doc(db, 'points', 'points');
    await updateDoc(userRef, {
      max_points: maxPoints,
    });
    console.log('Max points updated successfully');
  } catch (error) {
    console.error('Error updating max points: ', error);
    throw error;
  }
};

/* POINTS */
export const fetchPoints = async () => {
  const pointsDoc = doc(db, 'points', 'points');
  const pointsSnapshot = await getDoc(pointsDoc);
  return pointsSnapshot.data().num_points;
};

export const updatePointsInFirestore = async (points) => {
  try {
    const userRef = doc(db, 'points', 'points');
    await updateDoc(userRef, {
      num_points: points,
    });
    console.log('Points updated successfully');
  } catch (error) {
    console.error('Error updating points:', error);
    throw error;
  }
};

/* REWARDS */

export const fetchRewards = async () => {
  const rewardsCollection = collection(db, 'rewards');
  const rewardsSnapshot = await getDocs(rewardsCollection);
  return rewardsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addReward = async (rewardData) => {
  try {
    const docRef = await addDoc(collection(db, 'rewards'), rewardData);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

export const deleteReward = async (rewardId) => {
  try {
    await deleteDoc(doc(db, 'rewards', rewardId));
    console.log('Document deleted successfully');
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};
