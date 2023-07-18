'use client';
import Link from 'next/link';
import React, {
  ButtonHTMLAttributes,
  SetStateAction,
  SyntheticEvent,
  useState,
} from 'react';
import { useSession } from 'next-auth/react';
import Login from '../components/Login';
import RouteForm from '../components/profileComponents/routeForm';
import RidesJoined from '../components/profileComponents/ridesJoined';
import RoutesCreated from '../components/profileComponents/routesCreated';
import ProfileInfo from '../components/profileComponents/profileInfo';

export default function page() {
  const { data: session, status } = useSession();
  const isAuthenticated = session !== null && status === 'authenticated';
  const [selection, setSelection] = useState('My Info');

  const handleSelection = (value: string) => {
    setSelection(value);
    // console.log(selection)
  };

  if (isAuthenticated) {
    return (
      <>
        <nav className="navbar">
          <Link href={'http://localhost:3000'}>
            <button className=" text-blakc border p-1 px-4 rounded button">
              Home
            </button>
          </Link>
        </nav>

        <main className="profile-main">
          <h1>MY PAGES</h1>
          <section className="profile-main__selections">
            <button
              onClick={(e: any) => handleSelection(e.target.textContent)}
              className={
                selection === 'Create Route'
                  ? 'profile-btn--selected'
                  : 'profile-btn'
              }
            >
              Create Route
            </button>
            <button
              onClick={(e: any) => handleSelection(e.target.textContent)}
              className={
                selection === 'My Routes'
                  ? 'profile-btn--selected'
                  : 'profile-btn'
              }
            >
              My Routes
            </button>
            <button
              onClick={(e: any) => handleSelection(e.target.textContent)}
              className={
                selection === 'Joined Rides'
                  ? 'profile-btn--selected'
                  : 'profile-btn'
              }
            >
              Joined Rides
            </button>
            <button
              onClick={(e: any) => handleSelection(e.target.textContent)}
              className={
                selection === 'My Info'
                  ? 'profile-btn--selected'
                  : 'profile-btn'
              }
            >
              My Info
            </button>
          </section>
          {/* components -> FORM + MY ROUTES + MY RIDES + PROFILE SETTINGS */}
          {selection === 'Create Route' && <RouteForm />}
          {selection === 'My Routes' && <RoutesCreated />}
          {selection === 'Joined Rides' && <RidesJoined />}
          {selection === 'My Info' && <ProfileInfo />}
        </main>
      </>
    );
  }

  return (
    <>
      <p>401 - not authorized</p>
      <Login />
    </>
  );
}
