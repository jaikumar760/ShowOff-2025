"use client"
import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import animationData from "./Animation - 1719421716242.json"
export const JobAnim= () => {
  return (
    <div className='sm:w-2/12 w-4/6' >
      <Player src={animationData} loop  autoplay   />
    </div>
  )
}