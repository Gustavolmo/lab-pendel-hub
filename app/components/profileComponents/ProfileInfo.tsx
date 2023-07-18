import { useSession } from 'next-auth/react';
import React from 'react';

export default function profileInfo() {
  const { data: session, status } = useSession();

  return (
    <>
      <div>MY PROFILE</div>
      <img src={String(session?.user?.image)} alt="Profile Image" />
      <h2>{session?.user?.name}</h2>
      <button>Delete Account</button>
    </>
  );
}
