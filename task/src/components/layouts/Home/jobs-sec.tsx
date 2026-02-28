import JobCard from "../job-card";

export default function JobSec() {
    return (
        <div className="">
            <div className="flex flex-col mx-auto max-w-315 h-50 p-5 items-center">
                <p className="text-green-500 text-xl md:text-2xl">Here You Can See</p>
                <h2 className="scroll-m-20 text-center text-4xl md:text-5xl font-extrabold text-balance mb-5">
                    Latest <span className="font-light text-(--color-primary)">Jobs</span>
                </h2>
                <div className="flex gap-3 flex-wrap w-full justify-center">

            <JobCard />
                </div>
            </div>
        </div>
    );
}


