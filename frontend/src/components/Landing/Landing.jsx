import React from 'react'
import Navbar from '@/components/NavBar/Navbar'
import Team from '@/components/Team/Team'

export default function Landing() {
  return (
    <>
    <div className='min-h-screen bg-white pb-10'>
        <Navbar />
      <div className='mt-32 md:mt-20'>
        {/* <Team /> */}
      </div>
    </div>
    </>
  )
}
