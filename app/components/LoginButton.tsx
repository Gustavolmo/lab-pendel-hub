'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import UserImage from './UserImage';
import PassengerCount from './profileComponents/PassengerCount';

export default function LoginButton() {
  const { data: session } = useSession(); // THIS IS SIMILAR TO USE CONTEXT

  if (session) {
    return (
      <div className="navbar__info">
        <PassengerCount />
        <Link href={'http://localhost:3000//profile'}>
          <button className=" text-blakc border p-1 px-4 rounded button">
            My Profile
          </button>
        </Link>

        <button
          onClick={() => {
            signOut();
          }}
          type="button"
          className=" text-blakc border p-1 px-4 rounded button"
        >
          Sign Out
        </button>
        <UserImage user={session.user} />
      </div>
    );
  } else {
    return (
      <div className="navbar__info">
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
