import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const loginUser = createAsyncThunk(
    'login/user',
    async (_,thunkAPI)=>{
        try {
            const { email_id, password } = thunkAPI.getState().user.user;
            const response =  await fetch('http://localhost:7171/users/login', {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email_id, password })
            }).then(response =>{ if(response.status === 200) return response.json(); else throw new Error('Invalid - Check Email/Password again!')});

            console.log(response);
            localStorage.setItem('albedoAccessToken', response.albedoAccessToken);
            return {
                id: response.id,
                email_id: response.email_id,
                username: response.username,
                password: undefined,
                role: response.role,
                update_email: undefined,
                update_new_password: undefined,
                update_confirm_password: undefined
            }
        } catch (error) {
            throw new Error(error.message);
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
        update_email: undefined,
        update_username: undefined,
        update_new_password: undefined,
        update_confirm_password: undefined
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
            state.user = initialState;
        },
        removeError: (state, action) => {
            state.error = null;
        }
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
            state.status = 'failed';
            state.error = action.error.message;
            state.user = {
                id: undefined,
                email_id: undefined,
                password: undefined,
                username: undefined,
                role: undefined,
                update_email: undefined,
                update_username: undefined,
                update_new_password: undefined,
                update_confirm_password: undefined
            }
        });
    }
})

export { loginUser };

export const selectUser = (state) => state.user.user;
export const selectLoginError = (state) => state.user.error;

export const { setEmailValue, setPasswordValue, removeError, logout } = userSlice.actions;

export default userSlice.reducer;