'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import RouteForm from '../components/profileComponents/RouteForm';
import RidesJoined from '../components/profileComponents/RidesJoined';
import RoutesCreated from '../components/profileComponents/RoutesCreated';
import ProfileInfo from '../components/profileComponents/ProfileInfo';
import PrivateRideRequest from '../components/profileComponents/PrivateRideRequest';
import LoginButton from '../components/LoginButton';
import UserImage from '../components/UserImage';
import PassengerCount from '../components/profileComponents/PassengerCount';
import logo from '../public/logo.png';
import Image from 'next/image';
import Logo from '../components/profileComponents/Logo';

export default function page() {
  const { data: session, status } = useSession();
  const isAuthenticated = session !== null && status === 'authenticated';
  const [selection, setSelection] = useState('Create');

  const handleSelection = (value: string) => {
    setSelection(value);
  };
  

  if (isAuthenticated) {
    return (
      <>
        <nav className="landing-page-nav">
          {/* <Image src={logo} alt="LOGO" className="logo-image" /> */}
          <Logo/>
          <PassengerCount />
          <div className="landing-page-nav__contents">
            <Link href={'http://localhost:3000'}>
              <button className="standard-button">Home</button>
            </Link>
            <UserImage user={session?.user} />
          </div>
        </nav>

        <main className="profile-main">
          <h1>MY PAGES</h1>
          <section className="">
            <button
              onClick={(e: any) => handleSelection(e.target.textContent)}
              className={
                selection === 'Create'
                  ? 'standard-button--selected'
                  : 'standard-button'
              }
            >
              Create
            </button>
            <button
              onClick={(e: any) => handleSelection(e.target.textContent)}
              className={
                selection === 'My Routes'
                  ? 'standard-button--selected'
                  : 'standard-button'
              }
            >
              My Routes
            </button>
            <button
              onClick={(e: any) => handleSelection(e.target.textContent)}
              className={
                selection === 'My Requests'
                  ? 'standard-button--selected'
                  : 'standard-button'
              }
            >
              My Requests
            </button>
            <button
              onClick={(e: any) => handleSelection(e.target.textContent)}
              className={
                selection === 'Joined Rides'
                  ? 'standard-button--selected'
                  : 'standard-button'
              }
            >
              Joined Rides
            </button>
            <button
              onClick={(e: any) => handleSelection(e.target.textContent)}
              className={
                selection === 'My Info'
                  ? 'standard-button--selected'
                  : 'standard-button'
              }
            >
              My Info
            </button>
          </section>
          <section className="public-cards">
              {selection === 'Create' && <RouteForm />}
              {selection === 'My Routes' && <RoutesCreated />}
              {selection === 'Joined Rides' && <RidesJoined />}
              {selection === 'My Info' && <ProfileInfo />}
              {selection === 'My Requests' && <PrivateRideRequest />}
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <section className="not-authorized-card">
        <p>401 - not authorized</p>
        <LoginButton />
        <Link href={'/'}>
          <button className="standard-button">Home</button>
        </Link>
      </section>
    </>
  );
}
