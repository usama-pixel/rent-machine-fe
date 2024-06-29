'use client';
import React, { KeyboardEvent, SyntheticEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store';
import { initializeSocket } from '@/utils/socket';
import { setSocket } from '@/store/features/socket/socketSlice';
import OutgoingMsg from '../common/OutgoingMsg';
import IncommingMsg from '../common/IncommingMsg';
import { selectUser, setUser } from '@/store/features/auth/userSlice';
import { apiGet } from '@/utils/api';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { getUser } from '@/utils/getUser';


type Props = {}

function Chat({}: Props) {
  const [msgs, setMsgs] = useState<any[]>([]);
  const [msg, setMsg] = useState('')
  let socket = useSelector((state: RootState) => state.socket.value)
  console.log({socketId: socket?.id})
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const searchParams = useSearchParams();
  const contactId = searchParams.get('userId');
  console.log({contactId})
  useEffect(() => {
    getData();
    socket?.on('onMessage', (data) => {
      console.log({data})
      setMsgs((prev) => [...prev, {...data,}]);
    });
    return () => {
      socket?.off('onMessage'); // Cleanup the event listener on component unmount
    };
  }, [])
  const getData = async () => {
    let userId = user.id;
    if(!userId) {
      try {
        const res = await apiGet('auth/me')
        dispatch(setUser(res.data))
        userId = res.data.id
      } catch(err) {
        console.log(err)
      }
    }
    if(!userId) return;
    try {
      console.log('broo')
      console.log({contactId, userId})
      const r = await apiGet(`/message?userId=${userId}&contactId=${contactId}`)
      setMsgs(r.data)
      console.log({r})

    } catch(err) {
      console.log({err})
    }
  }
  const handleSend = () => {
    console.log({msgs})
    if (!socket) {
      return;
    }
    socket.emit('newMessage', {msg, from: user.id, to: contactId});
    console.log({msg, from: user.id, to: contactId})
    setMsgs((prev) => [...prev, {content: {text: msg, from: {id: user.id}, to: {id: contactId}}}]);
    setMsg(''); // Clear the input field after sending the message
  };
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };
  // let user = useSelector(selectUser);
  // useEffect(() => {
  //   getData2();
  //   return () => {
  //     socket?.off('onMessage'); // Cleanup the event listener on component unmount
  //   };
  // }, [socket]);
  const getData2 = async () => {
    let tempUser = user;
    if(!user.id) {
      tempUser = await getUser(dispatch, setUser);
    }
    
    if (!socket) {
      const s = initializeSocket(tempUser.id);
      dispatch(setSocket(s));
      socket = s;
    }
    socket?.on('onMessage', (data) => {
      console.log({data})
      setMsgs((prev) => [...prev, {...data,}]);
    });
  }
  return (
    // <!-- component -->
    <div className="flex h-screen overflow-hidden">
        {/* <!-- Sidebar --> */}
        <div className="w-1/4 bg-white border-r border-gray-300">
          {/* <!-- Sidebar Header --> */}
          <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
            <h1 className="text-2xl font-semibold">Chat Web</h1>
            <div className="relative">
              <button id="menuButton" className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                </svg>
              </button>
              {/* <!-- Menu Dropdown --> */}
              <div id="menuDropdown" className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden">
                <ul className="py-2 px-3">
                  <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 1</a></li>
                  <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 2</a></li>
                  {/* <!-- Add more menu options here --> */}
                </ul>
              </div>
            </div>
          </header>
        
          {/* <!-- Contact List --> */}
          <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Alice ({user.displayName})</h2>
                <p className="text-gray-600">Hoorayy!!</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Martin</h2>
                <p className="text-gray-600">That pizza place was amazing! We should go again sometime. 🍕</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/2e83ad/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Charlie</h2>
                <p className="text-gray-600">Hey, do you have any recommendations for a good movie to watch?</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/c2ebff/0f0b14.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">David</h2>
                <p className="text-gray-600">I just finished reading a great book! It was so captivating.</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/e7c2ff/7315d1.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Ella</h2>
                <p className="text-gray-600">What's the plan for this weekend? Anything fun?</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/ffc2e2/ffdbdb.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Fiona</h2>
                <p className="text-gray-600">I heard there's a new exhibit at the art museum. Interested?</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/f83f3f/4f4f4f.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">George</h2>
                <p className="text-gray-600">I tried that new cafe downtown. The coffee was fantastic!</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/dddddd/999999.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Hannah</h2>
                <p className="text-gray-600">I'm planning a hiking trip next month. Want to join?</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/70ff33/501616.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Ian</h2>
                <p className="text-gray-600">Let's catch up soon. It's been too long!</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/30916c/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Jack</h2>
                <p className="text-gray-600">Remember that hilarious joke you told me? I can't stop laughing!</p>
              </div>
            </div>
            
            
          </div>
        </div>
        
        {/* <!-- Main Chat Area --> */}
        <div className="flex-1">
            {/* <!-- Chat Header --> */}
            <header className="bg-white p-4 text-gray-700">
                <h1 className="text-2xl font-semibold">Alice</h1>
            </header>
            
            {/* <!-- Chat Messages --> */}
            <div className="h-screen overflow-y-auto p-4 pb-96">
              {msgs.map((msg: any) => {
                // console.log({toID: msg?.content?.to.id, userId: user?.id})
                // console.log({'msg?.content?.from?.id': msg?.content?.from?.id, 'user?.id': user?.id})
                return (
                  msg?.content?.from?.id+'' !== user?.id+'' ?
                  <IncommingMsg text={msg?.content?.text} />:
                  <OutgoingMsg text={msg?.content?.text} />
                )
              })}
               {/* <!-- Incoming Message --> */}
               
               {/* <!-- Outgoing Message --> */}
               {/* <OutgoingMessage /> */}
               
               {/* <!-- Incoming Message --> */}
               {/* <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">That book sounds interesting! What's it about?</p>
                 </div>
               </div> */}
               
               {/* <!-- Outgoing Message --> */}
               {/* <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>It's about an astronaut stranded on Mars, trying to survive. Gripping stuff!</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                 </div>
               </div> */}
               
               {/* <!-- Incoming Message --> */}
               {/* <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">I'm intrigued! Maybe I'll borrow it from you when you're done?</p>
                 </div>
               </div> */}
               
               {/* <!-- Outgoing Message --> */}
               {/* <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Of course! I'll drop it off at your place tomorrow.</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                 </div>
               </div> */}
               
               {/* <!-- Incoming Message --> */}
               {/* <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">Thanks, you're the best!</p>
                 </div>
               </div> */}
               
               {/* <!-- Outgoing Message --> */}
               {/* <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Anytime! Let me know how you like it. 😊</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                 </div>
               </div> */}
               
               {/* <!-- Incoming Message --> */}
               {/* <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">So, pizza next week, right?</p>
                 </div>
               </div> */}
               
               {/* <!-- Outgoing Message --> */}
               {/* <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Absolutely! Can't wait for our pizza date. 🍕</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                 </div>
               </div> */}
               {/* <!-- Incoming Message --> */}
               {/* <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">Hoorayy!!</p>
                 </div>
               </div> */}
               
            </div>
            <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
                <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                      onKeyPress={handleKeyPress}
                      onChange={e => setMsg(e.target.value)}
                      value={msg}
                    />
                    <button
                      className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
                      onClick={handleSend}
                    >Send</button>
                </div>
            </footer>
        </div>
    </div>
  )
}

export default Chat