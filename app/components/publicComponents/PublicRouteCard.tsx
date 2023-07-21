import { addPassengerToRoute } from '@/library/private/private';
import { Ride } from '@/library/types/types';
import { useSession } from 'next-auth/react';

export default function PublicRouteCard({ route, click, setClick }: any) {
  const { data: session, status } = useSession();
  const isAuthenticated = session !== null && status === 'authenticated';

  const handleJoinRoute = () => {
    if (isAuthenticated) {
      setClick(!click);
      addPassengerToRoute(session?.user?.email, String(route._id));
    } else {
      console.log('NOT AUTHORIZED');
    }
  };

  return (
    <div>
      <article className="route-card">
        <h2>
          <b>Driver:</b> {route.driverName}
        </h2>

        <p>
          <b>Departure:</b> {route.timeFromA} <b>From:</b> {route.pointA}{' '}
          <b>To:</b> {route.pointB}
        </p>
        <p>
          <b>Departure:</b> {route.timeFromB} <b>From:</b> {route.pointB}{' '}
          <b>To:</b> {route.pointA}
        </p>
        <p>
          <b>Travel Time:</b> {route.tripTime}
        </p>

        <p>
          <b>Frequency:</b> {route.frequency}
        </p>

        <p>
          <b>Seating:</b> {route.capacity} / <b>Taken:</b>{' '}
          {route.passengers.length}
        </p>

        {route.capacity <= route.passengers.length ? (
          <b>FULL</b>
        ) : (
          <button onClick={handleJoinRoute}>Join</button>
        )}
      </article>
    </div>
  );
}
