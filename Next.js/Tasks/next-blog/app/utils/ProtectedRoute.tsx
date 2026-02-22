'use client'
import { useRouter } from "next/navigation"
import { useAuth } from "../hooks/useAuth"
import { useEffect } from "react"

function ProtectedRoute({ children }: { children: React.ReactNode }) {

    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, isLoading, router])

    if (isLoading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center text-[var(--text-muted)]">
                Loading...
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    return <>{children}</>
}

export default ProtectedRoute
