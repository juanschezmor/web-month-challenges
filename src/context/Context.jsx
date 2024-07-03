import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  fetchChallenges,
  addChallenge,
  updateChallengeOpened,
  updateChallengeCompleted,
  resetChallengesInFirestore,
  shuffleChallengesInFirestore,
  fetchMaxPoints,
  updateMaxPointsInFirestore,
  fetchPoints,
  updatePointsInFirestore,
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

  /* FETCH DATA */
  const fetchData = async () => {
    setLoading(true);
    const [fetchedPoints, fetchedMaxPoints, fetchedChallenges] = await Promise.all([
      fetchPoints(),
      fetchMaxPoints(),
      fetchChallenges(),
    ]);
    setPoints(fetchedPoints);
    setMaxPoints(fetchedMaxPoints);
    setChallenges(fetchedChallenges);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (challenges.length > 0 && maxPoints > 0 && maxPoints <= challenges.length) {
      const updatedShownChallenges = challenges.slice(0, maxPoints);
      setShownChallenges(updatedShownChallenges);
      setNumChallenges(updatedShownChallenges.length);
    } else {
      setShownChallenges(challenges);
      setNumChallenges(challenges.length);
    }
  }, [challenges, maxPoints]);

  /* CHALLENGES HANDLERS */
  const handleAddChallenge = async (challengeData) => {
    try {
      await addChallenge(challengeData);
      const updatedChallenges = [...challenges, challengeData];
      setChallenges(updatedChallenges);
    } catch (error) {
      console.error('Error adding challenge:', error);
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
  return (
    <Context.Provider
      value={{
        points,
        setPoints: handleUpdatePoints,
        maxPoints,
        setMaxPoints: handleUpdateMaxPoints,
        challenges: shownChallenges,
        numChallenges,
        loading,
        addChallenge: handleAddChallenge,
        resetChallenges: handleResetAndShuffleChallenges,
        updateChallengeOpened: handleUpdateChallengeOpened,
        updateChallengeCompleted: handleUpdateChallengeCompleted,
        fetchData,
        isExploding,
        setIsExploding: handleSetExploding,
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
