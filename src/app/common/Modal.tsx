import React, { useState } from 'react'
import Button from './Button'
import Button2 from './Button2'
import { apiPost } from '@/utils/api'

type Props = {
  open: boolean,
  setOpen: any
}

function Modal({open, setOpen}: Props) {
  const [state, setState] = useState({
    property_name: '',
    property_type: '',
    price: '',
    rent: '',
    rooms: '',
    bathrooms: '',
    sqft: '',
    description: '',
    address: '',
    image: '',
    verified: false,
  })
  const handleSubmit = () => {
    apiPost('/properties', state)
    .then(res => console.log({res: res.data}))
    .catch(err => console.log({err}));
    // console.log(state)
  }
  return (
    <div className='absolute z-10 bg-green-500 h-screen w-full'>
      <form className='flex flex-col items-center justify-center h-1/2 w-1/2 bg-red-500 relative top-1/4 left-1/4' onSubmit={e => e.preventDefault()}>
        <input
          className='w-full'
          value={state.property_name}
          onChange={(e) => setState({ ...state, property_name: e.target.value })}
          type="text" placeholder="property_name" />
        <input
          className='w-full'
          value={state.property_type}
          onChange={(e) => setState({ ...state, property_type: e.target.value })}
          type="text" placeholder="property_type" />
        <input
          className='w-full'
          value={state.price}
          onChange={(e) => setState({ ...state, price: e.target.value })}
          type="number" placeholder="price" />
        <input
          className='w-full'
          value={state.rent}
          onChange={(e) => setState({ ...state, rent: e.target.value })}
          type="number" placeholder="rent" />
        <input
          className='w-full'
          value={state.rooms}
          onChange={(e) => setState({ ...state, rooms: e.target.value })}
          type="number" placeholder="rooms" />
        <input
          className='w-full'
          value={state.bathrooms}
          onChange={(e) => setState({ ...state, bathrooms: e.target.value })}
          type="number" placeholder="bathrooms" />
        <input
          className='w-full'
          value={state.sqft}
          onChange={(e) => setState({ ...state, sqft: e.target.value })}
          type="number" placeholder="sqft" />
        <input
          className='w-full'
          value={state.description}
          onChange={(e) => setState({ ...state, description: e.target.value })}
          type="text" placeholder="description" />
        <input
          className='w-full'
          value={state.address}
          onChange={(e) => setState({ ...state, address: e.target.value })}
          type="text" placeholder="address" />
        <input
          className='w-full'
          value={state.image}
          onChange={(e) => setState({ ...state, image: e.target.value })}
          type="text" placeholder="image" />
        {/* <input
          value={state.verified}
          onChange={(e) => setState({ ...state, verified: e.target.value })}
          type="checkbox" /> */}
        {/* <input
          className='cursor-pointer bg-yellow-500'
          type="submit"
          value="Submit"
        /> */}
        <Button2 onClick={handleSubmit} text='Submit' />
        <Button2 onClick={() => setOpen(false)} text='Close' />
        {/* <button onClick={() => setOpen(false)}>Close</button> */}
      </form>
    </div>
  )
}

export default Modal