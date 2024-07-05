import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../context/Context';
import Reward from './Reward';
import { dropIn } from '../utils/ModalDropIn.js';

const RewardsModal = ({ closeModal }) => {
  const { addReward, rewards, deleteReward } = useGlobalContext();
  const [inputPointsRequired, setInputPointsRequired] = useState('');
  const [inputReward, setInputReward] = useState('');
  const [tab, setTab] = useState('showRewards');

  const switchTab = () => {
    setTab(tab === 'showRewards' ? 'addReward' : 'showRewards');
  };

  const handlePointsRequiredInputChange = (e) => {
    const { value } = e.target;
    setInputPointsRequired(value);
  };

  const handleRewardInputChange = (e) => {
    setInputReward(e.target.value);
  };

  const handleSubmit = async () => {
    // Validar que inputPointsRequired sea un número antes de continuar
    const pointsRequired = parseInt(inputPointsRequired);
    if (isNaN(pointsRequired)) {
      alert('Please enter a valid number for points required.');
      return;
    }

    const rewardData = { pointsRequired, reward: inputReward };
    await addReward(rewardData);
    setInputPointsRequired('');
    setInputReward('');
  };
  const sortedRewards = rewards.slice().sort((a, b) => a.pointsRequired - b.pointsRequired);

  return (
    <div className="modal">
      <motion.div className="rewards-modal-content" variants={dropIn} initial="hidden" animate="visible" exit="exit">
        <button type="button" className="btn-close" aria-label="Close" onClick={closeModal} />
        <div className="rewards-modal-body">
          <div className="tabs d-flex justify-content-center align-items-center mb-3">
            <a className="generic-button" onClick={switchTab}>
              {tab === 'showRewards' ? 'Add Reward' : 'Show Rewards'}
            </a>
          </div>

          {tab === 'showRewards' && (
            <>
              <div className="row header-challenges mt-4">
                <span className="col-4 text-center">Required Points 🎯</span>
                <span className="col-6 text-center">Reward 🏆</span>
                <span className="col-2 text-center"></span>
              </div>
              <hr />
              {sortedRewards.map((reward) => (
                <Reward key={reward.id} reward={reward} deleteReward={deleteReward} />
              ))}
            </>
          )}
          {tab === 'addReward' && (
            <div className="form-reward">
              <div className="form-group">
                <label htmlFor="inputPointsRequired">Points required:</label>
                <input
                  type="text"
                  id="inputPointsRequired"
                  name="inputPointsRequired"
                  onChange={handlePointsRequiredInputChange}
                  value={inputPointsRequired}
                  className="form-control"
                  placeholder="Enter points required"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputReward">Reward:</label>
                <textarea
                  type="text"
                  id="inputReward"
                  name="inputReward"
                  onChange={handleRewardInputChange}
                  value={inputReward}
                  className="form-control w-75"
                  placeholder="Enter reward"
                  required
                />
              </div>
              <button type="button" onClick={handleSubmit} className="generic-button">
                Add Reward
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RewardsModal;
