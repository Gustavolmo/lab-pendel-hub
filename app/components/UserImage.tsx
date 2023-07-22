import { DefaultSession } from 'next-auth'
import React from 'react'

export default function UserImage({ user } : { user: DefaultSession['user'] }) {
  return (
    <div>
      <img className='profile-image' src={user?.image?.toString()} alt="" />
    </div>
  )
}
