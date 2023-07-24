import { addPassengerToRoute } from '@/library/private/private';
import { signIn, useSession } from 'next-auth/react';
import '../styles/RouteCard.css';

export default function PublicRouteCard({ route, click, setClick }: any) {
  const { data: session, status } = useSession();
  const isAuthenticated = session !== null && status === 'authenticated';

  const handleJoinRoute = () => {
    if (isAuthenticated) {
      setClick(!click);
      addPassengerToRoute(session?.user?.email, String(route._id));
    } else {
      signIn()
    }
  };

  return (
    <div className="card">
      <div className="content">
        <div className="card-button">
          {route.capacity <= route.passengers.length ? (
            <b className="full-ride">FULL</b>
          ) : (
            <button className="card-button__unit" onClick={handleJoinRoute}>
              Join
            </button>
          )}
        </div>

        <p className="frequency">{route.frequency}</p>
        <div className="card__destination">
          <b>&#10606;</b>
          <div>
            <p>
              <b>{route.timeFromA}</b> {route.pointA}{' '}
            </p>
            <p>
              <b>{route.timeFromB}</b> {route.pointB}{' '}
            </p>
          </div>
        </div>
        <section className="card__extra-info">
          <p>
            <span>Travel Time:</span> {route.tripTime}
          </p>

          <p>
            {' '}
            <span>About:</span> {route.message}
          </p>
          <p>
            {' '}
            <span>Vehicle:</span> {route.carDescription}
          </p>

          <p>
            <span>Reserved:</span> {route.passengers.length} <span>/</span>{' '}
            {route.capacity}
          </p>
        </section>
        <h2>{route.driverName}</h2>
      </div>
    </div>
  );
}
