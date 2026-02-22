import { Comment } from "@/app/Types/Comment";
import { createSlice } from "@reduxjs/toolkit";

interface initialType {
  comments: Comment[]
  commentsByPost: { [postId: string]: Comment[] }
  pendingComments: Comment[]
  totalComments: number
  loading: boolean
  error: string | null
}


const initialState:initialType = {
  comments: [],
  commentsByPost: {},
  pendingComments:[],
  totalComments: 0,
  loading: true,
  error: null,
};

const commentsSlice =  createSlice({
    name:'commentsSlice',
    initialState,
    reducers:{
    }
})



export default commentsSlice.reducer;