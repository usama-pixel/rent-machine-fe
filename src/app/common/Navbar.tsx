import Image from 'next/image'
import React, { useState } from 'react'
import logo from 'logo'
import { useRouter } from 'next/navigation';
import Button3 from './Button3';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
type Props = {}

function Navbar({}: Props) {
  const router = useRouter();
  const [showOpts, setShowOpts] = useState(false);
  const user = useSelector((state: RootState) => state.user)
  const logout = () => {
    localStorage.clear();
    router.replace('/login');
  }
  return (
    <div className='w-full flex justify-between mr-3'>
        <div className='w-12 h-12 rounded-full overflow-hidden'>
            <Image src={'/logo.jpeg'} alt="logo" width={100} height={100} />
        </div>
        <div className='relative'>
          <div className='w-12 h-12 rounded-full overflow-hidden'>
            <Image
              onClick={() => setShowOpts(!showOpts)}
              src={'/logo.jpeg'}
              alt="logo"
              width={100}
              height={100}
            />
          </div>
          <div className={`absolute top-12 right-3 bg-slate-50 py-2 px-3 rounded-lg ${!showOpts && 'invisible'}`}>
            <span>{user.id || 'id'} - {user.name || 'name'}</span>
            <Button3 onClick={logout} text='logout' />
          </div>
        </div>
    </div>
  )
}

export default Navbar