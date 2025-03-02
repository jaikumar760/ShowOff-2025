"use client"
import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import animationData from "./Globe.json"
export const GlobalAnimation= () => {
  return (
    <div className='sm:w-2/12 w-4/6' >
      <Player src={animationData} loop  autoplay   />
    </div>
  )
}