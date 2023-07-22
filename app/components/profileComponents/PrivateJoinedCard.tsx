'use client';
import { leaveJoinedRide } from '@/library/private/private';
import { useSession } from 'next-auth/react';
import React from 'react';
// import { Ride } from '@/library/types/types'

export default function PrivateJoinedCard({ route, setClick, click }: any) {
  const { data: session, status } = useSession();

  const leaveHandleres = () => {
    leaveJoinedRide(session?.user?.email, route._id);
    setClick(!click);
  };

  return (
    <>
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

      <p>About: {route.message}</p>
      <p>Vehicle: {route.carDescription}</p>

      <p>
        <b>Frequency:</b> {route.frequency}
      </p>

      <button onClick={leaveHandleres}>LEAVE</button>
    </>
  );
}
