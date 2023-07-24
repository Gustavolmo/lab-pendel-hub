import { Ride } from '@/library/types/types';
import Link from 'next/link';
import React from 'react';
import '../styles/RouteCard.css';

export default function PublicRequestedCard({ route }: { route: Ride }) {
  return (
    <div className="card">
      <div className="content">
        <div className="card-button">
          <Link className="react-link" href={'/profile'}>
            <button>Offer</button>
          </Link>
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
            {' '}
            <span>About:</span> {route.message}
          </p>

          <p>
            <span>Seats:</span> {route.capacity}
          </p>
        </section>
        <h2>{route.driverName}</h2>
      </div>
    </div>
  );
}
