import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PointsModal from './PointsModal';
import { useGlobalContext } from '../context/Context';
import ProgressBar from './ProgressBar';
function Header() {
  const { points } = useGlobalContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [maxPoints, setMaxPoints] = useState(20); // Estado para el número máximo de puntos

  const navigateTo = (path) => {
    navigate(path);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSetMaxPoints = () => {
    openModal(); // Abre el modal al hacer clic en "Set Max Points"
  };

  return (
    <nav className="navbar navbar-light bg-light d-flex justify-content-between px-3">
      <a className="navbar-brand button" onClick={() => navigateTo('/')}>
        Hive
      </a>
      <a className="generic-button" onClick={handleSetMaxPoints}>
        Set Max Points
      </a>
      <ProgressBar points={points} />
      <button className="generic-button" onClick={() => navigateTo('add-challenge')}>
        Add Challenge
      </button>

      {isModalOpen && (
        <PointsModal
          closeModal={closeModal}
          type="setMaxPoints"
          challenge={null}
          setPoints={setMaxPoints} // Pasa la función para establecer los puntos máximos al Modal
        />
      )}
    </nav>
  );
}

export default Header;
