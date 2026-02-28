'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"
import clsx from "clsx"
import { BriefcaseBusiness, MapPin } from "lucide-react";
import { useState } from "react"

function JobSec() {
    const card = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 3, 4, 4, 5, 6, 7, 5]
    return (
        <div className="w-full p-5">
            <div className="mx-auto max-w-315 flex ">
                <div className="bg-amber-100 w-1/5 hidden md:block">a</div>
                <div className=" flex-1">
                    <div className="m-3 p-2 flex flex-wrap justify-center gap-3">

                        {card.map((_, index) => (
                            <JobCard2 key={index} />
                        ))}
                    </div>
                </div>
                <div className="bg-red-200 w-1/7 hidden xl:block">c</div>
            </div>
        </div>
    )
}

export default JobSec



function JobCard2() {
    const [jobType] = useState('Full Time')

    return (
        <Card className="w-full p-3 ">
            <div>
                <p className={clsx("w-fit font-bold py-0.5 px-4 text-xs rounded-xl", {
                    "text-green-600 bg-green-200 border border-green-600": jobType === "Full Time",
                    "text-violet-600 bg-violet-200 border border-violet-600": jobType === "Freelance",
                    "text-blue-600 bg-blue-200 border border-blue-600": jobType === "Part Time",
                })}>{jobType}</p>
                <div className="flex">
                    <div className="bg-violet-100 size-15 m-2 rounded-md">

                    </div>
                    <div className="flex-1">
                    <h1 className="font-medium line-clamp-1">Job Name</h1>
                    <div className="flex justify-start gap-5 my-2">
                        <p className="flex gap-2 text-sm"><BriefcaseBusiness className="size-5" />Multimedia Design</p>
                        <p className="flex gap-2 text-sm"><MapPin className="size-5" />Fairbanks</p>
                        <p className="text-sm"> $2500 - $3000</p>
                    </div>
                    <p className="line-clamp-2 text-sm dark:text-gray-200 text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis ab, laboriosam eum rerum vitae vero laudantium labore laborum. Repellendus officia neque perspiciatis veniam asperiores illo fugiat tempore deleniti a rem?</p>
                    </div>
                    <div>
                        <Button variant='outline' >View Details</Button>
                    </div>
                </div>
                <div className="text-sm mt-3 mx-3 text-gray-700 dark:text-gray-300">
                    Posted Mar 07, 2025
                </div>
            </div>
        </Card>
    )
}