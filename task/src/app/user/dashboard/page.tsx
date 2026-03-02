'use client'

import { useEffect, useState } from 'react'

import { useAuth } from '@/hooks/useAuth'
import { useJob } from '@/hooks/useJobs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WithdrawFromJob } from '@/utils/WithdrawFromJob'
import { useRouter } from 'next/navigation'

export default function UserDashboardPage() {
  const { user } = useAuth()
  const { jobs } = useJob()
  const router = useRouter()

  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([])
  const [loadingJobIds, setLoadingJobIds] = useState<string[]>([])

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (!user?.id) return

      try {
        const res = await fetch(`http://localhost:4000/users/${user.id}`)
        if (!res.ok) return
        const data = await res.json()
        setAppliedJobIds(data.applyJOb ?? [])
      } catch (error) {
        console.error(error)
      }
    }

    fetchAppliedJobs()
  }, [user?.id])

  useEffect(() => {
    if (!user) router.replace('/login')
  }, [router, user])

  if (!user) return null

  const appliedJobs = jobs.filter((job) => appliedJobIds.includes(String(job.id)))

  const totalApplied = appliedJobIds.length

  const handleWithdraw = async (jobId: string) => {
    if (!user?.id) return

    setLoadingJobIds((prev) => [...prev, jobId])
    try {
      const updatedUser: any = await WithdrawFromJob(user.id, jobId)
      if (updatedUser && Array.isArray(updatedUser.applyJOb)) {
        setAppliedJobIds(updatedUser.applyJOb)
      } else {
        setAppliedJobIds((prev) => prev.filter((id) => id !== jobId))
      }
    } finally {
      setLoadingJobIds((prev) => prev.filter((id) => id !== jobId))
    }
  }

  return (
    <div className="min-h-[80vh]">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">User dashboard</h1>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500">
                Name
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-gray-900">{user.name}</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500">
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-900">{user.email}</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-500">
                Applied jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">
                {totalApplied}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">
              Applied job details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {appliedJobs.length === 0 ? (
              <p className="text-sm text-gray-600">
                You have not applied to any jobs yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {appliedJobs.map((job) => {
                  const id = String(job.id)
                  const isWithdrawing = loadingJobIds.includes(id)

                  return (
                    <li
                      key={job.id}
                      className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b last:border-b-0 pb-3 last:pb-0"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{job.title}</p>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                          {job.location}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={isWithdrawing}
                          onClick={() => handleWithdraw(id)}
                        >
                          {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
                        </Button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

