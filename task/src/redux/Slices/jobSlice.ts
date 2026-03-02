import { Jobs } from "@/Type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jsonURL: string = process.env.JSON_SERVER_URL || 'http://localhost:4000';


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


const getAllJobs = createAsyncThunk(
    'getAllJobs',
    async (
        _, thunkAPI
    ) => {

        try {
            const response = await axios.get(jsonURL + '/job')
            if (response) {
                return response.data;
            }
            throw new Error(response)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    })

const getNewJob = createAsyncThunk(
    'getNewJobs',
    async (
        _, thunkAPI
    ) => {

        try {
            const response = await axios.get(jsonURL + '/job?_sort=-id&_page=1&_per_page=5')
            if (response) {
                return response.data.data;
            }
            throw new Error(response)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    })


  

const getCurrentJob = createAsyncThunk(
    'getCurrentJob',
    async (
        { id }: { id: string }, thunkAPI
    ) => {

        try {
            const response = await axios.get(jsonURL + `/job/${id}`)
            if (response) {
                return response.data.data;
            }
            throw new Error(response)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    })

const getJobByFiller = createAsyncThunk(
    'getJobByFiller',
    async (
        { search, category, location, }: { search: string, category?: string, location?: string }, thunkAPI
    ) => {

        try {
            let SearchURL: string = jsonURL + `/job`;

            if (!category && !location) {
                SearchURL = jsonURL + `/job?location:contains=${search}&title:contains=${search}`
            } else if (category && !location) {
                SearchURL = jsonURL + `/job?title=${category}&location:contains=${search}&title:contains=${search}`
            } else if (location && !category) {
                SearchURL = jsonURL + `/job?location=${location}&location:contains=${search}&title:contains=${search}`
            } else {
                SearchURL = jsonURL + `/job?location=${location}&title=${category}&location:contains=${search}&title:contains=${search}`
            }
            const response = await axios.get(SearchURL);
            if (response) {
                return response.data.data;
            }
            throw new Error(response)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    })



const jobSlice = createSlice({
    name: 'jobSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllJobs.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload
                state.totalJobs = state.jobs.length
                state.error = null;
            })
            .addCase(getAllJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })


            .addCase(getNewJob.pending, (state) => {
                state.loading = true;
            })
            .addCase(getNewJob.fulfilled, (state, action) => {
                state.loading = false;
                state.recentJobs = action.payload
                state.error = null;
            })
            .addCase(getNewJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })


            .addCase(getCurrentJob.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentJob.fulfilled, (state, action) => {
                state.loading = false;
                state.currentJob = action.payload
                state.error = null;
            })
            .addCase(getCurrentJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
    }

})



export default jobSlice.reducer;

export { getAllJobs, getNewJob, getJobByFiller, getCurrentJob }
