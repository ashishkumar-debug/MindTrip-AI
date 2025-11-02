import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[60px] text-center mt-16'> <span className='text-[#f56551]'>Unlock the World with AI:</span> Tailored Trips, Effortless Planning</h1>
        <p className='text-xl text-gray-500  text-center'>Your intelligent travel companion, crafting personalized journeys that match your style, pace, and budget.</p>

        <Link to={'/create-trip'}>
          <Button>Start Planning Free</Button>
        </Link>

        <img src='landing.png' className='-mt-[20]' />
    </div>
  )
}

export default Hero