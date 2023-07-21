'use client';
import { getAllUserPax } from '@/library/private/private';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';

export default function PassengerCount() {
  const { data: session, status } = useSession();
  const [inProcess, setInProcess] = useState(false);
  const [call, setCall] = useState(false);
  const accessPaxCount = useRef<number>();

  setInterval(() => {
    setCall(!call);
  }, 2000);

  useEffect(() => {
    const asyncByPass = async () => {
      if (inProcess) {
        return;
      }
      setInProcess(true);
      if (session) {
        const paxCount = await getAllUserPax(session?.user?.email);
        if (accessPaxCount.current && paxCount > accessPaxCount.current) {
          alert('You got a new passenger');
        }
        accessPaxCount.current = paxCount;
      }
      setInProcess(false);
    };
    asyncByPass();
  }, [call]);

  if (accessPaxCount.current && session) {
    return (
      <>
        <div className="total-pax">
          Total Passengers: {accessPaxCount.current}
        </div>
      </>
    );
  }
}
