import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar navbar-light bg-light d-flex justify-content-between px-3">
      <a className="navbar-brand button" onClick={() => navigateTo('/')}>
        Hive
      </a>
      <button className="btn btn-primary" onClick={() => navigateTo('add-challenge')}>
        Add Challenge
      </button>
    </nav>
  );
}

export default Header;
