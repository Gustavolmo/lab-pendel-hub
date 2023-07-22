'use client';
import { deleteRoute } from '@/library/private/private';
import React from 'react';
// import { Ride } from '@/library/types/types'

export default function PrivateRequestCard({ route, setClick, click }: any) {
  const handleDeleteRoute = () => {
    deleteRoute(String(route._id));
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

      <p>
        <b>Seating:</b> {route.capacity}{' '}
      </p>

      <button onClick={handleDeleteRoute}>REMOVE</button>
    </>
  );
}
