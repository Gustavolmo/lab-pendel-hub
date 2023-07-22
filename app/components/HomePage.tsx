'use client';
import { createNewUser, getUserByEmail } from '@/library/private/private';
import { User } from '@/library/types/types';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import PublicAvailableRoutes from './publicComponents/PublicAvailableRoutes';
import PublicRequestedRoutes from './publicComponents/PublicRequestedRoutes';

export default function HomePage() {
  const { data: session, status } = useSession();
  const [inProcess, setInProcess] = useState(false);
  const [selection, setSelection] = useState('Available Routes'); // Routes Being Requested

  const handleLogIn = async (userData: User) => {
    const userFromDb = await getUserByEmail(userData.email);
    if (userFromDb) {
      console.log('user exists', userFromDb);
    } else {
      console.log('new user', userFromDb);
      createNewUser(userData.name, userData.email, userData.image);
    }
  };

  useEffect(() => {
    const user = {
      name: session?.user?.name,
      email: session?.user?.email,
      image: session?.user?.image,
    };
    const loginCheck = async () => {
      if (inProcess) {
        return;
      }
      setInProcess(true);
      if (session) {
        await handleLogIn(user);
      }
      setInProcess(false);
    };
    loginCheck();
  }, [session]);

  const handleSelection = (value: string) => {
    setSelection(value);
  };

  return (
    <>
      <h1>PENDEL HUB! be a bus</h1>

      <section className="">

      <div className=''>
        <button
          onClick={(e: any) => handleSelection(e.target.textContent)}
          className={
            selection === 'Available Routes'
              ? 'standard-button--selected'
              : 'standard-button'
          }
        >
          Routes
        </button>

        <button
          onClick={(e: any) => handleSelection(e.target.textContent)}
          className={
            selection === 'Requests'
              ? 'standard-button--selected'
              : 'standard-button'
          }
        >
          Requests
        </button>
        </div>

        <section className=''>
        {selection === 'Available Routes' && <PublicAvailableRoutes />}
        {selection === 'Requests' && <PublicRequestedRoutes />}
        </section>

      </section>
    </>
  );
}
