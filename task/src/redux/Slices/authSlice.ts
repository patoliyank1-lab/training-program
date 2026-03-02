import { setItem } from "@/hooks/useLocalStorage";
import { StoreUser, User } from "@/Type";
import generateId from "@/utils/generateId";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const JSON_URL = 'http://localhost:4000'

interface initialType {
  user: StoreUser | null
  isAuthenticated: boolean
  isAdmin: boolean
  loading: boolean
  error: string | null
}


const initialState: initialType = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  loading: false,
  error: null,
};


const CheckLogin = createAsyncThunk(
  'Auth/login',
  async (
    { email, password }: { email: string, password: string }, thunkAPI
  ) => {

    try {
      if (email && password) {
        const response = await axios.get(JSON_URL + `/users?email=${email}&password=${password}`)
        if(response.data.length === 0) throw new Error ('user Not found');
        console.log(response.data);
        
        return response.data[0];
      }
      return null
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  })


const registerUser = createAsyncThunk(
  'Auth/register',
  async(
    {name,age,gender,email,password,avatar}:{name:string,age:string,gender:string,email:string,password:string,avatar:string}
    ,thunkAPI) => {
    const user:User = {
    id: generateId(),
    name: name,
    age: Number(age),
    gender: gender,
    email: email,
    password: password,
    avatar: avatar,
    applyJOb:[],
    createdAt: new Date().toISOString(),
    }
    
    try {
        const haveEmail = await axios.get(JSON_URL+ `/users?email=${email}`)

        if(haveEmail.data.length !== 0 ){
          throw new Error('user is already register') 
        }
        if (user) {
            const response = await axios.post(JSON_URL + '/users', user)  
            return response.data;
        }
        return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }

  }
)

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser(state, action) {
      const newUser: StoreUser = action.payload;
      state.user = { ...newUser };
      state.isAuthenticated = true;
    },

    removeUser(state) {
      state.user = null;
      state.isAdmin = false;
      state.isAuthenticated = false;
    },
  },
  extraReducers : (builder) =>{
    builder
    .addCase(CheckLogin.pending,(state) => {
      state.loading = true;
    })
    .addCase(CheckLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isAdmin = state.user && state.user.role === 'admin' ? true : false;
      setItem('UserDetails', action.payload);
    })
    .addCase(CheckLogin.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.user = null;
      state.error = action.payload as string;
    })
    .addCase(registerUser.pending,(state) => {
      state.loading = true;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isAdmin = state.user && state.user.role === 'admin' ? true : false;
      setItem('UserDetails', action.payload);
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.user = null;
      state.error = action.payload as string;
    })
  }
})



export default authSlice.reducer;
export const { setUser } = authSlice.actions;
export const { removeUser } = authSlice.actions;
export { CheckLogin, registerUser };

