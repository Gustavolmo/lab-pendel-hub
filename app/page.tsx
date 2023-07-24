import HomePage from './components/HomePage';
import LoginButton from './components/LoginButton';
import Image from 'next/image';
import PassengerCount from './components/profileComponents/PassengerCount';
import Logo from './components/profileComponents/Logo';
import { Suspense } from 'react';
import Loading from './components/Loading';
export default function Home() {
  return (
    <>
        <nav className="landing-page-nav">
          <Logo />
          <PassengerCount />
          <LoginButton />
        </nav>
      <Suspense fallback={<Loading />}>
        <main className="landing-page-main">
          <HomePage />
        </main>
      </Suspense>
    </>
  );
}
