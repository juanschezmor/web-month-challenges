import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

const ContextProvider = ({ children }) => {
  //STATES

  const [isAnimating, setIsAnimating] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <Context.Provider
      value={{
        isAnimating,
        setIsAnimating,
        modalOpened,
        setModalOpened,
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
