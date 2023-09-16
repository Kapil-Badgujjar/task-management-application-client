import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getComments = createAsyncThunk(
    'getComments',
    async(data,thunkAPI) => {
        try{
            const taskid = data;
            const response = await fetch(`http://localhost:7171/comments/getcomments/${taskid}`, {
                credentials: 'include',
                method: 'GET',
                mode: 'cors',
                headers: { 
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('albedoAccessToken'),
                }
            }).then(response =>{if(response.status == 200) return response.json();});
            console.log(response);
            return response;
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
            const response = await fetch('http://localhost:7171/comments/savecomment', {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('albedoAccessToken')
                },
                body: JSON.stringify({id, comment})
            })
            console.log(response);
            // return response;
        } catch (error) {
            console.log( error );
            // throw error;
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