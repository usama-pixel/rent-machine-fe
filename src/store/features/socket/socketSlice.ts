'use client';
// src/store/slices/socketSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

export interface SocketState {
  value: Socket | null;
  test: number
}

const initialState: SocketState = {
  value: null,
  test: 1
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.value = action.payload;
    },
    setTest: (state, action) => {
      state.test = action.payload
    }
  },
});

export const { setSocket, setTest } = socketSlice.actions;

export default socketSlice.reducer;

