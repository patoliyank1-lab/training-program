import { Menu, Search, Inbox, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RxGithubLogo } from "react-icons/rx";
import { getSearchHistory, rmFromHistory, storeSearchHistory } from "../Utils/StoreHistory";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [search, setSearch] = useState(false);
    const [searchText, setSearchText] = useState<string>('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const searchInputRef = useRef<HTMLInputElement>(null);

     const navigate = useNavigate();


    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
        if(search){
            const sHistory = getSearchHistory().slice(0,6);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSearchHistory(sHistory);
        }
    }, [search]);

    const onKeyDown = (event: { key: string; }) => {
        if ((event.key === 'Enter' || event.key === ' ') && searchText.trim() !== '') {
            setSearchText('');
            setSearch(false);
            storeSearchHistory(searchText.trim())
            onSearch(searchText.trim())
        }
    }

    const onSearch = (keyword:string) => {
        if(typeof keyword === 'string' && keyword !== '' && keyword !== ' '){
            navigate(`/search/${keyword}`)
        }
        
    }


    const clickSearchKeyword = (keyword: string) => {
        if(typeof keyword === 'string' && keyword !== '' && keyword !== ' '){
            onSearch(keyword)
        }
    }


    const onXClick = (keyword:string) => {
        const newHistory = rmFromHistory(keyword);
        setSearchHistory(newHistory);
    };




    return (
        <>

            {search && (
                <div
                    className="bg-white/5 h-scree n flex justify-center"
                    onClick={() => {setSearchText('') ;return setSearch && setSearch((prev) => !prev)}}
                >
                    <div
                        className="w-full max-w-300  bg-body z-10 rounded-2xl fixed p-2 flex justify-center shadow-xl border border-gray-500 overflow-hidden"
                        onClick={(event) => event.stopPropagation()}
                    >

                        <div className="relative w-full  flex flex-col justify-center items-center h-min ">
                            <div className="relative  w-full flex items-center">
                                <Search className="size-5 ml-2 absolute left-0 text-gray-500" />
                                <input type="text" name="search" id="search"
                                    value={searchText}
                                    onChange={(e) => setSearchText && setSearchText(e.target.value.trim())}
                                    ref={searchInputRef}
                                    className="border border-gray-500 max-w-170 rounded-md cursor-pointer  h-8 text-gray-400 placeholder:text-gray-500 text-sm w-full px-3 flex items-center pl-9"
                                    onKeyDown={onKeyDown}
                                />
                            </div>

                            <div className="  w-full flex items-center   my-5 ">
                                {!searchHistory.length ? (<>
                                    <p className="text-md font-light my-10 mx-auto text-gray-500">There is no history...</p>
                                </>) : (<>
                                <div className="w-full mx-5 flex flex-col gap-2 text-gray-300">
                                    {searchHistory.map ((keyword, Index) => (
                                        <p key={Index} className="flex justify-between hover:bg-gray-800 px-2 py-1 rounded" 
                                        onClick={() => clickSearchKeyword(keyword)}>{keyword} <X id={keyword} 
                                        className="size-5 cursor-pointer text-gray-500" 
                                        onClick={(event) => {event.stopPropagation(); return onXClick && onXClick(keyword)}}/></p>
                                    ))}
                                    </div>
                                </>)}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full bg-black/80 sticky top-0 p-2 flex justify-center shadow border border-b-gray-800">
                <div className=" flex justify-between w-full max-w-350">
                    <div className="flex gap-3">
                        <div className="border border-gray-800 rounded-md p-2 md:hidden"><Menu className="text-gray-500" /></div>
                        <div className="rounded-full flex items-center"><RxGithubLogo className="text-gray-200 size-9" /></div>
                    </div>
                    <div className="md:flex hidden  items-center  flex-1 px-5">
                        <div
                            className="border border-gray-500 rounded-md cursor-pointer max-w-170 h-8 text-gray-400 placeholder:text-gray-500 text-sm w-full px-3 flex items-center"
                            onClick={() => setSearch((prev) => !prev)}
                        ><Search className="size-5 mr-3" /><p>Search...</p></div>
                    </div>
                    <div className="flex gap-3">
                        <div
                            className="border border-gray-800 rounded-md p-2 md:hidden cursor-pointer"
                            onClick={() => setSearch((prev) => !prev)}
                        ><Search className="text-gray-500" /></div>
                        <div className="border border-gray-800 rounded-md p-2"><Inbox className="text-gray-500" /></div>
                        <div className="bg-white rounded-full flex items-center overflow-hidden"><img src='https://avatars.githubusercontent.com/u/255821001?v=4&size=64' className="size-9" /></div>
                    </div>
                </div>
            </div>


        </>
    )
};