'use client';
import { createNewUser, getUserByEmail } from '@/library/private/private';
import { User } from '@/library/types/types';
import { useSession } from 'next-auth/react';
import React, { Suspense, useEffect, useState } from 'react';
import PublicAvailableRoutes from './publicComponents/PublicAvailableRoutes';
import PublicRequestedRoutes from './publicComponents/PublicRequestedRoutes';
import Loading from './Loading';

export default function HomePage() {
  const { data: session, status } = useSession();
  const [inProcess, setInProcess] = useState(false);
  const [selection, setSelection] = useState('Routes'); // Routes Being Requested

  const handleLogIn = async (userData: User) => {
    const userFromDb = await getUserByEmail(userData.email);
    if (userFromDb) {
    } else {
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
      <section className="landing-page-main__section">




        {/* <section className="landing-page__search-area">
          <input type="text" id="landing-page__search-input" />
          <button>&#128270; offers</button>
          <button>&#128270; requests</button>
        </section> */}




        <div className="">
          <button
            onClick={(e: any) => handleSelection(e.target.textContent)}
            className={
              selection === 'Routes'
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

        <section className="public-cards">
          {selection === 'Routes' && <PublicAvailableRoutes />}
          {selection === 'Requests' && <PublicRequestedRoutes />}
          {/* search request */}
          {/* search routes  */}
        </section>
      </section>
    </>
  );
}
