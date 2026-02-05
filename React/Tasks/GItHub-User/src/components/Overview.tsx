import { getDataFromAPI } from '../API/getUserDetails';
import type { rep2Type, repoDataType } from '../Utils/Types';
import { useEffect, useState } from 'react';
import  Repo  from './Repo'


export default function Overview({ url = 'https://api.github.com/users/facebook/repos' }: { url?: string }) {
    const [newRepos, setNewRepo] = useState<repoDataType[]>();


    useEffect(() => {
        (async () => {
            const data: rep2Type = await getDataFromAPI(url);
            if (data.success && data.data !== undefined) {
                const newData = data.data.slice(0, 6)
                setNewRepo(newData);
                console.log(url);
            }
        })();
    }, [url])


    useEffect(() => {

    }, [url])


    return (
        <>
            <div className="m-5">
                <h2 className="text-gray-300 font-sm mb-3 text-xl">
                    Popular repositories
                </h2>
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                    {newRepos && newRepos.map((repo) => (
                        <div key={repo.id} className="border border-gray-500  rounded-xl p-3 relative text-gray-500 mx-5">
                        <Repo repo={repo} />
                        </div>
                    )
                    )}
                </div>
            </div>
        </>
    );
};



