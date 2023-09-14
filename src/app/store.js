import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice/userSlice';
import taskSlice from '../features/taskSlice/taskSlice';
import adminSlice from '../features/adminSlice/adminSlice';
import commentSlice from '../features/commentsSlice/commentsSlice';
export const store = configureStore({
    reducer: {
        user: userSlice,
        tasks: taskSlice,
        admin: adminSlice,
        comment: commentSlice,
    }
})