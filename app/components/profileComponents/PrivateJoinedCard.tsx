'use client';
import { leaveJoinedRide } from '@/library/private/private';
import { useSession } from 'next-auth/react';
import React from 'react';
import '../styles/RouteCard.css';

export default function PrivateJoinedCard({ route, setClick, click }: any) {
  const { data: session, status } = useSession();

  const leaveHandleres = () => {
    leaveJoinedRide(session?.user?.email, route._id);
    setClick(!click);
  };

  return (
    <>
      <div className="card">
        <div className="content">
          <div className="card-button">
            <button onClick={leaveHandleres}>LEAVE</button>
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
          <h2>{route.fare} kr / &#x1F464;</h2>
          <h2>{route.driverName}</h2>
        </div>
      </div>
    </>
  );
}
