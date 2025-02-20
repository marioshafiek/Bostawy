import React from 'react'
//Gifs
import Bostawy from '../assets/gifs/Bostawy.gif?react'
//Router
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='flex flex-col gap-4 items-center justify-center min-h-[500px] md:min-h-[400px]'>
        {/* Title */}
        <Link to='/'>
            <img className="md:w-190 m-0 text-[#e30715] cursor-pointer" src={Bostawy} alt="Bastawy Logo Animaiton" />
        </Link>
         {/* Desc */}
         <div className='text-3xl'>Inspired By BOSTA</div>
         <div className='flex flex-col items-center'>
            <div className='text-md font-bold'>@Bosta task 2025</div>
            <div className='text-md font-bold'>@marioshafiek</div>
         </div>
        
    </div>
  )
}

export default About