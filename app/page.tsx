import HomePage from './components/HomePage';
import LoginButton from './components/LoginButton';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <nav className='navbar'>
        <LoginButton />
        {/* PAX COUNT COMPONENT */}
      </nav>
      <HomePage />
    </main>
  );
}
