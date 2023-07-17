import { runMongoDb } from '@/library/mongoConnect';
import HomePage from './components/HomePage';
import Login from './components/Login';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav>
        <Login />
      </nav>
      {/* <My Profile /> */}
      <HomePage />
    </main>
  );
}
