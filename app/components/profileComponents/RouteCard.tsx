'use client';
import { Ride } from '@/library/types/types';
import React from 'react';
// import { Ride } from '@/library/types/types'

export default function RouteCard({ route }: any) {
  //{routeData: Ride}
  console.log(route.current);
  return (
    <article className='route-card'>
      ROUTES CARD
      {route.pointA}
    </article>
  );
}
