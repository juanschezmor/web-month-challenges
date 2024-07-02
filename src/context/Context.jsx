import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { usePoints } from '../services/pointsService';
import { useMaxPoints } from '../services/maxPointsService';
import { useChallenges } from '../services/challengesService';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const initialPoints = usePoints();
  const initialMaxPoints = useMaxPoints();
  const { challenges, loading } = useChallenges(); // Obtener desafíos desde Firestore

  // Estados locales
  const [isAnimating, setIsAnimating] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [points, setPoints] = useState(initialPoints); // Inicializar points con los puntos obtenidos
  const [maxPoints, setMaxPoints] = useState(20); // Inicializar maxPoints con un valor predeterminado

  // Efecto para actualizar los puntos cuando cambien desde Firestore
  useEffect(() => {
    setPoints(initialPoints); // Actualizar points cuando initialPoints cambie (es decir, cuando usePoints obtenga nuevos datos)
  }, [initialPoints]);

  // Efecto para actualizar los puntos máximos cuando cambien desde Firestore
  useEffect(() => {
    setMaxPoints(initialMaxPoints); // Actualizar maxPoints cuando initialMaxPoints cambie (es decir, cuando useMaxPoints obtenga nuevos datos)
  }, [initialMaxPoints]);

  return (
    <Context.Provider
      value={{
        isAnimating,
        setIsAnimating,
        modalOpened,
        setModalOpened,
        points,
        setPoints,
        maxPoints,
        setMaxPoints,
        challenges, // Incluir desafíos en el contexto
        loading, // Incluir estado de carga de desafíos en el contexto
      }}
    >
      {children}
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useGlobalContext = () => useContext(Context);

export { Context, ContextProvider, useGlobalContext };
