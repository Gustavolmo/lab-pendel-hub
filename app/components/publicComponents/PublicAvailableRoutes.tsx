'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getUserRoutes } from '@/library/private/private';
import { Ride } from '@/library/types/types';
import { getAllRoutes } from '@/library/public/public';
import PublicRouteCard from './PublicRouteCard';

// import { Ride } from '@/library/types/types';

export default function PublicAvailableRoutes() {
  const { data: session, status } = useSession();
  const accessUserRoute = useRef([]);
  const [inProcess, setInProcess] = useState(false);

  useEffect(() => {
    const handleGetUserRoute = async () => {
      if (inProcess) {
        return;
      }
      setInProcess(true);
      const routeFromDb = await getAllRoutes();
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
                <PublicRouteCard route={route} />
              </article>
            );
          })}
        </section>
      </>
    );
  }
}
