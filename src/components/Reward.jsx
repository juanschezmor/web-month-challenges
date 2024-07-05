import React from 'react';

function Reward({ reward, deleteReward }) {
  const handleDeleteButtonClick = () => {
    deleteReward(reward.id);
  };
  return (
    <div className="row">
      <p className="col-4 text-center">{reward.pointsRequired}</p>
      <p className="col-6 text-center">{reward.reward}</p>
      <div className="col-2 d-flex justify-content-center align-items-center">
        <button typle="button" className="btn btn-close" aria-label="" onClick={handleDeleteButtonClick}></button>
      </div>
    </div>
  );
}

export default Reward;
