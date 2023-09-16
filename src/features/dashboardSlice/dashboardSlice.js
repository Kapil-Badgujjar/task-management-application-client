import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getStats = createAsyncThunk(
    'getStats',
    async() => {
        try {
            const response = await fetch('http://localhost:7171/tasks/getStats',{
                credentials: 'include',
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('albedoAccessToken')
                }
            }).then(response => response.status === 200 && response.json());
            console.log(response);
            return response;
        } catch(error) {
            throw error;
        }
    }
)

const initialState = {
    stats: [],
    status: 'idle',
    error: null
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getStats.pending, (state, action) => {
            state.status = 'Loading'
        })
        .addCase(getStats.fulfilled, (state, action) => {
            state.stats = action.payload;
            state.status = 'Fulfilled';
        })
        .addCase(getStats.rejected, (state, action) => {
            state.error = action.error.message;
            state.status = 'Rejected';
        })
    }
})

export { getStats };

export const selectStats = state => state.dashboard.stats;
export const selectError = state => state.dashboard.error;

export const {} = dashboardSlice.actions;

export default dashboardSlice.reducer;