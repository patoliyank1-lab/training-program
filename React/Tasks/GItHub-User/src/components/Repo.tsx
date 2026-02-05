import { Star, GitFork, BookMarked} from 'lucide-react';
import { useState, useEffect } from 'react';
import type { repoDataType } from '../Utils/Types';

export default function Repo({repo}: {repo:repoDataType}){

    const [newRepo, setNewRepo] = useState<repoDataType>();

useEffect(()=>{
    setNewRepo(repo);
},[repo])


    return (
        <>
            {newRepo && <>
                <div className="flex items-center">
                    <BookMarked className='size-4.5 text-gray-300 mr-2'/>
                    <h3 className="text-blue-500 text-xl ">{newRepo.name}</h3>
                    {!newRepo.private && <div
                        className="border rounded-2xl h-5 px-2 right-0 top-0 text-sm ml-2"
                        style={{ fontSize: "12px" }}
                    >
                        Public
                    </div>}
                </div>
                <div>
                    <p className="mt-2">{newRepo.description} </p>
                </div>
                <div className="text-sm flex gap-4 mt-2 overflow-hidden">
                    <div className="flex items-center text-sm">
                        <div className="bg-orange-500 mr-1 size-3  rounded-2xl"></div>
                        <span>HTML</span>
                    </div>
                    <div className="flex items-center">

                        <Star className="mr-1 size-  rounded-2xl" />
                        <span>{newRepo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center">
                        <GitFork className="mr-1 size-  rounded-2x" />
                        <span>{newRepo.forks_count}</span>
                    </div>
                </div>
            </>}
        </>
    );
};