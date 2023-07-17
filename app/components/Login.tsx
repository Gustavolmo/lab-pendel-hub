'use client';
import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import UserInfo from './UserInfo';

export default function Login() {
  const { data: session } = useSession(); // THIS IS SIMILAR TO USE CONTEXT

  if (session) {
    return (
      <>
        <button
          onClick={() => {
            signOut();
          }}
          type="button"
          className="bg-blue-400 text-white border p-1 px-4 rounded "
        >
          Sign Out
        </button>
        <UserInfo user={session.user} />
        {/* My Profile Link Component */}
      </>
    );
  } else {
    return (
      <button
        onClick={() => signIn()}
        type="button"
        className="bg-blue-200 text-black border p-1 px-4 rounded "
      >
        Log In
      </button>
    );
  }
}
