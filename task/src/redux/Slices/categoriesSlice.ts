import { Category, Location } from "@/Type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jsonURL:string = process.env.JSON_SERVER_URL ??  'http://localhost:4000';

interface initialType {
  categories: Category[]
  location: Location[]
  currentCategory: Category | null
  currentLocation: Location | null
  loading: boolean
  error: string | null
}


const initialState: initialType = {
  categories: [],
  location: [],
  currentCategory: null,
  currentLocation: null,
  loading: true,
  error: null,
};



const getAllCategory = createAsyncThunk(
  'getAllCategory',
  async (
    _, thunkAPI
  ) => {

    try {
      const response = await axios.get(jsonURL + '/category')
      if (response) {
        return response.data;
      }
      throw new Error(response)
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  })


const getAllLocation = createAsyncThunk(
  'getAllLocation',
  async (
    _, thunkAPI
  ) => {

    try {
      const response = await axios.get(jsonURL + '/location')
      if (response) {
        return response.data;
      }
      throw new Error(response)
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  })


  


const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload
    },
    setCurrentLocation: (state, action) => {
      state.currentCategory = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload
        state.error = null;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string
      })

      .addCase(getAllLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.location = action.payload
        state.error = null;

      })
      .addCase(getAllLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string

      })

    }
  })



export default categoriesSlice.reducer;
export const { setCurrentCategory, setCurrentLocation } = categoriesSlice.actions
export { getAllCategory, getAllLocation }