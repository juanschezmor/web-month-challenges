import React from 'react';
import SocialIcon from './SocialIcon';
const Footer = () => {
  return (
    <footer className="credit-footer">
      <div className="d-flex justify-content-center align-items-center">
        <p className="">Created by Juan S.</p>
      </div>

      <div className="">
        <SocialIcon social="linkedin" link="https://www.linkedin.com/in/juanschezmor/" />
        <SocialIcon social="github" link="https://github.com/juanschezmor" />
      </div>
    </footer>
  );
};

export default Footer;
