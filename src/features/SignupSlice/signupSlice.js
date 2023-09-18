import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostRequest } from '../../utility/fetchAPICalls';

const registerUser = createAsyncThunk(
    'register',
    async(_,thunkAPI) => {
        try {
            const { username, email, password, confirmPassword } = thunkAPI.getState().signup.user;
            if(!username || !email || !password || !confirmPassword) throw new Error('Please enter proper values!');
            if(password !== confirmPassword) throw new Error('Confirm password not matched!');
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if(!emailPattern.test(email))  throw new Error("Invalid email");
            const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if(!pattern.test(password)) throw new Error('Create strong password *(AZaz09!#$@)')
            return await fetchPostRequest('/users/signup',{username, email, password});
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)
const initialState = {
    user: {
        username: undefined,
        email: undefined,
        password: undefined,
        confirmPassword: undefined
    },
    status: 'idle',
    error: null
}

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.user.username = action.payload;
        },
        setEmail: (state, action) => {
            state.user.email = action.payload;
        },
        setPassword: (state, action) => {
            state.user.password = action.payload;
        },
        setConfirmPassword: (state, action) => {
            state.user.confirmPassword = action.payload;
        },
        removeError: (state, action) => {
            state.error = null;
        },
        setStatus: (state, action) => {
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.user = {
                username: undefined,
                email: undefined,
                password: undefined,
                confirmPassword: undefined
            },
            state.status = 'Successful';
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.status = 'rejected';
        })
    }
})

export { registerUser };

export const selectSignupUser = state => state.signup.user;
export const selectSignupError = state => state.signup.error;
export const selectSignupStatus = state => state.signup.status;

export const { setUsername, setEmail, setPassword, setConfirmPassword, removeError, setStatus } = signupSlice.actions;

export default signupSlice.reducer;