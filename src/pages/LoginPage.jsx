import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/Context';

const LoginPage = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setLoggedIn } = useGlobalContext();
  const correctPin = import.meta.env.VITE_PIN_CODE;

  const handleInputChange = (e) => {
    setPin(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === correctPin) {
      setLoggedIn(true); // Set the user as authenticated
      navigate('/home');
    } else {
      setError('Incorrect PIN');
      setPin('');
    }
  };

  return (
    <div className="login-container mt-5">
      <div className="login-box">
        <div className="col-md-4">
          <h5 className="card-title text-center">Pin Code</h5>
          <form className="pin-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                value={pin}
                onChange={handleInputChange}
                maxLength="4"
                placeholder="4 digits code"
              />
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}
            <div className="d-grid">
              <button type="submit" className="generic-button">
                Enter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
