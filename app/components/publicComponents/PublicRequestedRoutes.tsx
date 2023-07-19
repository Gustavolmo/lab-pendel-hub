'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Ride } from '@/library/types/types';
import { getAllRequestedRoutes } from '@/library/public/public';
import PublicRequestedCard from './PublicRequestedCard';

export default function PublicRequestedRoutes() {
  const accessUserRoute = useRef([]);
  const [inProcess, setInProcess] = useState(false);

  useEffect(() => {
    const handleGetUserRoute = async () => {
      if (inProcess) {
        return;
      }
      setInProcess(true);
      const routeFromDb = await getAllRequestedRoutes();
      const parsedRoute = JSON.parse(routeFromDb);
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
                <PublicRequestedCard route={route} />
              </article>
            );
          })}
        </section>
      </>
    );
  }
}
