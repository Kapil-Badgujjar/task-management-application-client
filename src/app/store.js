import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice/userSlice';
import taskReduceer from '../features/taskSlice/taskSlice';
import adminReducer from '../features/adminSlice/adminSlice';
import commentReducer from '../features/commentsSlice/commentsSlice';
import dashboardReducer from '../features/dashboardSlice/dashboardSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        tasks: taskReduceer,
        admin: adminReducer,
        comment: commentReducer,
        dashboard: dashboardReducer
    }
})