import React, { useState } from 'react';
import { useGlobalContext } from '../context/Context';
import { CHALLENGE_TYPES } from '../utils/constants';

function AddChallengeBox() {
  const [type, setType] = useState('');
  const [challenge, setChallenge] = useState('');
  const { addChallenge, totalChallenges } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const challengeData = { type, challenge, isOpened: false, completed: 2, order: totalChallenges };
      console.log('Challenge data: ', challengeData);

      await addChallenge(challengeData);

      setType('');
      setChallenge('');
    } catch (error) {
      console.error('Error adding challenge: ', error);
    }
  };

  return (
    <div className="row add-challenge-container">
      <div className="add-challenge-form">
        <h2>Add Challenge</h2>
        <form className="w-100" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <select className="form-select" id="type" value={type} onChange={(e) => setType(e.target.value)} required>
              <option value="">Select a type</option>
              {CHALLENGE_TYPES.map((typeOption) => (
                <option key={typeOption} value={typeOption}>
                  {typeOption}
                </option>
              ))}
            </select>
          </div>
          <div className="w-100 mb-3">
            <label htmlFor="challenge" className="form-label">
              Challenge
            </label>
            <textarea
              className="form-control w-100"
              id="challenge"
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
            ></textarea>
          </div>
          <div className="d-flex justify-content-center align-items-center w-100">
            <button type="submit" className="generic-button">
              Add Challenge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddChallengeBox;
