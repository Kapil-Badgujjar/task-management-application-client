import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// AsyncThunk to fetch all tasks from server
const getTasks = createAsyncThunk(
    'fetch/tasks',
    async() => {
        const token = localStorage.getItem('albedoAccessToken');
        try{
            const response = await fetch('http://localhost:7171/tasks/fetchtasks',{
                credentials: 'include',
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(response => { if(response.status === 200) { return response.json(); }});
            console.log(response);
            if(response) return response;
        } catch(error){
            console.log(error);
            throw error;
        }
    }
)

// AsyncThunk to get last added task from the server
const getLastTask = createAsyncThunk(
    'fetch/lasttask',
    async() => {
        const token = localStorage.getItem('albedoAccessToken');
        try{
            const response = await fetch('http://localhost:7171/tasks/fetchlasttasks',{
                credentials: 'include',
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(response => { if(response.status === 200) { return response.json(); }});
            console.log(response);
            if(response) return response[0];
        } catch(error){
            console.log(error);
            throw error;
        }
    }
)

// Initial state of our slice
const initialState = {
    taskList: [],
    status: 'idle',
    error: null,
}

// Creating slice
const tasks = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        taskSlice_updateTask: (state, action) => {
            console.log(action.payload);
            state.taskList.map(task => {
                if(task.id === action.payload.id){
                    task.title = action.payload.title,
                    task.description = action.payload.description,
                    task.status = action.payload.status,
                    task.tag = action.payload.tags,
                    task.deadline = action.payload.deadline
                }
                return task;
            })
        },
        taskSlice_updateStatus: (state, action) => {
            console.log(action.payload);
            state.taskList.map(task => {
                if(task.id === action.payload.id){
                    task.status = action.payload.status
                }
                return task;
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTasks.pending, (state, action)=>{
            state.status = 'pending';
        })
        .addCase(getTasks.fulfilled, (state, action)=>{
            state.taskList= action.payload;
            state.status = 'succeeded';
        })
        .addCase(getTasks.rejected, (state, action)=>{
            state.error = 'Some Error occurred'
        })
        .addCase(getLastTask.pending, (state, action)=>{
            state.status = 'pending';
        })
        .addCase(getLastTask.fulfilled, (state, action)=>{
            state.taskList.push(action.payload);
            state.status = 'succeeded';
        })
        .addCase(getLastTask.rejected, (state, action)=>{
            state.error = 'Some Error occurred'
        })
    }
})

export {getTasks, getLastTask};

export const selectTasks = (state) => state.tasks.taskList;

export const { taskSlice_updateTask, taskSlice_updateStatus } = tasks.actions;

export default tasks.reducer;