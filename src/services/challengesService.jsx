// src/services/challengeService.js

export const resetChallenges = (challenges) => {
  return challenges.map((challenge) => {
    return {
      ...challenge,
      isOpened: false,
      completed: 2,
    };
  });
};
export const shuffleChallenges = (challenges) => {
  let newArray = challenges.slice();
  newArray.sort(() => Math.random() - 0.5);
  return newArray;
};

export const resetAndShuffleChallenges = (challenges) => {
  const resettedChallenges = resetChallenges(challenges);
  const resettedAndShuffledChallenges = shuffleChallenges(resettedChallenges);

  return resettedAndShuffledChallenges;
};
