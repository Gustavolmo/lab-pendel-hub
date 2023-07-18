'use client';
import React, { useEffect, useRef, useState } from 'react';
import RouteCard from './RouteCard';
import { useSession } from 'next-auth/react';
import { getUserRoutes } from '@/library/private/private';

// import { Ride } from '@/library/types/types';

export default function routesCreated() {
  const { data: session, status } = useSession();
  const accessUserRoute = useRef([]);
  const [inProcess, setInProcess] = useState(false);

  useEffect(() => {
    const handleGetUserRoute = async () => {
      if (inProcess) {
        return;
      }
      setInProcess(true);
      const routeFromDb = await getUserRoutes(session?.user?.email);
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
          {
          accessUserRoute.current.map((route) => {
            return <RouteCard route={route} />
          })
          }
        </section>
      </>
    );
  }
}
