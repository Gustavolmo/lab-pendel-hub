'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Ride } from '@/library/types/types';
import { getAllOfferedRoutes } from '@/library/public/public';
import PublicRouteCard from './PublicRouteCard';

// import { Ride } from '@/library/types/types';

export default function PublicAvailableRoutes() {
  const { data: session, status } = useSession();
  const accessUserRoute = useRef([]);
  const [inProcess, setInProcess] = useState(false);
  const [click, setClick] = useState(false)

  useEffect(() => {
    const handleGetUserRoute = async () => {
      if (inProcess) {
        return;
      }
      setInProcess(true);
      const routeFromDb = await getAllOfferedRoutes();
      const parsedRoute = JSON.parse(routeFromDb);
      accessUserRoute.current = parsedRoute;
      setInProcess(false);
    };
    handleGetUserRoute();
  }, [click]);

  if (accessUserRoute.current) {
    return (
      <>
        <h2>ROUTES AVAILABLE</h2>
        <section>
          {accessUserRoute.current.map((route: Ride, index: number) => {
            return (
              <article key={`${index}_${route.createdDate}`}>
                <PublicRouteCard route={route} click={click} setClick={setClick} />
              </article>
            );
          })}
        </section>
      </>
    );
  }
}
