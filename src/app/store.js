import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice/userSlice';
import taskSlice from '../features/taskSlice/taskSlice';
export const store = configureStore({
    reducer: {
        user: userSlice,
        tasks: taskSlice,
    }
})