'use client';
import { createNewRequest, createNewRide } from '@/library/private/private';
import { Ride } from '@/library/types/types';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import '../styles/RouteForm.css'

export default function routeForm() {
  const { data: session, status } = useSession();
  const date = String(new Date().toLocaleDateString());
  const [isChecked, setIsChecked] = useState(false)

  const [formData, setFormData] = useState<Ride>({
    driverId: '',
    driverName: '',
    requestorId: '',
    requestorName: '',
    createdDate: date,
    availableFromDate: '',
    pointA: '',
    pointB: '',
    timeFromA: '',
    timeFromB: '',
    tripTime: '',
    passengers: [],
    capacity: 0,
    frequency: '',
    message: '',
    carDescription: '',
    fare: 0,
    isRequest: isChecked,
    paxCount: 0,
  });

  const checkBoxChange = () => {
    setIsChecked(!isChecked)
  }

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isChecked){
      createNewRequest(session?.user?.email, {...formData, isRequest: isChecked});
    } else {
      createNewRide(session?.user?.email, {...formData, isRequest: isChecked});
    }

    setFormData({
      driverId: '',
      driverName: '',
      requestorId: '',
      requestorName: '',
      createdDate: date,
      availableFromDate: '',
      pointA: '',
      pointB: '',
      timeFromA: '',
      timeFromB: '',
      tripTime: '',
      passengers: [],
      capacity: 0,
      frequency: '',
      message: '',
      carDescription: '',
      fare: 0,
      isRequest: isChecked,
      paxCount: 0,
    });

    setIsChecked(false)
  };

  return (
    <section className="">
      <h1>CREATE ROUTE</h1>

      <div>
        <form className="" onSubmit={formHandler}>
          <div>
            <input
              id="request"
              type="checkbox"
              name="isRequest"
              onClick={checkBoxChange}
              checked={isChecked}
              onChange={(e) => {e.target.checked = isChecked}}
              className='switch'
            />
          </div>

          <label>Addresses</label>
          <input
            type="text"
            placeholder="From Address"
            required
            name="pointA"
            onChange={handleChange}
            value={formData.pointA}
          />
          <input
            type="text"
            placeholder="To Address"
            required
            name="pointB"
            onChange={handleChange}
            value={formData.pointB}
          />

          <label>Available From</label>
          <input
            type="date"
            min="2023-01-01"
            max="2027-12-31"
            required
            name="availableFromDate"
            onChange={handleChange}
            value={formData.availableFromDate}
          />
          <label>Times</label>
          <input
            type="text"
            placeholder="departure time inboud"
            required
            name="timeFromA"
            onChange={handleChange}
            value={formData.timeFromA}
          />
          <input
            type="text"
            placeholder="departure time outbound"
            required
            name="timeFromB"
            onChange={handleChange}
            value={formData.timeFromB}
          />
          <input
            type="text"
            placeholder="travel time"
            required
            name="tripTime"
            onChange={handleChange}
            value={formData.tripTime}
          />

          <label>Frequency</label>
          <input
            type="text"
            placeholder="Which week days will you drive?"
            required
            name="frequency"
            onChange={handleChange}
            value={formData.frequency}
          />
          <label>Capacity</label>
          <input
            type="number"
            min={1}
            max={20}
            name="capacity"
            onChange={handleChange}
            value={formData.capacity}
          />

          <label>Details</label>
          <textarea
            id=""
            cols={30}
            rows={6}
            placeholder="Add a message"
            required
            name="message"
            onChange={handleChange}
            value={formData.message}
          ></textarea>

          <textarea
            id=""
            cols={30}
            rows={3}
            placeholder="Describe your vehicle"
            required
            name="carDescription"
            onChange={handleChange}
            value={formData.carDescription}
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}
