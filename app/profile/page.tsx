'use client';
import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import { useSession } from 'next-auth/react';
import RouteForm from '../components/profileComponents/RouteForm';
import RidesJoined from '../components/profileComponents/RidesJoined';
import RoutesCreated from '../components/profileComponents/RoutesCreated';
import ProfileInfo from '../components/profileComponents/ProfileInfo';
import PrivateRideRequest from '../components/profileComponents/PrivateRideRequest';
import LoginButton from '../components/LoginButton';
import UserImage from '../components/UserImage';
import PassengerCount from '../components/profileComponents/PassengerCount';
import Logo from '../components/profileComponents/Logo';

export default function Page() {
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
          <Logo />
          <PassengerCount />
          <div className="landing-page-nav__contents">
            <Link href={'http://localhost:3000'}>
              <button className="standard-button">Home</button>
            </Link>
            <UserImage user={session?.user} />
          </div>
        </nav>

        <header className='profile-header'>
        <img className='welcome-profile-image' src={session?.user?.image?.toString()} />
          <h1>Welcome, {session.user?.name}</h1>
        </header>

        <main className="profile-main">
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
                selection === 'Personal Info'
                  ? 'standard-button--selected'
                  : 'standard-button'
              }
            >
              Personal Info
            </button>
          </section>

          <section className="public-cards">
            {selection === 'Create' && <RouteForm />}
            {selection === 'My Routes' && <RoutesCreated />}
            {selection === 'Joined Rides' && <RidesJoined />}
            {selection === 'Personal Info' && <ProfileInfo />}
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
