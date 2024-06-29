// src/socket.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initializeSocket = (data: any): Socket => {
  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
    query: {userId: data}
  }); // Ensure the URL is a string
  // console.log({data});
  // console.log({chocho: user.id})
  // socket.emit('newMessage', "yoooo broo");
  return socket;
};

export const getSocket = (): Socket => {
  return socket;
};
