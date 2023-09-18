import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPostRequest, fetchGetRequest } from "../../utility/fetchAPICalls";
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const getUserDetails = createAsyncThunk(
    'getUser/user',
    async function (_,thunckAPI) {
        try {
            return await fetchGetRequest('/getuserDetails');
        } catch ( error ) {
            throw error;
        }
    }
)

const loginUser = createAsyncThunk(
    'login/user',
    async (_,thunkAPI)=>{
        try {
            const { email_id, password } = thunkAPI.getState().user.user;
            if(!emailPattern.test(email_id))  throw new Error("Invalid email");
            if(!pattern.test(password)) throw new Error('Create strong password *(AZaz09!#$@)')
            return await fetchPostRequest('/users/login', {email_id, password});
        } catch (error) {
            throw new Error('User Not Found!');
        }
    }
)

const updateDetails = createAsyncThunk(
    'updateDetails',
    async (_,thunkAPI) => {
        const { username, email } = thunkAPI.getState().user.update;
        if(!emailPattern.test(email))  throw new Error("Invalid email");
        try{
            return await fetchPostRequest('/users/editmyprofile', {isPasswordUpdate: false, username, email});
        } catch( error ) {
            throw error;
        }
    }
)

const updatePassword = createAsyncThunk(
    'updatePassword',
    async (_,thunkAPI) => {
        const { new_password, confirm_password } = thunkAPI.getState().user.update;
        if(!pattern.test(new_password)) throw new Error('Create strong password *(AZaz09!#$@)');
        if(new_password !== confirm_password) throw new Error('Confrim Password not matched');
        try{
            return await fetchPostRequest('/users/editmyprofile', { isPasswordUpdate: true, password: new_password });
        } catch( error ) {
            throw error;
        }
    }
)

const initialState = {
    user: {
        id: undefined,
        email_id: undefined,
        password: undefined,
        username: undefined,
        role: undefined,
    },
    update: {
        email: undefined,
        username: undefined,
        new_password: undefined,
        confirm_password: undefined
    },
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmailValue: (state, action) => {
            state.user.email_id = action.payload;
        },
        setPasswordValue: (state, action) => {
            state.user.password = action.payload;
        },
        logout: (state, action) => {
            localStorage.removeItem('albedoAccessToken');
            state.user = initialState;
        },
        removeError: (state, action) => {
            state.error = null;
        },
        setUpdateUsername: (state, action) => {
            state.update.username = action.payload;
        },
        setUpdateEmail: (state, action) => {
            state.update.email = action.payload;
        },
        setNewPassword: (state, action) => {
            state.update.new_password = action.payload;
        },
        setConfirmPassword: (state, action) => {
            state.update.confirm_password = action.payload;
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(getUserDetails.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(getUserDetails.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = 'Successful';
        })
        .addCase(getUserDetails.rejected, (state, action) => {
            state.error = action.error.message;
            state.status = 'failed';
        })
        .addCase(loginUser.pending,(state, action)=>{
            state.status = 'pending';
        })
        .addCase(loginUser.fulfilled,(state, action)=>{
            state.user = action.payload;
            state.status = 'fulfilled';
        })
        .addCase(loginUser.rejected,(state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
            state.user = {
                id: undefined,
                email_id: undefined,
                password: undefined,
                username: undefined,
                role: undefined,
            }
        })
        .addCase(updateDetails.pending, (state, action) => {
            state.status = 'pending';
        })
        .addCase(updateDetails.fulfilled, (state, action) => {
            state.user = action.payload;
            state.update = {
                email: undefined,
                username: undefined,
                new_password: undefined,
                confirm_password: undefined
            }
            state.status = 'fulfilled';
        })
        .addCase(updateDetails.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(updatePassword.pending, (state, action) => {
            state.status = 'pending';
        })
        .addCase(updatePassword.fulfilled, (state, action) => {
            state.update = {
                email: undefined,
                username: undefined,
                new_password: undefined,
                confirm_password: undefined
            }
            state.status = 'fulfilled';
        })
        .addCase(updatePassword.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})

export { getUserDetails, loginUser, updateDetails, updatePassword };

export const selectUser = (state) => state.user.user;
export const selectUpdate = (state) => state.user.update;
export const selectLoginError = (state) => state.user.error;

export const { setEmailValue, setPasswordValue, removeError, logout, setUpdateUsername, setUpdateEmail, setNewPassword, setConfirmPassword } = userSlice.actions;

export default userSlice.reducer;