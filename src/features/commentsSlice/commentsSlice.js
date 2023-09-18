import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGetRequest, fetchPostRequest } from "../../utility/fetchAPICalls";

const getComments = createAsyncThunk(
    'getComments',
    async(data) => {
        try{
            const taskid = data;
            return await fetchGetRequest(`/comments/getcomments/${taskid}`);
        } catch( error ) {
            console.log( error );
            throw error;
        }
    }
)

const saveComment = createAsyncThunk(
    'saveComment',
    async(_,thunkAPI) => {
        try {
            const { id, comment } = thunkAPI.getState().comment;
            await fetchPostRequest('/comments/savecomment',{id, comment});
        } catch (error) {
            console.log( error );
        }
    }
)

const initialState = {
    comments: [],
    id: undefined,
    comment: undefined,
    status: 'idle',
    error: null
}

const commentsSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
        writeComment: (state, action) => {
            state.comment = action.payload;
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(getComments.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(getComments.fulfilled, (state, action) => {
            state.comments = action.payload;
            state.status = 'Success';
        })
        .addCase(getComments.rejected, (state, action) => {
            state.status = 'Rejected';
            state.error = action.error.message;
        })

    }
});

export {getComments, saveComment};

export const selectComments = state => state.comment.comments;
export const selectComment = state => state.comment.comment;

export const { setId, writeComment } = commentsSlice.actions;

export default commentsSlice.reducer;