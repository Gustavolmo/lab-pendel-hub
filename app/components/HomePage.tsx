'use client';
import { createNewUser, getUserByEmail } from '@/library/private/private';
import { User } from '@/library/types/types';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const { data: session, status } = useSession();
  const [inProcess, setInProcess] = useState(false);
  // const isAuthenticated = session !== null && status === 'authenticated';

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
    }
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

  return (
    <>
      <h1>LANDING PAGE</h1>
    </>
  );
}
