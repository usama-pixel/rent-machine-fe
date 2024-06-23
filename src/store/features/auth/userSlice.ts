'use client';

import { RootState } from '@/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    name: string;
    id: string;
    displayName: string;
    email: string;
    profile_pic: string;
}

const initialState: UserState = {
    name: '',
    id: '',
    displayName: '',
    email: '',
    profile_pic: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            // console.log('setting user bro:', action.payload);
            Object.assign(state, action.payload);
        },
    }
});

export const { setUser } = userSlice.actions;
export const selectUser = ((state:RootState) => state.user);

export default userSlice.reducer;