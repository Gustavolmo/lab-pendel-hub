import React from 'react';
import '../styles/HeroHeader.css';
import Image from 'next/image';
import banner from '../../public/banner.jpg';

export default function HeroHeader() {
  return (
    <header className="hero-header">
      <p className='header-text'>Create commutes, find routes & join others!</p>
    </header>
  );
}
