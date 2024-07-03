import { resetChallenges } from '../Firebase/resetChallenges';

export const shuffleChallenges = async (challenges) => {
  try {
    await resetChallenges();
    const shuffledChallenges = challenges.sort(() => Math.random() - 0.5);
    console.log('Challenges shuffled successfully');
    return shuffledChallenges;
  } catch (error) {
    console.error('Error shuffling challenges: ', error);
    throw error;
  }
};
