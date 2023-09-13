import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice/userSlice';
import taskSlice from '../features/taskSlice/taskSlice';
import adminSlice from '../features/adminSlice/adminSlice';
export const store = configureStore({
    reducer: {
        user: userSlice,
        tasks: taskSlice,
        admin: adminSlice
    }
})