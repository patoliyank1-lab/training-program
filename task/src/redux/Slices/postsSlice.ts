import { Jobs } from "@/Type";
import { createSlice } from "@reduxjs/toolkit";

interface initialType {
    jobs: Jobs[]
    currentJob: Jobs | null
    recentJobs: Jobs[]
    totalJobs: number
    loading: boolean
    error: string | null
}

const initialState: initialType = {
    jobs: [],
    currentJob: null,
    recentJobs: [],
    totalJobs: 0,
    loading: true,
    error: null,
};


const postsSlice = createSlice({
    name: 'postsSlice',
    initialState,
    reducers: {
    },
  
})



export default postsSlice.reducer;
