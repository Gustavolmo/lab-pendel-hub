'use client';
import { deleteRoute, getAllPassengers } from '@/library/private/private';
import { User } from '@/library/types/types';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';

export default function PrivateOfferRouteCard({ route, setClick, click}: any) {
  const accessAllPassengers = useRef([]);
  const [inProcess, setInProcess] = useState(false);

  useEffect(() => {
    const handleAsync = async () => {
      if (inProcess) {
        return;
      }
      setInProcess(true);
      const routeFromDb = await getAllPassengers(route._id);
      const parsedRoute = JSON.parse(routeFromDb);
      accessAllPassengers.current = parsedRoute;
      setInProcess(false);
    };
    handleAsync();
  }, []);

  const handleDeleteRoute = () => {
    deleteRoute(String(route._id))
    setClick(!click)
  }

  return (
    <article className="route-card">
      <h2><b>Driver:</b> {route.driverName}</h2>
      
      <p><b>Departure:</b> {route.timeFromA} <b>From:</b> { route.pointA } <b>To:</b> { route.pointB }</p>
      <p><b>Departure:</b> {route.timeFromB} <b>From:</b> { route.pointB } <b>To:</b> { route.pointA }</p>
      <p><b>Travel Time:</b> {route.tripTime}</p>

      <p><b>Frequency:</b> {route.frequency}</p>
      <p><b>Seating:</b> {route.capacity} <b>Taken:</b> {route.passengers.length}</p>

      {accessAllPassengers.current && 
      <>
      <p><b>PASSENGERS:</b></p>
       <section>
          {accessAllPassengers.current.map((user: User, index: number) => {
            return(
            <div key={index}>
            <li>{user.name}</li>
            <button>Accept C.</button>
            <button>Decline C.</button>
            </div>
            )
          })}
       </section>
       </>
      } 

      <button onClick={handleDeleteRoute}>DELETE OFFER</button>
    </article>
  );
}
