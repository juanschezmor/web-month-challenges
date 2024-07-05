import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PointsModal from './PointsModal';
import { useGlobalContext } from '../context/Context';
import ProgressBar from './ProgressBar';
import hiveLogo from '../../public/hive-logo.png';
import chestIcon from '../assets/chest.png';
import chestOpenedIcon from '../assets/chest-opened.png';
import RewardsModal from './RewardsModal';
import { playSound } from '../utils/sound';
import chestOpenedSound from '../assets/chest-open.mp3';
import chestClosedSound from '../assets/chest-close.mp3';
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
    console.log('Opening points modal');
    playSound(chestOpenedSound);
    setRewardsModalOpened(true);
  };
  const handleCloseRewards = () => {
    playSound(chestClosedSound);
    setRewardsModalOpened(false);
  };

  return (
    <nav className="navbar navbar-light bg-light d-flex justify-content-between px-3">
      <span className="header-logo" onClick={() => navigateTo('/')}>
        <img className="hive-logo" src={hiveLogo} alt="Hive Logo" />
        <p>Hive</p>
      </span>
      <a className="generic-button" onClick={handleStartMonth}>
        Start Month
      </a>
      <ProgressBar />
      <a onClick={handleOpenRewards}>
        <img className="rewards-icon" src={rewardsModalOpened ? chestOpenedIcon : chestIcon} alt="" />
      </a>

      <button className="generic-button" onClick={() => navigateTo('challenges')}>
        Challenges
      </button>

      {isPointsModalOpen && <PointsModal closeModal={closePointsModal} type="setMaxPoints" />}
      {rewardsModalOpened && <RewardsModal closeModal={handleCloseRewards} type="rewards" />}
    </nav>
  );
}

export default Header;
