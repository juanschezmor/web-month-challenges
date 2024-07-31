import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  fetchChallenges,
  addChallenge,
  deleteChallenge,
  updateChallengeOpened,
  updateChallengeCompleted,
  resetChallengesInFirestore,
  shuffleChallengesInFirestore,
  fetchMaxPoints,
  updateMaxPointsInFirestore,
  fetchPoints,
  updatePointsInFirestore,
  fetchRewards,
  addReward,
  deleteReward,
} from '../services/firebaseService';
import ConfettiExplosion from 'react-confetti-explosion';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [challenges, setChallenges] = useState([]);
  const [maxPoints, setMaxPoints] = useState(20);
  const [shownChallenges, setShownChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numChallenges, setNumChallenges] = useState(0);
  const [isExploding, setIsExploding] = useState(false);
  const [totalChallenges, setTotalChallenges] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  /* FETCH DATA */
  const fetchData = async () => {
    setLoading(true);
    const [fetchedPoints, fetchedMaxPoints, fetchedChallenges, fetchedRewards] = await Promise.all([
      fetchPoints(),
      fetchMaxPoints(),
      fetchChallenges(),
      fetchRewards(),
    ]);
    setPoints(fetchedPoints);
    setMaxPoints(fetchedMaxPoints);
    setChallenges(fetchedChallenges);
    setLoading(false);
    setTotalChallenges(fetchedChallenges.length);
    setRewards(fetchedRewards);
  };

  useEffect(() => {
    fetchData();
    setTotalChallenges(challenges.length);
  }, []);

  useEffect(() => {
    console.log('Challenges changed');
    if (challenges.length > 0 && maxPoints > 0 && maxPoints <= challenges.length) {
      const updatedShownChallenges = challenges.slice(0, maxPoints);
      setShownChallenges(updatedShownChallenges);
      setNumChallenges(updatedShownChallenges.length);
      setTotalChallenges(challenges.length);
    } else {
      setShownChallenges(challenges);
      setNumChallenges(challenges.length);
      setTotalChallenges(challenges.length);
    }
  }, [challenges, maxPoints]);

  /* CHALLENGES HANDLERS */
  const handleAddChallenge = async (challengeData) => {
    try {
      const challengeId = await addChallenge(challengeData);
      console.log('Challenge added with ID:', challengeId);
      challengeData = { ...challengeData, id: challengeId };
      const updatedChallenges = [...challenges, challengeData];
      setChallenges(updatedChallenges);
    } catch (error) {
      console.error('Error adding challenge:', error);
    }
  };
  const handleDeleteChallenge = async (challengeId) => {
    try {
      await deleteChallenge(challengeId);
      const updatedChallenges = challenges.filter((challenge) => challenge.id !== challengeId);
      setChallenges(updatedChallenges);
    } catch (error) {
      console.error('Error deleting challenge:', error);
    }
  };

  const handleUpdateChallengeOpened = async (challengeId) => {
    try {
      await updateChallengeOpened(challengeId);
      const updatedChallenges = challenges.map((challenge) => {
        if (challenge.id === challengeId) {
          return { ...challenge, isOpened: true };
        }
        return challenge;
      });
      setChallenges(updatedChallenges);
    } catch (error) {
      console.error('Error updating challenge:', error);
    }
  };

  const handleUpdateChallengeCompleted = async (challengeId, value) => {
    try {
      await updateChallengeCompleted(challengeId, value);
      const updatedChallenges = challenges.map((challenge) => {
        if (challenge.id === challengeId) {
          return { ...challenge, completed: value };
        }
        return challenge;
      });
      setChallenges(updatedChallenges);
    } catch (error) {
      console.error('Error updating challenge:', error);
    }
  };

  const handleResetAndShuffleChallenges = async () => {
    setLoading(true);
    await resetChallengesInFirestore();
    await shuffleChallengesInFirestore();
    await updatePointsInFirestore(0);
    fetchData();
    setPoints(0);
  };

  /* POINTS HANDLERS */
  const handleUpdatePoints = async (newPoints) => {
    setPoints(newPoints);
    await updatePointsInFirestore(newPoints);
  };

  /* MAX POINTS HANDLERS */
  const handleUpdateMaxPoints = async (newMaxPoints) => {
    setMaxPoints(newMaxPoints);
    await updateMaxPointsInFirestore(newMaxPoints);
  };

  /* CONFETTI HANDLERS */
  const handleSetExploding = (value) => {
    setIsExploding(value);
  };
  useEffect(() => {
    console.log('isExploding:', isExploding);
  }, [isExploding]);

  /* REWARDS HANDLERS */

  const handleAddReward = async (rewardData) => {
    try {
      const rewardId = await addReward(rewardData);
      console.log('Reward added with ID:', rewardId);
      rewardData = { ...rewardData, id: rewardId };
      const updatedRewards = [...rewards, rewardData];
      setRewards(updatedRewards);
    } catch (error) {
      console.error('Error adding reward:', error);
    }
  };
  console.log('Rewards:', rewards);

  const handleDeleteReward = async (rewardId) => {
    try {
      await deleteReward(rewardId);
      const updatedRewards = rewards.filter((reward) => reward.id !== rewardId);
      setRewards(updatedRewards);
    } catch (error) {
      console.error('Error deleting reward:', error);
    }
  };

  return (
    <Context.Provider
      value={{
        points,
        setPoints: handleUpdatePoints,
        maxPoints,
        setMaxPoints: handleUpdateMaxPoints,
        challenges,
        shownChallenges,
        numChallenges,
        loading,
        addChallenge: handleAddChallenge,
        deleteChallenge: handleDeleteChallenge,
        resetChallenges: handleResetAndShuffleChallenges,
        updateChallengeOpened: handleUpdateChallengeOpened,
        updateChallengeCompleted: handleUpdateChallengeCompleted,
        fetchData,
        isExploding,
        setIsExploding: handleSetExploding,
        totalChallenges,
        rewards,
        addReward: handleAddReward,
        deleteReward: handleDeleteReward,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useGlobalContext = () => useContext(Context);

export { Context, ContextProvider, useGlobalContext };
