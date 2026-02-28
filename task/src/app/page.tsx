import Categories from "@/components/layouts/Home/categories";
import Hero from "@/components/layouts/Home/hero";
import JobSec from "@/components/layouts/Home/jobs-sec";

export default function Home() {
  return (
  <div className="h-lvh overflow-y-auto no-scrollbar ">
    <Hero />
    <Categories />
    <JobSec />
  </div>
  );
}

  