'use client';
import { createNewRide } from '@/library/private/private';
import { Ride } from '@/library/types/types';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function routeForm() {
  const { data: session, status } = useSession();
  const date = String(new Date().toLocaleDateString());
  const [isChecked, setIsChecked] = useState(false) 
  const [formData, setFormData] = useState<Ride>({
    driverId: '',
    driverName: '',
    passengerId: '',
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
    isRequest: false,
  });

  const checkBoxChange = () => {
    setIsChecked(!isChecked)
    console.log(isChecked)
  }

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createNewRide(session?.user?.email, formData);
  };

  return (
    <section className="create-route">
      <h1>CREATE ROUTE</h1>

      <div>
        <form className="create-route__route-form" onSubmit={formHandler}>
          <div>
            <input
              id="request"
              type="checkbox"
              name="isRequest" // NOT IMPLEMENTED
              onClick={checkBoxChange}
            />
            <label>I would like to request this route - NOT FUNCTIONAL</label>
          </div>

          <label>Addresses</label>
          <input
            type="text"
            placeholder="From Address"
            required
            name="pointA"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="To Address"
            required
            name="pointB"
            onChange={handleChange}
          />

          <label>Times</label>
          <input
            type="date"
            min="2023-01-01"
            max="2027-12-31"
            required
            name="availableFromDate"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="departure time inboud"
            required
            name="timeFromA"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="departure time outbound"
            required
            name="timeFromB"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="travel time"
            required
            name="tripTime"
            onChange={handleChange}
          />

          <label>Frequency</label>
          <input
            type="text"
            placeholder="Which week days will you drive?"
            required
            name="frequency"
            onChange={handleChange}
          />
          <label>Capacity</label>
          <input
            type="number"
            min={1}
            max={20}
            onChange={handleChange}
            name="capacity"
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
          ></textarea>

          <textarea
            id=""
            cols={30}
            rows={3}
            placeholder="Describe your vehicle"
            required
            name="carDescription"
            onChange={handleChange}
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}
