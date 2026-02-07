import { Star, GitFork, BookMarked} from 'lucide-react';
import { useState, useEffect, useContext } from 'react';
import type { repoDataType } from '../Utils/Types';
import { ThemeContext } from '../context/ThemeContext';

export default function Repo({repo}: {repo:repoDataType}){
    const {theme} = useContext(ThemeContext)

    const [newRepo, setNewRepo] = useState<repoDataType>();

useEffect(()=>{
    setNewRepo(repo);
},[repo])


    return (
        <>
            {newRepo && <>
                <div className="flex items-center mb-2">
                    <BookMarked className={`${theme === 'dark' ?'text-gray-300':'text-gray-700'}' size-4.5'`}/>
                    <h3 className="text-blue-500 cursor-pointer ml-2 md:text-xl hover:underline ">{newRepo.name}</h3>
                    {!newRepo.private && <div
                        className="border rounded-2xl h-5 px-2 right-0 top-0 text-sm ml-2"
                        style={{ fontSize: "12px" }}
                    >
                        Public
                    </div>}
                </div>
                <div>
                    <p className="mb-5 ml-5">{newRepo.description} </p>
                </div>
                <div className="text-sm ml-5 absolute bottom-2 flex gap-4 mt-2 overflow-hidden">
                    <div className="flex items-center text-sm">
                        <div className="bg-orange-500 mr-1 size-3  rounded-2xl"></div>
                        <span>HTML</span>
                    </div>
                    <div className="flex items-center">

                        <Star className="mr-1 size-  rounded-2xl" />
                        <span className='cursor-pointer hover:underline'>{newRepo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center">
                        <GitFork className="mr-1 size-  rounded-2x" />
                        <span className='cursor-pointer hover:underline'>{newRepo.forks_count}</span>
                    </div>
                </div>
            </>}
        </>
    );
};