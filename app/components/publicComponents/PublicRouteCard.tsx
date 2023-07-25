import { addPassengerToRoute } from '@/library/private/private';
import { signIn, useSession } from 'next-auth/react';
import '../styles/RouteCardExpandable.css';

export default function PublicRouteCard({ route, click, setClick }: any) {
  const { data: session, status } = useSession();
  const isAuthenticated = session !== null && status === 'authenticated';

  const handleJoinRoute = () => {
    if (isAuthenticated) {
      setClick(!click);
      addPassengerToRoute(session?.user?.email, String(route._id));
    } else {
      signIn();
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

          <section className="card__extra-info--expandable">
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

        <div className="card__bottom-info">
          <h2>{route.fare} kr / &#x1F464;</h2>
          <h2>{route.driverName}</h2>
          <i className="card__date">{route.availableFromDate}</i>
        </div>
      </div>
    </div>
  );
}
