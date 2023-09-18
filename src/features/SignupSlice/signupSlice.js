import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostRequest } from '../../utility/fetchAPICalls';

const register = createAsyncThunk(
    'register',
    async(_,thunkAPI) => {
        try {
            const { username, email, password, confirmPassword } = thunkAPI.getState().signup.user;
            console.log(username, email, password, confirmPassword);
            if(!username || !email || !password || !confirmPassword) throw new Error('Please enter proper values!');
            if(password !== confirmPassword) throw new Error('Confirm password not matched!');
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if(!emailPattern.test(email))  throw new Error("Invalid email");
            const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if(!pattern.test(password)) throw new Error('Create strong password *(AZaz09!#$@)')
            const response = await fetchPostRequest('/users/signup',{username, email, password});
            return response;
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(register.fulfilled, (state, action) => {
            state.status = 'successed';
        })
        .addCase(register.rejected, (state, action) => {
            state.error = action.error.message;
            state.status = 'rejected';
        })
    }
})

export { register };

export const selectSignupUser = state => state.signup.user;
export const selectSignupError = state => state.signup.error;

export const { setUsername, setEmail, setPassword, setConfirmPassword, removeError } = signupSlice.actions;

export default signupSlice.reducer;