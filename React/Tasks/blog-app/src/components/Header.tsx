import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextValue } from "../context/ContextValue";
import { FaSun, FaMoon, FaUser } from "react-icons/fa";
import { removeCurrentUser } from "../utils/userData";

export default function Header() {

  const navigate = useNavigate();


    // const [isLogin, setIsLogin] = useState<boolean>(getCurrentUser() ? true : false)

    // console.log(isLogin);


    const { theme, setTheme, isLogin, setIsLogin } = useContext(ContextValue);


    const onUserButtonClick =() => {

        // setIsLogin(false)
        removeCurrentUser();
        console.log('logout');
        navigate('/login')
        setIsLogin(false)
    }






    return (
        <>
            <div className="w-full z-9  sticky top-0 left-0">
                <div className={`w-full  sticky top-0 p-2 flex justify-center shadow border ${theme === 'dark' ? 'bg-zinc-900 border-b-gray-800' : 'bg-white border-b-gray-200'} `}>
                    <div className=" flex justify-between w-full max-w-350">
                        <div className="flex gap-3 ">
                            {/* <div className="border border-gray-800 rounded-sm p-2 md:hidden"><Menu className="text-gray-500" /></div> */}


                            <Link to='/' >
                                {theme === 'dark' ? (<div className="flex items-center">
                                    <img src="./blog-light.svg" alt="logo" className="size-10 md:size-12" /><span className="text-2xl text-white font-bold mt-2">Blog</span>
                                </div>) : (<div className="flex items-center">
                                    <img src="./blog-dark.svg" alt="logo" className="size-10 md:size-12" /><span className="text-2xl md:text-3xl  font-bold mt-2">Blog</span>
                                </div>)
                                }
                            </Link>
                        </div>

                        <div className={" flex-1 gap-5 flex font-medium items-center text-xl mx-10"
                            +` ${theme === 'dark' ? 'text-gray-100':'text-shadow-gray-700 '}`
                        }>

                            <Link to='/'>
                            <div>Home</div>
                            </Link>
                            <Link to='/blogs'>
                            <div>Blogs</div>
                            </Link>

                        </div>





                        <div className="flex gap-3">


                            {!isLogin && (
                                <>
                                    <Link to='/login'>
                                        <div
                                            className={`${theme === 'dark' ? 'bg-white' : 'bg-blue-500 text-gray-100 hover:bg-blue-600'} font-bold px-3 py-2 rounded-sm shadow cursor-pointer`}>
                                            Login
                                        </div>
                                    </Link>
                                    <Link to='/register'>
                                        <div
                                            className={`${theme === 'dark' ? 'bg-white' : 'bg-blue-500 text-gray-100 hover:bg-blue-600'} font-bold px-3 py-2 rounded-sm shadow cursor-pointer`}>
                                            SignUp
                                        </div>
                                    </Link>
                                </>
                            )}
                            <div
                                className=" rounded-full flex items-center overflow-hidden"
                                onClick={setTheme}>
                                {theme === 'dark' && <FaMoon className={`size-6 m-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />}
                                {theme === 'light' && <FaSun className={`size-6 m-2 ${theme === 'light' ? 'text-black' : 'text-black'}`} />}
                            </div>

                           { isLogin && <div
                                className=" rounded-full flex items-center overflow-hidden"
                                onClick={onUserButtonClick}>
                                {theme === 'dark' && <FaUser className={`size-6 m-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />}
                                {theme === 'light' && <FaUser className={`size-6 m-2 ${theme === 'light' ? 'text-black' : 'text-black'}`} />}
                            </div>}

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
};