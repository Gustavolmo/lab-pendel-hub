import { DefaultSession } from 'next-auth'
import React from 'react'

export default function UserImage({ user } : { user: DefaultSession['user'] }) {
  return (
    <div>
      <img src={user?.image?.toString()} alt="" />
    </div>
  )
}
