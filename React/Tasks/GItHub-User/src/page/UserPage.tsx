import { Overview, Packages, Project, Stars, Repositories } from '../components'
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../API/getUserDetails";
import type { userDataType, repType } from '../Utils/Types';

import {
    Link,
    BookOpen,
    BookMarked,
    FolderKanban,
    Box,
    Star,
    Users,
    Building,
    IdCardLanyard,
    Twitter,
} from "lucide-react";
import { formatLargeNumber } from '../Utils/NumberConvention';
import { ThemeContext } from '../context/ThemeContext';



export default function UserPage() {
    const { theme } = useContext(ThemeContext);

    const { username } = useParams();
    const [userData, setUserData] = useState<userDataType>();
    const [ isLoaded, setIsLoaded ] = useState(true)

    const [overview, setOverview] = useState<boolean>(true);
    const [repositories, setRepositories] = useState<boolean>(false);
    const [project, setProject] = useState<boolean>(false);
    const [packages, setPackages] = useState<boolean>(false);
    const [stars, setStars] = useState<boolean>(false);

    useEffect(() => {
        if (username) {
            (async () => {
                const data: repType = await getUserDetails(username);
                if (data.success && data.data !== undefined) {
                    setUserData(data.data);
                    setIsLoaded(true)
                }
            })();
        }
    }, [username]);


    const onRepoClick = useCallback(() => {
        setOverview(false)
        setRepositories(true)
        setProject(false)
        setPackages(false)
        setStars(false)
    }, [])

    const onOverClick = () => {
        setOverview(true)
        setRepositories(false)
        setProject(false)
        setPackages(false)
        setStars(false)
    }

    const onProjectClick =() => {
        setOverview(false)
        setRepositories(false)
        setProject(true)
        setPackages(false)
        setStars(false)
    }

    const onPackageClick =() => {
        setOverview(false)
        setRepositories(false)
        setProject(false)
        setPackages(true)
        setStars(false)
    }
    const onStarsClick =() => {
        setOverview(false)
        setRepositories(false)
        setProject(false)
        setPackages(false)
        setStars(true)
    }



    return (
        <>
        {isLoaded && userData && <div className={` h-screen w-full flex justify-center overflow-auto ${theme === 'dark' ? 'bg-body':'bg-gray-100'}`}>
            <div className="max-w-400 h-full p-5 w-full flex flex-col md:flex-row">
                <div className="flex flex-col md:w-90">
                    <div className="flex md:flex-col items-center ">
                        <div className={`flex ${theme === 'dark' ? 'text-gray-400':'text-gray-800'} `}>
                            <div className=" size-24 md:size-60 overflow-hidden rounded-full">
                                <img
                                    src={userData.avatar_url}
                                    alt=""
                                    className=" w-full h-full"
                                />
                            </div>
                        </div>
                        <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}  m-5 md:m-0 md:my-3`}>
                            <div className="flex justify-center  flex-col">
                                <h1 className={` text-2xl md:text-4xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-800'}`}>{userData.name}</h1>
                                <h2 className="md:text-2xl">{userData.login}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col  border-2 border-x-0 border-t-0 border-b-gray-500 md:border-b-0">
                        <div className={`mb-3 md:pl-15 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'} flex flex-col gap-1.5`}>
                            {userData.bio && <p className="my-3">{userData.bio}</p>}
                            {userData.blog && <div className="flex text-sm items-center md:hidden">
                                <Link className="size-3.5 mr-1" />
                                <p>{userData.blog}</p>
                            </div>}
                            {userData.company && <div className="flex text-sm items-center md:hidden">
                                <IdCardLanyard className="size-3.5 mr-1" />
                                <p>{userData.company}</p>
                            </div>}

                            <div className="flex text-sm items-center">
                                <Users className="size-3.5 mr-1" />
                                <p>
                                    <span className={`${theme === 'dark' ? 'text-white':'text-black'} font-bold`}>{formatLargeNumber(userData.followers)}</span> followers
                                </p>
                                <span className="font-extrabold mx-1">.</span>
                                <p>
                                    <span className={`${theme === 'dark' ? 'text-white':'text-black'} font-bold`}>{userData.following}</span> following
                                </p>
                            </div>

                            <div className="md:flex flex-col gap-1.5 hidden ">
                                {userData.location && <div className="flex text-sm items-center ">
                                    <Building className="size-3.5 mr-1" />
                                    <p className='cursor-pointer hover:underline'>{userData.location}</p>
                                </div>}
                                {userData.twitter_username && <div className="flex text-sm items-center ">
                                    <Twitter className="size-3.5 mr-1" />
                                    <p className='cursor-pointer hover:underline'>{userData.twitter_username}</p>
                                </div>}
                                {userData.blog && <div className="flex text-sm items-center ">
                                    <Link className="size-3.5 mr-1" />
                                    <p className='cursor-pointer hover:underline'>{userData.blog}</p>
                                </div>}
                                {userData.company && <div className="flex text-sm items-center ">
                                    <IdCardLanyard className="size-3.5 mr-1" />
                                    <p className='cursor-pointer hover:underline'>{userData.company}</p>
                                </div>}
                            </div>
                            <div className={`${theme === 'dark' ? 'text-gray-100 bg-white/10':'text-gray-900 bg-gray-200'} cursor-pointer shadow border-gray-500 text-center rounded-xl border  w-full md:my-5 py-2 text-sm`}>
                                Follow
                            </div>
                            <div className={`text-sm hover:underline ml-2 my-1 ${theme === 'dark' ? 'text-gray-300':'text-gray-700'}`}>
                                Block or Report
                            </div>

                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className={`flex gap-3 md:gap-0 xl:gap-3 pt-3 overflow-x-auto md:overflow-visible px-3 border-2  border-x-0 border-t-0 text-sm 
                    ${theme === 'dark' ? 'text-gray-200 border-b-gray-500': 'text-gray-800 border-b-gray-500'} `}>
                        <div
                            className={`flex my-2 mx-3 cursor-pointer ${overview && `${theme === 'dark' ? 'text-white':'text-black'} font-bold border-3 border-b-orange-400 border-x-0 border-t-0`}`}
                            onClick={onOverClick}
                        >
                            <BookOpen className="size-4.5 " />
                            <span className="ml-2">Overview</span>
                        </div>
                        <div className={`flex my-2 mx-3 cursor-pointer ${repositories && `${theme === 'dark' ? 'text-white':'text-black'} font-bold border-3 border-b-orange-400 border-x-0 border-t-0`}`}
                            onClick={onRepoClick}>
                            <BookMarked className="size-4.5 " />
                            <span className="ml-2">Repositories</span>
                            <span className=" bg-white/10 rounded-2xl p-1 ml-2 text-center flex justify-center items-center" style={{fontSize : '11px'}}>{formatLargeNumber(userData.public_repos)}</span>
                        </div>
                        <div className={`flex my-2 mx-3 cursor-pointer ${project && `${theme === 'dark' ? 'text-white':'text-black'} font-bold border-3 border-b-orange-400 border-x-0 border-t-0`}`}
                            onClick={onProjectClick}>
                            <FolderKanban className="size-4.5 " />
                            <span className="ml-2">Project</span>
                        </div>
                        <div className={`flex my-2 mx-3 cursor-pointer ${packages && `${theme === 'dark' ? 'text-white':'text-black'} font-bold border-3 border-b-orange-400 border-x-0 border-t-0`}`}
                            onClick={onPackageClick}>
                            <Box className="size-4.5 " />
                            <span className="ml-2">Package</span>
                        </div>
                        <div className={`flex my-2 mx-3 cursor-pointer ${stars && `${theme === 'dark' ? 'text-white':'text-black'} font-bold border-3 border-b-orange-400 border-x-0 border-t-0`}`}
                            onClick={onStarsClick}>
                            <Star className="size-4.5 " />
                            <span className="ml-2">Stars</span>
                        </div>
                    </div>

                    {overview && <Overview url={userData.repos_url} />}
                    {repositories && <Repositories url={userData.repos_url} />}
                    {project && <Project />}
                    {packages && <Packages />}
                    {stars && <Stars />}
                </div>
            </div>
        </div>}
        </>
    );
}









