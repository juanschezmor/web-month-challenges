import React from 'react';
import { useGlobalContext } from '../context/Context';
function ChallengeBox({ challenge }) {
  const { deleteChallenge } = useGlobalContext();

  const handleDeleteButton = () => {
    deleteChallenge(challenge.id);
  };

  return (
    <div className="row challenge-box">
      <span className="col-4">
        <p className="">{challenge.type}</p>
      </span>
      <span className="col-6">
        <p className="">{challenge.challenge}</p>
      </span>
      <div className="col-2 d-flex justify-content-center align-items-center">
        <button type="button" className="btn-close" aria-label="Close" onClick={handleDeleteButton} />
      </div>
    </div>
  );
}

export default ChallengeBox;
