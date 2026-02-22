import { Post } from "@/app/Types/Blog";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from '../Service/postService'

interface initialType {
    posts: Post[]
    currentPost: Post | null
    featuredPosts: Post[]
    recentPosts: Post[]
    totalPosts: number
    loading: boolean
    error: string | null
    filters: {
        category: string | null
        tag: string | null
        search: string
        sortBy: 'latest' | 'popular' | 'oldest'
    }
    pagination: {
        currentPage: number
        totalPages: number
        postsPerPage: number
    }
}

const initialState: initialType = {
    posts: [],
    currentPost: null,
    featuredPosts: [],
    recentPosts: [],
    totalPosts: 0,
    loading: true,
    error: null,
    filters: {
        category: null,
        tag: null,
        search: '',
        sortBy: 'latest',
    },
    pagination: {
        currentPage: 0,
        totalPages: 0,
        postsPerPage: 0,
    }
};

const fetchPosts = createAsyncThunk('Post/getAllPOst', async (_, thunkAPI) => {
    try {
        const allPost = await postService.fetchPosts();
        return allPost;

    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

const fetchPostBySlug = createAsyncThunk('Post/fetchPostBySlug', async ({ id }: { id: string }, thunkAPI) => {
    try {
        const signalPost = await postService.fetchPostBySlug(id);
        return signalPost;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

const createPost = createAsyncThunk('Post/createPost', async (post: Post, thunkAPI) => {
    try {
        const newPost = await postService.createPost(post);
        return newPost;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

const updatePost = createAsyncThunk('Post/updatePost', async (post: Post, thunkAPI) => {
    try {

        const updatedPost = await postService.updatePost(post);
        return { post, updatedPost };

    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

const deletePost = createAsyncThunk('Post/deletePost', async ({ id }: { id: string }, thunkAPI) => {
    try {
        const deletedPost = await postService.deletePost(id);
        return deletedPost;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

const likePost = createAsyncThunk('Post/likePost', async ({ id, userId, email }: { id: string, userId: string, email: string }, thunkAPI) => {
    try {
        const deletedPost = await postService.likePost({ id, userId, email });
        return deletedPost;

    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})


const incrementViews = createAsyncThunk('Post/incrementViews', async ({ id }: { id: string }, thunkAPI) => {
    try {
        const deletedPost = await postService.incrementViews(id);
        return deletedPost;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})


const setFilters = createAsyncThunk('Post/setFilters', (filters: string[], thunkAPI) => {
    try {

    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})



const postsSlice = createSlice({
    name: 'postsSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.totalPosts = state.posts.length;
                state.loading = false;
                state.error = null
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            .addCase(fetchPostBySlug.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchPostBySlug.fulfilled, (state, action) => {
                state.currentPost = action.payload;
                state.loading = false;
                state.error = null
            })
            .addCase(fetchPostBySlug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.currentPost = action.payload;
                state.loading = false;
                state.error = null
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updatePost.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.posts = action.payload.updatedPost;
                state.currentPost = action.payload.post;
                state.loading = false;
                state.error = null
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            .addCase(deletePost.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.currentPost = null;
                state.posts = action.payload;
                state.loading = false;
                state.error = null
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

    }
})



export default postsSlice.reducer;
export { fetchPosts, fetchPostBySlug, createPost, updatePost, deletePost, likePost, incrementViews, setFilters };
