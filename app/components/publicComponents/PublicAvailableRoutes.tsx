'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Ride } from '@/library/types/types';
import { getAllOfferedRoutes } from '@/library/public/public';
import PublicRouteCard from './PublicRouteCard';

export default function PublicAvailableRoutes() {
  const accessUserRoute = useRef<any>([]);
  const [inProcess, setInProcess] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
      const asyncByPass = async () => {
        if (inProcess) {
          return;
        }
        setInProcess(true);
        const routeFromDb = await getAllOfferedRoutes();
        accessUserRoute.current = routeFromDb;
        setInProcess(false);
      };
      asyncByPass();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const asyncByPass = async () => {
        if (inProcess) {
          return;
        }
        setInProcess(true);
        const routeFromDb = await getAllOfferedRoutes();
        accessUserRoute.current = routeFromDb;
        setInProcess(false);
      };
      asyncByPass();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [click]);

  if (accessUserRoute.current) {
    return (
      <>
        {accessUserRoute.current.map((route: Ride, index: number) => {
          return (
            <div className="info-card" key={`${index}_${route.createdDate}`}>
              <PublicRouteCard
                route={route}
                click={click}
                setClick={setClick}
              />
            </div>
          );
        })}
      </>
    );
  }
}
