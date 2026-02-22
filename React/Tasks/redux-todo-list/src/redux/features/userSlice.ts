import { createSlice } from '@reduxjs/toolkit'
import type { User } from '../../types/user'
import { removeCurrentUser } from '../../utils/userData';


interface initialType {
    isLogin:boolean;
    theme: string
    user:{
        id: string;
        fullName: string;
        email: string;
        number?: string;
        username: string;
    }
}




const initialState : initialType = {
    isLogin:false,
    theme: 'light',
    user:{
        id: '',
        fullName: '',
        email: '',
        username: '',
    }
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers:{
        setUser(state,action){
            const tempUser : User = action.payload;
            state.isLogin = true;
            state.user.id = tempUser.id;
            state.user.fullName = tempUser.fullName;
            state.user.email = tempUser.email;
            state.user.username = tempUser.username;
        },
        logout(state){
            state = initialState;
            removeCurrentUser();
            return state;
        },
        changeTheme(state){
            state.theme = state.theme === 'dark' ? 'light': 'dark';
            localStorage.setItem('Theme', state.theme)
        },
        getTheme(state){
            const temp = localStorage.getItem('Theme');
            if(temp){
                // temp  = JSON.parse(temp);
                state.theme = temp;
            }
        }
    }
})

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
export const { logout } = userSlice.actions;
export const { changeTheme } = userSlice.actions;
export const { getTheme } = userSlice.actions;

