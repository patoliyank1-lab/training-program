'use client'
import HeadSec from "@/components/layouts/Jobs/head-sec";
import JobSec from "@/components/layouts/Jobs/job-sec";
import { useJob } from "@/hooks/useJobs";

export default function JobPage() {
        const {jobs} = useJob();
    return (
        <div className="h-lvh">
            <HeadSec />
            <JobSec jobs={jobs} />
        </div>
    )
}
