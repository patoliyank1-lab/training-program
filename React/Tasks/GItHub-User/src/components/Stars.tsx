import {  Star } from "lucide-react";

export default function Stars() {
    return (
        <>
            <div className="border flex flex-col items-center justify-center p-15 border-gray-400 rounded-md mx-5 md:mx-10 my-4">
                <Star className='text-gray-400 md:size-10' />
                <h1 className='text-white text-1xl mt-2 md:text-2xl '>There aren't any Star Repo yet</h1>
            </div>

        </>
    )
}