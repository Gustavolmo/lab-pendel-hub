'use client';
import { leaveJoinedRide } from '@/library/private/private';
import { Ride } from '@/library/types/types';
import { useSession } from 'next-auth/react';
import React from 'react';
// import { Ride } from '@/library/types/types'

export default function PrivateJoinedCard({ route, setClick, click}: any) {
  const { data: session, status } = useSession();

  const leaveHandleres = () => {
    leaveJoinedRide(session?.user?.email, route._id)
    // Update count -- (add/remove)
    setClick(!click)
  }
  
  return (
    <article className="route-card">
      <h2><b>Driver:</b> {route.driverName}</h2>

      <p><b>Departure:</b> {route.timeFromA} <b>From:</b> { route.pointA } <b>To:</b> { route.pointB }</p>
      <p><b>Departure:</b> {route.timeFromB} <b>From:</b> { route.pointB } <b>To:</b> { route.pointA }</p>
      <p><b>Travel Time:</b> {route.tripTime}</p>

      <p><b>Frequency:</b> {route.frequency}</p>

      <p><b>Status:</b> Pending | Accepted | Declined </p>

      <button onClick={leaveHandleres}>LEAVE</button>
      
    </article>
  );
}
