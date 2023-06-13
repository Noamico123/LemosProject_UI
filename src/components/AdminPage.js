import React, { useState, useEffect } from 'react'
import UsersTable from './UsersTable'
import { useAuth } from '../contexts/AuthContext'
import NavBar from './NavBar'


export default function AdminPage() {

  return (
    <>
    <NavBar/>
    {/* <div className='w-100 text-center mt-5'> */}
    <div className='w-100 mt-5'>
        <UsersTable/>
    </div>
    </>
  )
}
