'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import UserImage from './UserImage';

export default function LoginButton() {
  const { data: session } = useSession(); // THIS IS SIMILAR TO USE CONTEXT

  if (session) {
    return (
      <div className="landing-page-nav__contents">
        

        <button
          onClick={() => {
            signOut();
          }}
          type="button"
          className="standard-button"
        >
          Sign Out
        </button>
        <Link className='react-link' href={'http://localhost:3000/profile'}>
          <button>Profile</button>
        </Link>
        <UserImage user={session.user} />
      </div>
    );
  } else {
    return (
      <div className="landing-page-nav__contents">
        <button
          onClick={() => signIn()}
          type="button"
          className="standard-button"
        >
          Log In
        </button>
      </div>
    );
  }
}
