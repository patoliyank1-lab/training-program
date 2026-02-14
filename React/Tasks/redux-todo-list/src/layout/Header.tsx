import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features /userSlice";
import { useContext } from "react";
import { ContextValue } from "../context/ContextValue";

export default function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { theme, isLogin} = useContext(ContextValue)
  
    




    const onUserButtonClick =() => {
      dispatch(logout())
        navigate('/')
    }






    return (
        <>
            <div className="w-full z-9  sticky top-0 left-0">
                <div className={`w-full  sticky top-0 p-2 flex justify-center shadow border ${theme === 'dark' ? 'bg-zinc-900 border-b-gray-800' : 'bg-white border-b-gray-200'} `}>
                    <div className=" flex justify-between w-full max-w-350">
                        <div className="flex gap-3 ">


                            <Link to='/' >
                                  <div className="flex items-center">
                                  <span className="text-2xl text-blue-600 font-bold mt-2">TODO</span>
                                </div>
                              
                            </Link>
                        </div>

                        <div className={" flex-1 gap-5 flex font-medium items-center text mx-10"
                            +` ${theme === 'dark' ? 'text-gray-100':'text-shadow-gray-700 '}`
                        }>
                            <Link to='/'>
                            <div>Home</div>
                            </Link>
                            <Link to='/dashboard'>
                            <div>Dashboard</div>
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
                          {/* {  <div
                                className=" rounded-full flex items-center overflow-hidden"
                                onClick={() => dispatch && dispatch(changeTheme())}>
                                {theme === 'dark' && <FaMoon className={`size-6 m-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />}
                                {theme === 'light' && <FaSun className={`size-6 m-2 ${theme === 'light' ? 'text-black' : 'text-black'}`} />}
                            </div>} */}

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