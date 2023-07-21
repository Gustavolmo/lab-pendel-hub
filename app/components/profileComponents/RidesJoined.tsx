'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Ride } from '@/library/types/types';
import {
  getRidesJoinedByUser,
  leaveJoinedRide,
} from '@/library/private/private';
import PrivateJoinedCard from './PrivateJoinedCard';

export default function ridesJoined() {
  const { data: session, status } = useSession();
  const accessUserRoute = useRef([]);
  const [inProcess, setInProcess] = useState(false);
  const [click, setClick] = useState(false);
  const [call, setCall] = useState(false)

  setInterval(() => {
    setCall(!call)
  }, 5000)

  useEffect(() => {
    const handleGetUserRoute = async () => {
      if (inProcess) {
        return;
      }
      setInProcess(true);
      const routeFromDb = await getRidesJoinedByUser(session?.user?.email);
      const parsedRoute = JSON.parse(routeFromDb);
      accessUserRoute.current = parsedRoute;
      setInProcess(false);
    };
    handleGetUserRoute();
  }, [click, call]);

  if (accessUserRoute.current) {
    return (
      <>
        <h2>MY CREATED ROUTES</h2>
        <section>
          {accessUserRoute.current.map((route: Ride, index: number) => {
            return (
              <article key={`${index}_${route.createdDate}`}>
                <PrivateJoinedCard
                  route={route}
                  setClick={setClick}
                  click={click}
                />
              </article>
            );
          })}
        </section>
      </>
    );
  }
}
