'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../common/Navbar';
import Card, { CardProps } from '../common/Card';
import Searchbar from '../common/Searchbar';
import { useSearchParams } from 'next/navigation';
import { initializeSocket } from '@/utils/socket';
import store from '@/store/store';
import type { RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux';
import { setSocket, setTest } from '@/store/features/socket/socketSlice';
import Modal from '../common/Modal';
import { apiGet } from '@/utils/api';
import axios from 'axios';
// import { setSocket } from '@/store/slices/socketSlice';

type Props = {};

const getData = async () => {
    console.log("Loading");
    await new Promise(resolve => setTimeout(resolve, 5000));
};

const Home = ({}: Props) => {
  const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true);
    const params = useSearchParams();
    const token = params.get('token');
    const socket = useSelector((state: RootState) => state.socket.value);
    const t = useSelector((state: RootState) => state.socket.test)
    const dispatch = useDispatch();
    useEffect(() => {
      if(token && !localStorage.getItem('token')) {
        localStorage.setItem('token', token)
        // store.dispatch(setSocket(socket));
      }
      if(!socket) {
        const s = initializeSocket()
        try {
          dispatch(setTest(199));
          dispatch(setSocket(s))
        } catch(err) {
          console.log({err})
        }
      }
      if(socket) {
        // socket.on('newMessage', )
      }
      apiGet('/properties')
      .then(res => {
        console.log('data', res.data)
        setData(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
      // apiGet('/properties')
      // const fetchData = async () => {
      //   await api
      //   // await getData();
      //   setLoading(false);
      // };

    }, []);
    const [open, setOpen] = useState(false);
    console.log({open})
    return (
        <div className='flex flex-col justify-center items-center gap-4 z-0'>
            <Navbar />
            <Searchbar />
            <button onClick={() => setOpen(true)}>Add Property</button>
            { open &&
              // <div className='absolute z-10'>
                <Modal open={open} setOpen={setOpen} />
              // </div>
            }
            <h1>Home</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='flex gap-4'>
                    {data.map(
                      (d: CardProps) =>
                      <Card
                        id={d.id}
                        address={d.address}
                        bathrooms={d.bathrooms}
                        description={d.description}
                        property_name={d.property_name}
                        property_type={d.property_type}
                        rent={d.rent}
                        rooms={d.rooms}
                        sqft={d.sqft}
                        user={d.user}
                      />
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
