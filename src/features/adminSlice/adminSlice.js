import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGetRequest, fetchPostRequest } from "../../utility/fetchAPICalls";

// AsyncThunk to get users from server
const getUsers = createAsyncThunk(
    'getUsers',
    async () => {
        try {
            return await fetchGetRequest('/users/fetchallusers');
        } catch (error) {
            throw new Error(error.message);
        }
    }
)

// To update user role
const updateUserRole = createAsyncThunk(
    'updateUser',
    async(data) => {
        try {
            return await fetchPostRequest('/users/updateuserrole',{id: data.id, role: data.role});
        } catch (err) {
            throw err;
        };
    }
)
    
// To add new task
const addTask = createAsyncThunk(
    'addTask',
    async (_, thunkAPI) => {
        try {
            const { title, deadline,  assignedTo, tags, description } = thunkAPI.getState().admin.task;
            if(!title||!deadline||!assignedTo||!tags||!description) throw  new Error("Required valeus can't be empty");
            return await fetchPostRequest('/tasks/addnewtask', {title,deadline,assignedTo,tags,description});
        } catch (error) {
            throw new Error(error.message);
        }
    }
)

// To update task
const updateTask = createAsyncThunk(
    'updateTask',
    async (_, thunkAPI) => {
        try {
            const {id, title, deadline,  assignedTo, tags, description, status } = thunkAPI.getState().admin.task;
            if(!id||!title||!deadline||!tags||!description) throw  new Error("Required valeus can't be empty");
            return await fetchPostRequest('/tasks/updatetask',{id, title, deadline,  assignedTo, tags, description, status });
        } catch (error) {
            throw new Error(error.message);
        }
    }
)

// To update status
const updateStatus = createAsyncThunk(
    'updateStatus',
    async (_, thunkAPI) => {
        try {
            const {id, status } = thunkAPI.getState().admin.task;
            if(!id||!status) {
                throw  new Error("Required valeus can't be empty");
            }
            return await fetchPostRequest('/tasks/updatetaskstatus',{ id, status });
        } catch (error) {
            throw new Error(error.message);
        }
    }
)

// Initial state of the admin slice
const initialState = {
    users: [],
    task: {
        id: undefined,
        title: undefined,
        deadline: undefined,
        assignedTo: undefined,
        tags: undefined,
        description: undefined,
        status: undefined,
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
        setStatus: (state, action) => {
            state.task.status = action.payload;
        },
        showError: (state, action) => {
            state.error = action.payload;
        },
        removeError: (state, action) => {
            state.error = null;
        },
        setTask: (state, action) => {
            console.log(action.payload);
            state.task = {
                id: action.payload.id,
                title: action.payload.title,
                deadline: action.payload.deadline.slice(0,10),
                assignedTo: action.payload.assignedTo,
                tags: action.payload.tags,
                description: action.payload.description,
                status: action.payload.status,
            };
        },
        resetTask: (state, action) => {
            state.task = {
                id: undefined,
                title: undefined,
                assignedTo: undefined,
                tags: undefined,
                description: undefined,
                status: undefined,
            }
        },
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
        .addCase(updateUserRole.pending, (state, action) => {
            state.status = 'Loading';
        })
        .addCase(updateUserRole.fulfilled, (state, action) => {
            state.users.map( user=> {
                if(user.id === action.payload.id) user.role = action.payload.role;
                return user;
            })
            state.status = 'success';
        })
        .addCase(updateUserRole.rejected, (state, action) => {
            state.status = 'failed';
        })
        .addCase(addTask.pending, (state, action) => {
            state.status = 'Loading';
        })
        .addCase(addTask.fulfilled, (state, action) => {
            state.task = {
                id: undefined,
                title: undefined,
                assignedTo: undefined,
                tags: undefined,
                description: undefined,
                status: undefined,
            };
            state.status = 'Successful';
        }).
        addCase(addTask.rejected, (state, action) => {
            state.error = action.error.message;
            state.status = 'Failed';
        })
        .addCase(updateTask.pending, (state, action) => {
            state.status = 'Loading';
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            state.status = 'Fullfilled';
        })
        .addCase(updateTask.rejected, (state, action) => {
            state.error = action.error.message;
            state.status = 'Failed';
        })
        .addCase(updateStatus.pending, (state, action) => {
            state.status = 'Loading';
        })
        .addCase(updateStatus.fulfilled, (state, action) => {
            state.status = 'Fullfilled';
        })
        .addCase(updateStatus.rejected, (state, action) => {
            state.error = action.error.message;
            state.status = 'Failed';
        })
    }
})

export { getUsers, updateUserRole, addTask, updateTask, updateStatus };

export const selectUsers = (state) => state.admin.users;
export const selectTask = (state) => state.admin.task;
export const selectError = (state) => state.admin.error;
export const selectStatus = (state) => state.admin.status;

export const { setTitle, setDeadline, setAssignedTo, setTags, setDescription, setStatus, showError, removeError, setTask, resetTask } = adminSlice.actions;

export default adminSlice.reducer;