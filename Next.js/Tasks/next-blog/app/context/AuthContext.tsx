'use client';
import { createContext, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStore } from '../redux/store'
import { removeUser, setUser } from '../redux/Slices/authSlice';
import { StoreUser, User } from '../Types/User';
import { CheckLogin, registerUser } from '../utils/authFunctions';
import { getItem, setItem } from '../hooks/useLocalStorage';

const defaultValue: {
    user: StoreUser | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: ({email, password} : {email:string, password:string}) => void;
    logout: () => void;
    register: (user:User) => void;

} = {
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    login: () => { },
    logout: () => { },
    register: () => { },
}

export const AuthContext = createContext(defaultValue)


export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const dispatch = useDispatch();

    const AuthStore = useSelector((state: AppStore) => state.auth)
    const user = AuthStore.user;
    const isAuthenticated = AuthStore.isAuthenticated;
    const isAdmin = AuthStore.isAdmin;


    const login = useCallback(({email, password} : {email:string, password:string}) => {
        const user:StoreUser | null = CheckLogin({email, password});
        if(user){
            dispatch(setUser(user))
            setItem('UserDetails', user)
        }
    },[dispatch])

    const logout = useCallback(() => {
        dispatch(removeUser())
        setItem('UserDetails', null)
    },[dispatch])

    const register = useCallback((user:User) => {
        if(registerUser(user)){
            dispatch(setUser({id:user.id, name:user.name, email:user.email, role:user.role, avatar:user.avatar }));
            setItem('UserDetails', {id:user.id, name:user.name, email:user.email, role:user.role, avatar:user.avatar });
        }
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
        <AuthContext.Provider value={{ user, isAuthenticated,isAdmin, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )

}