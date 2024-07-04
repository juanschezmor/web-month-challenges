import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PointsModal from './PointsModal';
import { useGlobalContext } from '../context/Context';
import ProgressBar from './ProgressBar';
import hiveLogo from '../../public/hive-logo.png';
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
      <span className="header-logo" onClick={() => navigateTo('/')}>
        <img className="hive-logo" src={hiveLogo} alt="Hive Logo" />
        <p>Hive</p>
      </span>
      <a className="generic-button" onClick={handleButton}>
        Start Month
      </a>
      <ProgressBar />

      <button className="generic-button" onClick={() => navigateTo('challenges')}>
        Challenges
      </button>

      {isModalOpen && <PointsModal closeModal={closeModal} type="setMaxPoints" />}
    </nav>
  );
}

export default Header;
