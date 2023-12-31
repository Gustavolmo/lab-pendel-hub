import { useSession } from 'next-auth/react';
import React from 'react';
import DeleteAccountModal from './DeleteAccountModal';
import '../styles/ProfileInfo.css';
import PassengerCount from './PassengerCount';

export default function ProfileInfo() {
  const { data: session } = useSession();

  return (
    <>
      <section className="profile-section">
        <span>{session?.user?.name}</span>
        <span>{session?.user?.email}</span>
        <DeleteAccountModal />
      </section>
    </>
  );
}
