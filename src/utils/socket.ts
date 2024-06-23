// src/socket.ts
import { setSocket } from '@/store/features/socket/socketSlice';
import { useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initializeSocket = (): Socket => {
  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string); // Ensure the URL is a string
  
  // socket.emit('newMessage', "yoooo broo");
  return socket;
};

export const getSocket = (): Socket => {
  return socket;
};
