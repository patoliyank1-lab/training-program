import { getDataFromAPI } from '../API/getUserDetails';
import type { rep2Type, repoDataType } from '../Utils/Types';
import { useEffect, useState } from 'react';
import Repo from './Repo'
import { BookMarked } from 'lucide-react';

export default function Repositories({ url }: { url?: string }) {
    const [newRepos, setNewRepo] = useState<repoDataType[]>();


    useEffect(() => {
        (async () => {
            const data: rep2Type = await getDataFromAPI(url as string);
            if (data.success && data.data !== undefined) {
                const newData = data.data
                setNewRepo(newData);
                console.log(newData);
            }
        })();
    }, [url])

    return (
        <>
            <div className="w-full mt-5 flex flex-col md:flex-row md:items-center border border-b-gray-500 border-x-0 border-t-0">
                <div className="flex-1 p-2 flex items-center">
                    <input type="text"
                        className="border border-gray-500 text-gray-100 placeholder:text-gray-500 text-sm  px-2 py-1 rounded-md w-full  "
                        placeholder="Find a repository.." />
                </div>
                <div className="flex p-2 gap-2">
                    <select className="border border-gray-500 h-min rounded font-light text-gray-100 px-2 py-1 bg-gray-500/50">
                        <option value="">Type</option>
                    </select>
                    <select className="border border-gray-500 rounded h-min font-light text-gray-100 px-2 py-1 bg-gray-500/50">
                        <option value="">Language</option>
                    </select>
                    <select className="border border-gray-500 rounded h-min font-light text-gray-100 px-2 py-1 bg-gray-500/50">
                        <option value="">Sort</option>
                    </select>
                </div>
            </div>
            <div>
                {newRepos ? newRepos.map((repo) => (
                    <div key={repo.id} className="border border-gray-500 border-x-0 border-t-0   p-3 relative text-gray-500 mx-5">

                        <Repo repo={repo} />
                    </div>
                )):(<>
                <div className="border flex flex-col items-center justify-center p-15 border-gray-400 rounded-md mx-5 md:mx-10 my-4">
                <BookMarked className='text-gray-400 md:size-10' />
                <h1 className='text-white text-1xl mt-2 md:text-2xl '>There aren't any Repo yet</h1>
            </div>
                </>)};
            </div>
        </>
    )
}
