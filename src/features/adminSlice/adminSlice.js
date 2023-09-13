import { beBY } from "@mui/x-data-grid";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getUsers = createAsyncThunk(
    'getUsers',
    async () => {
        try {
            console.log('getusers called!');
            const response =  await fetch('http://localhost:7171/users/fetchallusers', {
                credentials: 'include',
                method: 'GET',
                mode: 'cors',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('albedoAccessToken')
                },
            }).then(response =>{ if(response.status === 200) return response.json(); else throw new Error('Invalid - Check Email/Password again!')});
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
)

const updateUser = createAsyncThunk(
    'updateUser',
    async(data, thunkAPI) => {
    }
)
    
const addTask = createAsyncThunk(
    'addTask',
    async (_, thunkAPI) => {
        try {
            const { title, deadline,  assignedTo, tags, description } = thunkAPI.getState().admin.task;
            if(!title, !deadline, !assignedTo, !tags, !description) {
                throw  new Error("Required valeus can't be empty");
            }
            console.log(title, deadline, assignedTo, tags, description);
            const response =  await fetch('http://localhost:7171/tasks/addnewtask', {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('albedoAccessToken')
                 },
                body: JSON.stringify({ title, deadline, assignedTo, tags, description })
            }).then(response =>{ if(response.status === 200) return response.json(); else throw new Error('Failed to add task!')});
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
)

const initialState = {
    users: [],
    task: {
        title: undefined,
        deadline: undefined,
        assignedTo: undefined,
        tags: undefined,
        description: undefined
    },
    status: 'idle',
    error: null,
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setTitle: (state, action) => {
            state.task.title = action.payload;
        },
        setDeadline: (state, action) => {
            state.task.deadline = action.payload;
        },
        setAssignedTo: (state, action) => {
            state.task.assignedTo = action.payload;
        },
        setTags: (state, action) => {
            state.task.tags = action.payload;
        },
        setDescription: (state, action) => {
            state.task.description = action.payload;
        },
        removeError: (state, action) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, action) => {
            state.status = 'Loading';
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.status = 'success';
        })
        .addCase(getUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.users = [];
        })
        .addCase(addTask.pending, (state, action) => {
            state.status = 'Loading';
        })
        .addCase(addTask.fulfilled, (state, action) => {
            state.task = {
                title: undefined,
                deadline: undefined,
                assignedTo: undefined,
                tags: undefined,
                description: undefined
            };
            state.status = 'Successful';
        }).
        addCase(addTask.rejected, (state, action) => {
            state.error = action.error.message;
            state.status = 'Failed';
        })
    }
})

export { getUsers, addTask };

export const selectUsers = (state) => state.admin.users;
export const selectTask = (state) => state.admin.task;
export const selectError = (state) => state.admin.error;

export const { setTitle, setDeadline, setAssignedTo, setTags, setDescription, removeError } = adminSlice.actions;

export default adminSlice.reducer;