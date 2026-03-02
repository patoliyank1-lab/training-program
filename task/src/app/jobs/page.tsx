'use client'
import HeadSec from "@/components/layouts/Jobs/head-sec";
import JobSec from "@/components/layouts/Jobs/job-sec";
import { useJob } from "@/hooks/useJobs";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export default function JobPage() {
        const {jobs} = useJob();
        const searchParams = useSearchParams()

        const filteredJobs = useMemo(() => {
            const q = (searchParams.get('q') ?? '').trim().toLowerCase()
            const location = (searchParams.get('location') ?? '').trim().toLowerCase()
            const category = (searchParams.get('category') ?? '').trim().toLowerCase()

            if (!q && !location && !category) return jobs

            return jobs.filter((job) => {
                if (location && job.location.toLowerCase() !== location) return false
                if (category && !job.title.toLowerCase().includes(category)) return false

                if (!q) return true

                const haystack = [
                    job.title,
                    job.company,
                    job.location,
                    job.type,
                    job.description,
                    ...(job.skills ?? []),
                ]
                    .join(' ')
                    .toLowerCase()

                return haystack.includes(q)
            })
        }, [jobs, searchParams])
    return (
        <div className="h-lvh">
            <HeadSec />
            <JobSec jobs={filteredJobs} />
        </div>
    )
}
