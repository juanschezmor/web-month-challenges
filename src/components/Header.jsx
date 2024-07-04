import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PointsModal from './PointsModal';
import { useGlobalContext } from '../context/Context';
import ProgressBar from './ProgressBar';
import hiveLogo from '../../public/hive-logo.png';
import chestIcon from '../assets/chest.png';
import chestOpenedIcon from '../assets/chest-opened.png';
import RewardsModal from './RewardsModal';
function Header() {
  const navigate = useNavigate();
  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
  const [rewardsModalOpened, setRewardsModalOpened] = useState();
  const navigateTo = (path) => {
    navigate(path);
  };

  const openPointsModal = () => {
    setIsPointsModalOpen(true);
  };

  const closePointsModal = () => {
    setIsPointsModalOpen(false);
  };

  const handleStartMonth = () => {
    openPointsModal();
  };
  const handleOpenRewards = () => {
    setRewardsModalOpened(true);
  };
  const handleCloseRewards = () => {
    setRewardsModalOpened(false);
  };

  return (
    <nav className="navbar navbar-light bg-light d-flex justify-content-between px-3">
      <a
        className="h-100 navbar-brand d-flex justify-content-center align-items-center "
        onClick={() => navigateTo('/')}
      >
        <img className="img-logo" src={hiveLogo} alt="Hive Logo" />
        <p className="text-center d-flex justify-content-center align-items-center ">Hive</p>
      </a>
      <a className="generic-button " onClick={handleStartMonth}>
        Start Month
      </a>
      <ProgressBar />
      <a onClick={handleOpenRewards}>
        <img className="rewards-icon" src={rewardsModalOpened ? chestOpenedIcon : chestIcon} alt="" />
      </a>
      <button className="generic-button" onClick={() => navigateTo('add-challenge')}>
        Add Challenge
      </button>

      {isPointsModalOpen && <PointsModal closeModal={closePointsModal} type="setMaxPoints" />}
      {rewardsModalOpened && <RewardsModal closeModal={handleCloseRewards} type="rewards" />}
    </nav>
  );
}

export default Header;
