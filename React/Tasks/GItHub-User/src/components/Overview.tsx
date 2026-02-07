import { getDataFromAPI } from '../API/getUserDetails';
import type { rep2Type, repoDataType } from '../Utils/Types';
import { useContext, useEffect, useState } from 'react';
import  Repo  from './Repo'
import { ThemeContext } from '../context/ThemeContext';


export default function Overview({ url = 'https://api.github.com/users/facebook/repos' }: { url?: string }) {

    const {theme} = useContext(ThemeContext)
    const [newRepos, setNewRepo] = useState<repoDataType[]>();


    useEffect(() => {
        (async () => {
            const data: rep2Type = await getDataFromAPI(url);
            if (data.success && data.data !== undefined) {
                const newData = data.data.slice(0, 6)
                setNewRepo(newData);
            }
        })();
    }, [url])


    useEffect(() => {

    }, [url])


    return (
        <>
            <div className="m-5">
                <h2 className={`${theme === 'dark' ? 'text-gray-300':'text-gray-700'} font-sm mb-3 md:text-xl`}>
                    Popular repositories
                </h2>
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                    {newRepos && newRepos.map((repo) => (
                        <div key={repo.id} className="border border-gray-500 min-h-24 rounded-xl p-3 relative text-gray-500 overflow-hidden">
                        <Repo repo={repo} />
                        </div>
                    )
                    )}
                </div>
            </div>
        </>
    );
};



