import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const loginUser = createAsyncThunk(
    'login/user',
    async (_,thunkAPI)=>{
        try {
            const { email_id, password } = thunkAPI.getState().user.user;
        
            const response = await fetch('http://localhost:7171/users/login', {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email_id, password })
            });
        
            if (response.status === 200) {
                console.log('Success');
                const responseData = await response.json(); // Parse the response body
                return responseData; // Return the parsed data
            } else {
                console.log('Error:', response.status);
                throw new Error('Login failed'); // Handle the error as needed
            }
        } catch (error) {
            console.log('Error:', error.message);
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
        role: undefined
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
    },
    extraReducers: (builder) =>{
        builder.addCase(loginUser.pending,(state, action)=>{
            state.status = 'pending';
        })
        .addCase(loginUser.fulfilled,(state, action)=>{
            state.user = action.payload;
            state.status = 'fulfilled';
        })
        .addCase(loginUser.rejected,(state, action)=>{
            state.error = 'error occured';
        });
    }
})

export { loginUser };

export const selectUser = (state) => state.user.user;

export const { setEmailValue, setPasswordValue } = userSlice.actions;

export default userSlice.reducer;