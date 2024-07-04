import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useGlobalContext } from '../context/Context';
import { AnimatePresence, motion } from 'framer-motion';
import ConfettiExplosion from 'react-confetti-explosion';

function CardGallery() {
  const { shownChallenges, loading, isExploding, setIsExploding } = useGlobalContext();
  const [sortedChallenges, setSortedChallenges] = useState([]);

  useEffect(() => {
    if (shownChallenges && shownChallenges.length > 0 && Array.isArray(shownChallenges)) {
      const sorted = [...shownChallenges].sort((a, b) => a.order - b.order);
      setSortedChallenges(sorted);
    }
  }, [shownChallenges]);

  if (loading) {
    return <p className="text">Loading...</p>;
  }

  if (!sortedChallenges || sortedChallenges.length === 0 || !Array.isArray(sortedChallenges)) {
    return <p className="text">No challenges available.</p>;
  }

  return (
    <motion.div
      className="card-gallery"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {sortedChallenges.map((challenge, i) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <Card challenge={challenge} i={i} />
          </motion.div>
        ))}
      </AnimatePresence>
      {isExploding && (
        <ConfettiExplosion
          duration={5000}
          force={2}
          width={3000}
          onComplete={() => {
            setIsExploding(false);
            console.log('Confetti explosion completed');
          }}
        />
      )}
    </motion.div>
  );
}

export default CardGallery;
