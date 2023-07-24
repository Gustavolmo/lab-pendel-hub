import HomePage from './components/HomePage';
import LoginButton from './components/LoginButton';
import Image from 'next/image';
import logo from './public/logo.png';
import PassengerCount from './components/profileComponents/PassengerCount';

export default function Home() {
  return (
    <>
      <nav className="landing-page-nav">
        <Image src={logo} alt="LOGO" className="logo-image" />
        <PassengerCount />
        <LoginButton />
      </nav>
      <main className="landing-page-main">
        <HomePage />
      </main>
    </>
  );
}
