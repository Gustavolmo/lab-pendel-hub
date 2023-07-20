import { Ride } from '@/library/types/types';
import Link from 'next/link';
import React from 'react';

export default function PublicRequestedCard({ route }: { route: Ride }) {
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
          <b>Seating:</b> {route.capacity}
        </p>

        <Link href={'/profile'}>
          <button>Offer</button>
        </Link>
      </article>
    </div>
  );
}
