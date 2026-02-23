import { Comment } from "@/app/Types/Comment";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentService from "../Service/commentService";

interface initialType {
  comments: Comment[]
  pendingComments: Comment[]
  totalComments: number
  loading: boolean
  error: string | null
}


const initialState: initialType = {
  comments: [],
  pendingComments: [],
  totalComments: 0,
  loading: true,
  error: null,
};

const getComment = createAsyncThunk('comment/get', async ({ postId }: { postId: string }, thunkAPI) => {
  try {
    const allComment = await commentService.getComment(postId);
    return allComment;

  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

const addComment = createAsyncThunk('comment/add', async ({ comment }: { comment: Comment }, thunkAPI) => {
  try {
    const allComment = await commentService.addComment(comment);
    return allComment;

  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})


const commentsSlice = createSlice({
  name: 'commentsSlice',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComment.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(getComment.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.comments = action.payload;
        state.totalComments = state.comments.length;
      })
      .addCase(getComment.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false;
        state.comments = [];
        state.totalComments = 0;
      })

      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.comments = action.payload;
        state.totalComments = state.comments.length;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false;
        state.comments = [];
        state.totalComments = 0;
      })
  }

})



export default commentsSlice.reducer;
export { getComment, addComment };