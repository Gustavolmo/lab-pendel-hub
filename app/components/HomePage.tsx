'use client';
import { User, createNewUser, getUserByEmail } from '@/library/private/private';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const { data: session } = useSession();
  const [inProcess, setInProcess] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>();

  const handleLogIn = async (userData: any) => {
    const userFromDb = await getUserByEmail(userData.email);
    console.log(userFromDb);
    if (userFromDb) {
      console.log('user exists');
    } else {
      console.log('new user');
      createNewUser(currentUser.name, currentUser.email, currentUser.image)
    }
  };

  useEffect(() => {
    const logInFilter = async () => {
      setCurrentUser({
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
      });

      if (inProcess) {
        return;
      }
      setInProcess(true);
      if (session) {
        await handleLogIn(currentUser);
      }
      setInProcess(false);
    };
    logInFilter();
  }, [session]);

  return (
    <>
      <h1>LANDING PAGE</h1>
    </>
  );
}
