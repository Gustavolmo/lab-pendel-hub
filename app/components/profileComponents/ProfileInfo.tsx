import { useSession } from 'next-auth/react';
import React from 'react';
import DeleteAccountModal from './DeleteAccountModal';
import '../styles/ProfileInfo.css'

export default function profileInfo() {
  const { data: session, status } = useSession();

  return (
    <>
    <section className='profile-section'>
      <img src={String(session?.user?.image)} alt="Profile Image" />
      <h2>{session?.user?.name}</h2>
      <DeleteAccountModal/>
    </section>
    </>
  );
}
