import React from 'react'
import Map from '../common/Map'

type Props = {}

function Property({}: Props) {
  return (
    <div className='flex flex-row'>
        <div className='w-full'>
            <Map />
        </div>
        <div className='w-full bg-yellow-400'>
            world
        </div>
    </div>
  )
}

export default Property