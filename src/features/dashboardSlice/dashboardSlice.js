import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGetRequest } from '../../utility/fetchAPICalls';

const getStats = createAsyncThunk(
    'getStats',
    async() => {
        try {
            return await fetchGetRequest('/tasks/getstats');
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

export default dashboardSlice.reducer;