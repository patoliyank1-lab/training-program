'use client'
import { redirect } from "next/navigation"
import { useAuth } from "../hooks/useAuth"

function ProtectedRoute({children}:{children:React.ReactNode}) {

    const { isAuthenticated, isLoading } = useAuth()


    if(isAuthenticated && !isLoading){
        return (
            <div>
        {children}
        </div>
    )
    }else{
        console.log(isAuthenticated);
        redirect('/login')
    }
}

export default ProtectedRoute

