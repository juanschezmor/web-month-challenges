import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PointsModal from './PointsModal';
import { useGlobalContext } from '../context/Context';
import ProgressBar from './ProgressBar';
import hiveLogo from '../assets/logo.png';
function Header() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigateTo = (path) => {
    navigate(path);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleButton = () => {
    openModal(); // Abre el modal al hacer clic en "Set Max Points"
  };

  return (
    <nav className="navbar navbar-light bg-light d-flex justify-content-between px-3">
      <a className="navbar-brand button" onClick={() => navigateTo('/')}>
        <img className="img-logo" src={hiveLogo} alt="Hive Logo" />
      </a>
      <a className="generic-button" onClick={handleButton}>
        Start Month
      </a>
      <ProgressBar />

      <button className="generic-button" onClick={() => navigateTo('add-challenge')}>
        Add Challenge
      </button>

      {isModalOpen && <PointsModal closeModal={closeModal} type="setMaxPoints" />}
    </nav>
  );
}

export default Header;
