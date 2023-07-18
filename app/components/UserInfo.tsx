import { DefaultSession } from 'next-auth'
import React from 'react'

export default function UserInfo({ user } : { user: DefaultSession['user'] }) {
  return (
    <div>
      <img src={user?.image?.toString()} alt="" />
      {/* <p>Hello {user?.name}</p>
      <p>Logged in with {user?.email}</p> */}
    </div>
  )
}
