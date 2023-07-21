import HomePage from './components/HomePage';
import LoginButton from './components/LoginButton';
import PassengerCount from './components/profileComponents/PassengerCount';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <nav className='navbar'>
        <LoginButton />
      </nav>
      <HomePage />
    </main>
  );
}
