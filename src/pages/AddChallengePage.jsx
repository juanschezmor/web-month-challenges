import React, { useState } from 'react';
import { useGlobalContext } from '../context/Context';
import { CHALLENGE_TYPES } from '../utils/constants';

function AddChallengePage() {
  const [type, setType] = useState('');
  const [challenge, setChallenge] = useState('');
  const { addChallenge, num_challenges } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(num_challenges);
      const challengeData = { type, challenge, isOpened: false, completed: 2, order: num_challenges };
      console.log('Challenge data: ', challengeData);

      await addChallenge(challengeData);

      setType('');
      setChallenge('');
    } catch (error) {
      console.error('Error adding challenge: ', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Challenge</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="mb-3">
          <label htmlFor="challenge" className="form-label">
            Challenge
          </label>
          <textarea
            className="form-control"
            id="challenge"
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="generic-button">
          Add Challenge
        </button>
      </form>
    </div>
  );
}

export default AddChallengePage;
