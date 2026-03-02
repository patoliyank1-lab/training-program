'use client';
import { getAllJobs, getCurrentJob, getNewJob } from '@/redux/Slices/jobSlice';
import {  AppDispatch, AppStore } from '@/redux/store'
import {  Jobs } from '@/Type'
import { createContext, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplyToJob } from '@/utils/ApplyToJob'


const defaultValue: {
    jobs:Jobs[]
    currentJob: Jobs | null
    recentJobs: Jobs[]
    totalJobs: number
    getJobs:()=> void,
    getNewJobs:() => void,
    getJob:(id:string) => void
    jobApply:(U_id:string, J_id:string ) => void
} = {
    jobs:[],
    currentJob: null,
    recentJobs: [],
    totalJobs: 0,
    getJobs:()=> {},
    getNewJobs:() => {},
    getJob :( ) => {},
    jobApply: () => {}
}


export const JobsContext = createContext(defaultValue)


export default function JobProvider({ children }: { children: React.ReactNode }) {

    const dispatch = useDispatch<AppDispatch>();

    const jobStore = useSelector((state: AppStore) => state.jobs)

    const jobs = jobStore.jobs;
    const currentJob = jobStore.currentJob;
    const recentJobs = jobStore.recentJobs;
    const totalJobs = jobStore.totalJobs;

    const getJobs = useCallback(()=>{
        dispatch(getAllJobs())
    },[dispatch])
    const getNewJobs = useCallback(()=>{
        dispatch(getNewJob())
    },[dispatch])

    const getJob = useCallback((id:string)=>{
        dispatch(getCurrentJob({id}))
    },[dispatch])

     const jobApply = useCallback((U_id:string, J_id:string )=>{
        ApplyToJob(U_id, J_id)
    },[])


    useEffect(()=>{
        getJobs();
        getNewJobs();
    },[getJobs, getNewJobs])

        return (
            <JobsContext.Provider value={{
                jobs,
                currentJob,
                recentJobs,
                totalJobs,       
                getJobs,
                getNewJobs,
                getJob,
                jobApply,
            }}>
                {children}
            </JobsContext.Provider>
        )
}