'use client';
import { getAllCategory, getAllLocation, setCurrentCategory, setCurrentLocation } from '@/redux/Slices/categoriesSlice';
import {  AppDispatch, AppStore } from '@/redux/store'
import { Category, Location } from '@/Type'
import { createContext, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const defaultValue: {
    categories: Category[]
    location: Location[]
    currentCategory: Category | null
    currentLocation: Location | null
    SetLocation: (category:string) => void;
    SetCategory: (location:string) => void;
} = {
    categories: [],
    location: [],
    currentCategory: null,
    currentLocation: null,
    SetLocation: () => {},
    SetCategory : () => {},
}

export const CategoryContext = createContext(defaultValue)


export default function CategoryProvider({ children }: { children: React.ReactNode }) {

    const dispatch = useDispatch<AppDispatch>();

    const CatStore = useSelector((state: AppStore) => state.categories)
    const categories = CatStore.categories;
    const location = CatStore.location;
    const currentCategory = CatStore.currentCategory;
    const currentLocation = CatStore.currentLocation;

    useEffect(() => {
        dispatch(getAllCategory());
        dispatch(getAllLocation());
    }, [dispatch])

    const SetLocation = useCallback((location:string)=> {
        dispatch(setCurrentLocation(location))
    },[dispatch])

    const SetCategory = useCallback((category:string)=> {
        dispatch(setCurrentCategory(category))
    },[dispatch])

    return (
        <CategoryContext.Provider value={{
            categories,
            currentCategory,
            location,
            currentLocation,
            SetLocation,
            SetCategory,        
        }}>
            {children}
        </CategoryContext.Provider>
    )
}
