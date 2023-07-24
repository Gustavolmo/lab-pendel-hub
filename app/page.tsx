import HomePage from './components/HomePage';
import LoginButton from './components/LoginButton';
import Image from 'next/image';
import PassengerCount from './components/profileComponents/PassengerCount';
import Logo from './components/profileComponents/Logo';
export default function Home() {
  return (
    <>
    <nav className='landing-page-nav'>
      <Logo/>
        <PassengerCount />
        <LoginButton />
      </nav>
    <main className='landing-page-main'>
      <HomePage />
    </main>
    </>
  );
}
