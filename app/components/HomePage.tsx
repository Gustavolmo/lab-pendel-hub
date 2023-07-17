'use client';
import { User, createNewUser, getUserByEmail } from '@/library/private/private';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const { data: session, status } = useSession();
  const [inProcess, setInProcess] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>({});
  const isAuthenticated = session !== null && status === 'authenticated';

  const handleLogIn = async (userData: any) => {
    const userFromDb = await getUserByEmail(userData.email);
    if (userFromDb) {
      console.log('user exists');
    } else {
      console.log('new user');
      createNewUser(currentUser.name, currentUser.email, currentUser.image);
    }
  };

  useEffect(() => {
    const loginCheck = async () => {
      if (inProcess) {
        return;
      }
      setInProcess(true);
      if (session) {
        setCurrentUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        });
        await handleLogIn(currentUser);
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
