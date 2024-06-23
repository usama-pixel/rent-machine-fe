'use client';
// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import socketReducer from './features/socket/socketSlice';
import userReducer from './features/auth/userSlice';

const rootReducer = combineReducers({
  socket: socketReducer,
  user: userReducer,
});


export default rootReducer;
