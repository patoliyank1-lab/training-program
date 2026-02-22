'use client';
import { createContext, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppStore } from '../redux/store'
import { CheckLogin, registerUser, removeUser, setUser } from '../redux/Slices/authSlice';
import { StoreUser, User } from '../Types/User';
import { getItem, setItem } from '../hooks/useLocalStorage';

const defaultValue: {
    user: StoreUser | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isLoading:boolean;
    login: ({email, password} : {email:string, password:string}) => void;
    logout: () => void;
    register: ({name, age, gender, email, password, avatar}:{name: string; age: string; gender: string; email: string; password: string; avatar: string}) => void;

} = {
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    isLoading:false,
    login: () => { },
    logout: () => { },
    register: () => { },
}

export const AuthContext = createContext(defaultValue)


export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const dispatch = useDispatch<AppDispatch>();

    const AuthStore = useSelector((state: AppStore) => state.auth)
    const user = AuthStore.user;
    const isAuthenticated = AuthStore.isAuthenticated;
    const isAdmin = AuthStore.isAdmin;
    const isLoading = AuthStore.loading;


    const login = useCallback(({email, password} : {email:string, password:string}) => {
      dispatch(CheckLogin({email, password}))
    },[dispatch])

    const logout = useCallback(() => {
        dispatch(removeUser())
        setItem('UserDetails', null)
    },[dispatch])

    const register = useCallback((
        {name, age, gender, email, password, avatar}:
        {name: string; age: string; gender: string; email: string; password: string; avatar: string}
    ) => {
     dispatch(registerUser({name, age, gender, email, password, avatar}))
    },[dispatch])


const renderFunction = useCallback(()=>{
    const storeUser:StoreUser | null = getItem('UserDetails',null)
        if (storeUser) {
            dispatch(setUser(storeUser))
        }
},[dispatch])

    useEffect(()=>{
        renderFunction()
    },[renderFunction])

    return (
        <AuthContext.Provider value={{ user, isAuthenticated,isAdmin, isLoading,  login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )

}