'use client';
import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import UserInfo from './UserInfo';

export default function Login() {
  const { data: session } = useSession(); // THIS IS SIMILAR TO USE CONTEXT

  if (session) {
    return (
      <div className="navbar__info">
        {/* My Profile Link Component */}
        <button
          onClick={() => {
            signOut();
          }}
          type="button"
          className=" text-blakc border p-1 px-4 rounded button"
        >
          Sign Out
        </button>
        <UserInfo user={session.user} />
      </div>
    );
  } else {
    return (
      <div className='navbar__info'>
        <button
          onClick={() => signIn()}
          type="button"
          className=" text-black border p-1 px-4 rounded button "
        >
          Log In
        </button>
      </div>
    );
  }
}
