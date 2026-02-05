import { FolderKanban } from 'lucide-react';


export default function Project() {
    return (
        <>
            <div className="border flex flex-col items-center justify-center p-10 border-gray-400 rounded-md mx-5 md:mx-10 my-4">
                    <FolderKanban className='text-gray-500 md:size-10'/>
                    <h1 className='text-white text-1xl mt-2 md:text-2xl '>There aren't any Projects yet</h1>
            </div>
        </>
    )
}