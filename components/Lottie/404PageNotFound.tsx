"use client"
import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import animationData from "./404Page2.json"
export const PageNotFound = () => {
  return (
    <div >
      <Player src={animationData} loop  autoplay   />
    </div>
  )
}