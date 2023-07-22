'use client';
import { getAllUserPax } from '@/library/private/private';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';

export default function PassengerCount() {
  const { data: session, status } = useSession();
  const [inProcess, setInProcess] = useState(false);
  const [call, setCall] = useState(false);
  const accessPaxCount = useRef<number>();

  useEffect(() => {
    setTimeout(()=>{
      const asyncByPass = async () => {
        if (inProcess) {
          return;
        }
        setInProcess(true);
        if (session) {
          const paxCount = await getAllUserPax(session?.user?.email);
          if (paxCount > accessPaxCount.current) {
            alert('You got a new passenger');
          }
          accessPaxCount.current = paxCount;
        }
        setInProcess(false);
        setCall(!call)
      };
      asyncByPass();
    }, 2000)
  }, [call]);

  useEffect(() => {
      const asyncByPass = async () => {
        if (inProcess) {
          return;
        }
        setInProcess(true);
        if (session) {
          const paxCount = await getAllUserPax(session?.user?.email);
          accessPaxCount.current = paxCount;
        }
        setInProcess(false);
      };
      asyncByPass();
  }, []);

  if (accessPaxCount.current && session) {
    return (
      <>
        <div className="total-pax">
        &#x1F464; {accessPaxCount.current}
        </div>
      </>
    );
  }
}
