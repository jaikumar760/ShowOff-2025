"use client"
import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import animationData from "./GlobalPost.json"
export const MyPostAnimation = () => {
  return (
    <div className='sm:w-1/6 w-3/6' >
      <Player src={animationData} loop  autoplay   />
    </div>
  )
}