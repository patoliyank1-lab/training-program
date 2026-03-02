'use client'
import Categories from "@/components/layouts/Home/categories";
import Hero from "@/components/layouts/Home/hero";
import JobSec from "@/components/layouts/Home/jobs-sec";
import { useCat } from "@/hooks/useCat";
import { useJob } from "@/hooks/useJobs";

export default function Home() {
    const {location, categories} = useCat();
    const {recentJobs} = useJob();

  
  return (
  <div className="h-lvh overflow-y-auto no-scrollbar ">
    <Hero location={location} categories={categories}/>
    <Categories categories={categories}  />
    <JobSec jobs={recentJobs}/>
  </div>
  );
}

  