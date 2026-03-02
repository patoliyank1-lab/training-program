'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import clsx from 'clsx';
import { Building, MapPin } from "lucide-react";
import Image from "next/image";
import CompanyImage from '@/assets/jobs-portal-logo.png'
import { Button } from "../ui/button";
import { Jobs } from "@/Type";
import { useRouter } from 'next/navigation'



function JobCard({job}:{job:Jobs}) {

  const router = useRouter();
  const jobType= job.type;


  const OnButtonClick = () => {
      router.push(`/jobs/${job.id}`)
  }

  return (
    <Card className="w-100 gap-2">
  <CardHeader>
   <p className={clsx("text-sm w-fit font-bold py-0.5 px-4 py- rounded-xl", {
    "text-green-600 bg-green-200 border border-green-600" : jobType === "Full-time",
    "text-violet-600 bg-violet-200 border border-violet-600" : jobType === "Freelance",
    "text-blue-600 bg-blue-200 border border-blue-600" : jobType === "Part-time",
   })}>{jobType}</p>
   <CardTitle className="text-3xl">{job.title}</CardTitle> 
  </CardHeader>
  <CardContent>
    <p className="flex text-gray-700 dark:text-gray-200 text-sm gap-2 m-1"><MapPin className="size-4" />{job.location}</p>
    <p className="flex text-gray-700 dark:text-gray-200 text-sm gap-2 m-1"><Building className="size-4" />{job.company}</p>
  </CardContent>
  <CardFooter>
    <div className="flex gap-4 w-full">
        <div className="bg-green-200 size-15 rounded-xl flex justify-center items-center">
            <Image src={CompanyImage} alt="company image" height={1} width={100} />
        </div>
        <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Posted on:</p>
            <div className="text-lg font-medium">{job.postedDate} </div>
        </div>
        <div className="flex-1 flex items-center justify-end">
            <Button onClick={OnButtonClick}>Apply Now</Button>
        </div>
    </div>
  </CardFooter>
</Card>
  )
}

export default JobCard