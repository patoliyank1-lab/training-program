import { Post } from "@/app/Types/Blog";
import { createSlice } from "@reduxjs/toolkit";

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

const postsSlice = createSlice({
    name: 'postsSlice',
    initialState,
    reducers: {
    }
})



export default postsSlice.reducer;