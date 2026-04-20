import React, { useState } from 'react'

const ProjectCard = ({data}) => {
      const {name , discription , priority , status} = data;
      const [range , setRange] = useState(30)
  return (
    <div className='border border-gray-400  mr-4 rounded-md mt-8 p-2 px-3 w-[full] sm:w-[30%] md:w-[30%] '>
      <h3 className='text-sm font-bold'>{name}</h3>
      <p className='text-xs text-zinc-500 font-semibold'>{discription || "No Discription"}</p>
      <div className='flex justify-between text-xs my-2'>
            <span className='bg-zinc-400    px-2   rounded-md'>{status.toUpperCase()}</span>
            <span className='text-zinc-700'>{priority.toUpperCase()} </span>
      </div>
      <div>
            <div className='flex justify-between text-xs mt-2'>
                  <p className='font-semibold text-zinc-700'>progress</p>
                  <p className='font-semibold text-zinc-700'>{range}%</p>
            </div>
          <input type="range" min={0} max="100" value={range} className="w-full range range-info range-xs" />
            
      </div>

    </div>
  )
}

export default ProjectCard;