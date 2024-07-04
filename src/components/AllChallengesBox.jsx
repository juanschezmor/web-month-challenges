import React, { useEffect } from 'react';
import { useGlobalContext } from '../context/Context';
import ChallengeBox from './ChallengeBox';

function AllChallengesBox() {
  const { challenges } = useGlobalContext();
  useEffect(() => {}, [challenges]);

  console.log('challenges:', challenges);
  const sortedChallenges = [...challenges].sort((a, b) => a.order - b.order);
  return (
    <div className="container my-5 py-5">
      <h1>Challenges</h1>
      <div className="challenges-box">
        <div className="row header-challenges ">
          <span className="col-4">
            <p className="">Type</p>
          </span>
          <span className="col-4">
            <p className="">Challenge</p>
          </span>
        </div>
        {sortedChallenges.map((challenge) => (
          <ChallengeBox key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
}

export default AllChallengesBox;
