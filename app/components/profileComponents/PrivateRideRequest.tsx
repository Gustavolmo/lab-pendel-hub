'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getUserRequestedRoutes } from '@/library/private/private';
import { Ride } from '@/library/types/types';
import PrivateRequestedCard from './PrivateRequestedCard';

export default function PrivateRideRequest() {
  const { data: session, status } = useSession();
  const accessUserRoute = useRef([]);
  const [inProcess, setInProcess] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    const handleGetUserRoute = async () => {
      if (inProcess) {
        return;
      }
      setInProcess(true);
      const routeFromDb = await getUserRequestedRoutes(session?.user?.email);
      const parsedRoute = JSON.parse(routeFromDb);
      accessUserRoute.current = parsedRoute;
      setInProcess(false);
    };
    handleGetUserRoute();
  }, [click]);

  if (accessUserRoute.current) {
    return (
      <>
        <h2>MY CREATED ROUTES</h2>
        <section>
          {accessUserRoute.current.map((route: Ride, index: number) => {
            return (
              <article key={`${index}_${route.createdDate}`}>
                <PrivateRequestedCard
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
