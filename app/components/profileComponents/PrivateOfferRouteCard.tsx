'use client';
import {
  deleteRoute,
  getAllPassengers,
  leaveJoinedRide,
} from '@/library/private/private';
import { User } from '@/library/types/types';
import React, { useEffect, useRef, useState } from 'react';
import '../styles/RouteCard.css';

export default function PrivateOfferRouteCard({ route, setClick, click, call }: any) {
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
  }, [click, call]);

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
      <div className="card">
        <div className="content">
          <div className="card-button">
            <button onClick={handleDeleteRoute}>Remove</button>
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
              <span>Reserved:</span> {route.passengers.length} <span>/</span>{' '}
              {route.capacity}
            </p>
            <h2>Income per day {(route.fare)*(route.passengers.length)} kr / &#x1F464;</h2>
          </section>

          {accessAllPassengers.current && (
            <>
              <div className="cards__passengers">
                <span>Passengers:</span>
              </div>
              {accessAllPassengers.current.map((user: User, index: number) => {
                return (
                  <div key={index} className="cards__passengers__unit">
                    <p>{user.name}</p>
                    <button
                      onClick={() => handleDeclinePax(user.email, route._id)}
                    >
                      Decline
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
