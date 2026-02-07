import { FolderKanban } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';


export default function Project() {

    const { theme } = useContext(ThemeContext);


    return (
        <>
            <div className="w-full flex justify-center items-center">
                <div className="border flex flex-col max-w-150 w-full mx-auto items-center justify-center p-10 border-gray-400 rounded-md  md:mx-10 my-4">
                    <FolderKanban className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} md:size-10`} />
                    <h1 className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-1xl mt-2 md:text-2xl`}>There aren't any Projects yet</h1>
                </div>
            </div>
        </>
    )
}