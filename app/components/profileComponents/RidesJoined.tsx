'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Ride } from '@/library/types/types';
import { getRidesJoinedByUser } from '@/library/private/private';
import PrivateJoinedCard from './PrivateJoinedCard';

export default function ridesJoined() {
  const { data: session, status } = useSession();
  const accessUserRoute = useRef([]);
  const [inProcess, setInProcess] = useState(false);

  useEffect(() => {
    const handleGetUserRoute = async () => {
      if (inProcess) {
        return;
      }
      setInProcess(true);
      const routeFromDb = await getRidesJoinedByUser(session?.user?.email);
      console.log(routeFromDb)
      const parsedRoute =  JSON.parse(routeFromDb);
      accessUserRoute.current = parsedRoute;
      setInProcess(false);
    };
    handleGetUserRoute();
  }, []);

  if (accessUserRoute.current) {
    return (
      <>
        <h2>MY CREATED ROUTES</h2>
        <section>
          {accessUserRoute.current.map((route: Ride, index: number) => {
            return (
              <article key={`${index}_${route.createdDate}`}>
                <PrivateJoinedCard route={route} />
              </article>
            );
          })}
        </section>
      </>
    );
  }
}
