'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from "@/hooks/useAuth";
import { useJob } from "@/hooks/useJobs";

function JobPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { jobs } = useJob()

  const currentJob = jobs[Number(id) - 1]

  
  const onApply = () => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    
    router.push(`/jobs/${id}/apply`)
  }
  
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">

        <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-900">{currentJob.title}</h1>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-gray-600 text-sm font-medium">{currentJob.company}</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
              <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-600">

                  {currentJob.location}
                </div>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1.5">

                    {currentJob.salary}
                  </span>
                </div>

                
              </div>
            </div>


            <div className="flex flex-wrap items-center justify-end gap-4">
             

              <div className="flex gap-3">
                <Button variant={'outline'} onClick={onApply}>
                  {!isAuthenticated ? 'Login to apply' : 'Apply now'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl">
          <CardContent className="p-6 space-y-5">
            <h2 className="text-lg font-bold text-gray-900">Job description</h2>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Responsibilities:</p>
              <ul className="space-y-1">
                {currentJob.description}
              </ul>
            </div>

            <div className="space-y-2 text-sm">
              {[
                { label: "Department", value: currentJob.title },
                { label: "Employment Type", value: currentJob.type },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-2">
                  <span className="font-semibold text-gray-800 min-w-[130px]">{label}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>


            <div>
              <p className="text-sm font-bold text-gray-800 mb-1">Key Skills</p>
              <p className="text-xs text-gray-400 mb-3">
                Skills highlighted
              </p>
              <div className="flex flex-wrap gap-2">
                {currentJob.skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs border border-gray-300 rounded-full px-3 py-1 text-gray-600 bg-white"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-200 rounded-2xl">
          <CardContent className="p-6 space-y-3">
            <h2 className="text-lg font-bold text-gray-900">About company</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Unitech Technocrats is a leading provider of industrial equipment solutions, specializing in machinery maintenance, customer service, and technical support across India. With a dedicated team of engineers, we ensure seamless operations for our clients across multiple sectors.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 pt-1">
              <span className="flex items-center gap-1.5">
                {currentJob.location}
              </span>
              <span className="flex items-center gap-1.5">
                51-200 Employees
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default JobPage