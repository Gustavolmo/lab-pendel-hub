import Image from 'next/image';
import logo from '/Users/alexandramacovei/pendel-hub/loga-final-project/app/public/logo.png';
import React from 'react';
import '../styles/Logo.css';

export default function Logo() {
  return (
    <header className="nav__header">
      <div className="nav__container">
        <a href="http://localhost:3000/">
          <Image src={logo} alt="LOGO" className="logo-image" />
        </a>
      </div>
      <div className='nav__logo__title'>
        <p className="nav__logo__title__main">Pendel Hub </p>
        <h4 className="nav__logo__title__secondary">
          Navigate together, commute better!
        </h4>
      </div>
    </header>
  );
}
