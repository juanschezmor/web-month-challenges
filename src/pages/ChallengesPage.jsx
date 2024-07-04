import React, { useState } from 'react';
import { useGlobalContext } from '../context/Context';
import AddChallengeBox from '../components/AddChallengeBox';
import AllChallengesBox from '../components/AllChallengesBox';

function ChallengesPage() {
  return (
    <div className="container mt-4">
      <AddChallengeBox />
      <AllChallengesBox />
    </div>
  );
}

export default ChallengesPage;
