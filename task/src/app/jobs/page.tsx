"use client";
import HeadSec from "@/components/layouts/Jobs/head-sec";
import JobSec from "@/components/layouts/Jobs/job-sec";
import { useJob } from "@/hooks/useJobs";
import { Jobs } from "@/Type";
import { useCallback, useEffect, useState } from "react";

export default function JobPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string, location?: string, category?: string }>
}) {
  const { jobs } = useJob();
  // const searchParams = useSearchParams();
  const [jobArr, setJobArr] = useState<Jobs[]>([]);

  const filteredJobs = useCallback( async() => {

   const {q, location, category} = await searchParams;

    if (!q && !location && !category) return jobs;

    return jobs.filter((job) => {
      if (location && job.location.toLowerCase() !== location) return false;
      if (category && !job.title.toLowerCase().includes(category)) return false;
      if (!q) return true;

      const allKeyword = [
        job.title,
        job.company,
        job.location,
        job.type,
        job.description,
        ...(job.skills ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return allKeyword.includes(q);
    });
  }, [jobs, searchParams]);

  useEffect(()=>{
    (async() => {
      const fun = await filteredJobs();
      setJobArr(fun)
    })();
  },[filteredJobs])
  return (
    <div className="">
      <HeadSec />
      <JobSec jobs={jobArr} />
    </div>
  );
}
