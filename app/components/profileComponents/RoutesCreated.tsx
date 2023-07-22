'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getUserOfferedRoutes } from '@/library/private/private';
import { Ride } from '@/library/types/types';
import PrivateOfferRouteCard from './PrivateOfferRouteCard';

export default function routesCreated() {
  const { data: session, status } = useSession();
  const accessUserRoute = useRef([]);
  const [inProcess, setInProcess] = useState(false);
  const [click, setClick] = useState(false);
  const [call, setCall] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const asyncByPass = async () => {
        if (inProcess) {
          return;
        }
        setInProcess(true);
        const routeFromDb = await getUserOfferedRoutes(session?.user?.email);
        const parsedRoute = JSON.parse(routeFromDb);
        accessUserRoute.current = parsedRoute;
        setInProcess(false);
        setCall(!call);
      };
      asyncByPass();
    }, 2000);
  }, [click, call]);

  useEffect(() => {
    const asyncByPass = async () => {
      if (inProcess) {
        return;
      }
      setInProcess(true);
      const routeFromDb = await getUserOfferedRoutes(session?.user?.email);
      const parsedRoute = JSON.parse(routeFromDb);
      accessUserRoute.current = parsedRoute;
      setInProcess(false);
      setCall(!call);
    };
    asyncByPass();
  }, []);

  if (accessUserRoute.current) {
    return (
      <>
        {accessUserRoute.current.map((route: Ride, index: number) => {
          return (
            <article
              className="info-card"
              key={`${index}_${route.createdDate}`}
            >
              <PrivateOfferRouteCard
                route={route}
                setClick={setClick}
                click={click}
              />
            </article>
          );
        })}
      </>
    );
  }
}
