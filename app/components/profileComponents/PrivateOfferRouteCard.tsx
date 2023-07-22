'use client';
import {
  deleteRoute,
  getAllPassengers,
  leaveJoinedRide,
} from '@/library/private/private';
import { User } from '@/library/types/types';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';

export default function PrivateOfferRouteCard({ route, setClick, click }: any) {
  const accessAllPassengers = useRef([]);
  const [inProcess, setInProcess] = useState(false);

  useEffect(() => {
    const handleAsync = async () => {
      if (inProcess) {
        return;
      }
      setInProcess(true);
      const routeFromDb = await getAllPassengers(route._id);
      if (routeFromDb) {
        const parsedRoute = JSON.parse(routeFromDb);
        accessAllPassengers.current = parsedRoute;
      }
      setInProcess(false);
    };
    handleAsync();
  }, [click]);

  const handleDeleteRoute = () => {
    deleteRoute(String(route._id));
    setClick(!click);
  };

  const handleDeclinePax = (
    paxEmail: string | null | undefined,
    rideId: string
  ) => {
    leaveJoinedRide(paxEmail, rideId);
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
        <b>Seating:</b> {route.capacity} <b>Taken:</b> {route.passengers.length}
      </p>

      {accessAllPassengers.current && (
        <>
          <p>
            <b>PASSENGERS:</b>
          </p>
          <section>
            {accessAllPassengers.current.map((user: User, index: number) => {
              return (
                <div key={index}>
                  <li>{user.name}</li>
                  <button
                    onClick={() => handleDeclinePax(user.email, route._id)}
                  >
                    Decline
                  </button>
                </div>
              );
            })}
          </section>
        </>
      )}

      <button onClick={handleDeleteRoute}>REMOVE</button>
    </>
  );
}
