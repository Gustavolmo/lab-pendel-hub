'use client'
import React from 'react'

export default function routeForm() {
  return (
    <div>routeForm</div>
  )
}

type Ride = {
  driverId: string // IS THERE A WAY TO CONNECT TO USER?
  passengerId: string
  createdDate: Date,
  pointA: string,
  pointB: string,
  TimeFromA: string,
  TimeFromB: string,
  tripTime: string,
  passengers: string[],
  frequency: string[],
  message: string,
  carDescription: string,
  fare: number
}
