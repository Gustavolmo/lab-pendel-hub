import { addPassengerToRoute } from '@/library/private/private';
import { Ride } from '@/library/types/types';
import { useSession } from 'next-auth/react';

export default function PublicRouteCard({ route }: { route: Ride }) {
const { data: session, status } = useSession();
const isAuthenticated = session !== null && status === 'authenticated';

const handleJoinRoute = () => {
  if (isAuthenticated) {
    console.log('outch!!')
    addPassengerToRoute(session?.user?.email, String(route._id))
  } else {
    console.log('NOT AUTHORIZED')
  }
}



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
          <b>Rating:</b> 5/5|TBD| <b>Seating:</b> {route.capacity} |TBD|{' '}
          <b>One-way-fare:</b> 500kr |TBD|
        </p>

        <button onClick={handleJoinRoute}>Join</button>
      </article>
    </div>
  );
}
