import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getTasks = createAsyncThunk(
    'fetch/tasks',
    async(_,thunkAPI) => {
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

const initialState = {
    taskList: [],
    status: 'idle',
    error: null,
}

const tasks = createSlice({
    name: 'tasks',
    initialState,
    reducers: {

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
    }
})

export {getTasks};

export const selectTasks = (state) => state.tasks.taskList;

export const {} = tasks.actions;

export default tasks.reducer;