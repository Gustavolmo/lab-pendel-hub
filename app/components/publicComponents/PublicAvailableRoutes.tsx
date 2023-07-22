'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Ride } from '@/library/types/types';
import { getAllOfferedRoutes } from '@/library/public/public';
import PublicRouteCard from './PublicRouteCard';

export default function PublicAvailableRoutes() {
  const accessUserRoute = useRef([]);
  const [inProcess, setInProcess] = useState(false);
  const [click, setClick] = useState(false)
  const [call, setCall] = useState(false)
  
  useEffect(() => {
    setTimeout(() => {
      const asyncByPass = async () => {
        if (inProcess) {
          return;
        }
        setInProcess(true);
        const routeFromDb = await getAllOfferedRoutes();
        const parsedRoute = JSON.parse(routeFromDb);
        accessUserRoute.current = parsedRoute;
        setInProcess(false);
        setCall(!call)
      };
      asyncByPass();
    }, 2000)
  }, [click, call]);

  useEffect(() => {
      const asyncByPass = async () => {
        if (inProcess) {
          return;
        }
        setInProcess(true);
        const routeFromDb = await getAllOfferedRoutes();
        const parsedRoute = JSON.parse(routeFromDb);
        accessUserRoute.current = parsedRoute;
        setInProcess(false);
        setCall(!call)
      };
      asyncByPass();
  }, []);

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
