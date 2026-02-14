import { Eye, EyeClosed } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { findUserByUsername, getUserByUsername, setCurrentUser } from '../utils/userData';
import { ContextValue } from "../context/ContextValue";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features /userSlice";
import type { AppStore } from "../redux/store";

interface typeError {
  value: string;
  isError: boolean;
  isInteract: boolean;
  errMassage: string
}

export default function Login() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const getStore = useSelector((state: AppStore) => state)
    const isLogin = getStore.userDetails.isLogin;

    useEffect(()=>{

      if(isLogin){
        navigate('/dashboard')
      }

    },[isLogin,navigate])


  const { theme } = useContext(ContextValue);
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passType, setPassType] = useState<"password" | "text">("password");

  const [username, setUsername] = useState<typeError>({ value: '', isError: false, isInteract: false, errMassage: 'Invalid username' });;
  const [password, setPassword] = useState<typeError>({ value: '', isError: false, isInteract: false, errMassage: 'Invalid password' });;



  useEffect(() => {
    if (showPassword) {
      setPassType("text");
    } else {
      setPassType("password");
    }
  }, [showPassword, setPassType]);



  useEffect(() => {
    if (!/^[a-z][a-z0-9_]{8,15}$/.test(username.value) || username.value === "") {
      setUsername({ ...username, isError: true, errMassage: 'Invalid username' })
    } else {
      if (!findUserByUsername(username.value)) {
          setUsername({ ...username, isError: true, errMassage: 'This is username is not found' })
        
      } else {
          setUsername({ ...username, isError: false, errMassage: '' })
      }
    }

    if (!/^[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(password.value) || password.value === "") {
      setPassword({ ...password, isError: true });
    } else {
      setPassword({ ...password, isError: false });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username.value, password.value]);



  const onLoginButton = () => {
    if (username.value === '') {
      setUsername({ ...username, isError: true, errMassage: 'Invalid username', isInteract: true })
    }
    if (password.value === '') {
      setPassword({ ...password, isError: true, errMassage: 'Invalid password', isInteract: true })
    };


    if (!username.isError && !password.isError) {
      
      const User = getUserByUsername(username.value)[0];
      // setCurrentUser(User)
      dispatch(setUser(User))
      setCurrentUser(User)
      navigate('/dashboard')
      if (User.password !== password.value) {
        setPassword({ ...password, isError: true, errMassage: 'Password does not mach.', isInteract: true })
      }
    }
  }



  return (

    <div className={" w-full h-screen flex items-center justify-center "
      +`${theme === 'dark' ? 'bg-zinc-700':'bg-gray-100'}`
    }>

    <div className={" p-6 rounded-lg shadow-xl max-w-md w-full mx-auto"
      +` ${theme === 'dark' ? 'bg-zinc-800 text-white' :'bg-white'}`
    }>
      <div className="flex flex-col">
        <h1 className="text-center text-3xl font-semibold  py-3">
          Sign In
        </h1>
        <span className="mx-2 mb-4 ">
          Create new account?
          <Link to='/register'>
          <span
            className="text-blue-500 ml-2 hover:underline cursor-pointer hover:text-blue-600 transition-colors"
            >
            Click here
          </span>
          </Link>
        </span>
      </div>
      <div className="flex flex-col">
        <div className="relative flex flex-col  mx-3 mb-7">
          <label htmlFor="username" className="mb-2 font-medium">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            maxLength={16}
            value={username.value}
            onClick={() => setUsername && setUsername({ ...username, isInteract: true })}
            onChange={(e) => setUsername && setUsername({ ...username, value: e.target.value })}
            className={`ring-1 ring-gray-300  rounded-sm py-2.5 px-3 transition-all duration-200
                  ${theme === 'dark'? '':'bg-gray-50'}
                  ${(username.isError && username.isInteract) ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-blue-500 focus:outline-none"} `}
          />
          {(username.isError && username.isInteract) && (
            <span className="absolute text-sm text-red-500 pl-1 -bottom-6">
              {username.errMassage}
            </span>
          )}
        </div>
        <div className="relative flex flex-col mx-3 mb-7">
          <label htmlFor="password" className="mb-2 font-medium">Password:</label>
          <input
            type={passType}
            id="password"
            name="password"
            placeholder="Enter password"
            maxLength={16}
            value={password.value}
            onClick={() => setPassword && setPassword({ ...password, isInteract: true })}
            onChange={(e) => setPassword && setPassword({ ...password, value: e.target.value })}
            className={`ring-1 ring-gray-300  rounded-sm py-2.5 px-3 pr-10 transition-all duration-200
                  ${theme === 'dark'? '':'bg-gray-50'}
                  ${(password.isError && password.isInteract) ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-blue-500 focus:outline-none"} `}
          />
          {showPassword ? (
            <div
              className="absolute right-5 top-10.5 cursor-pointer transition-colors"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <Eye size={20} />
            </div>
          ) : (
            <div
              className="absolute right-5 top-10.5 cursor-pointer transition-colors"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <EyeClosed size={20} />
            </div>
          )}
          {(password.isError && password.isInteract) && (
            <span className="absolute text-sm text-red-500 pl-1 -bottom-6">
              {password.errMassage}
            </span>
          )}
        </div>
      </div>
      <div className="mx-3 mt-2 text-blue-500 cursor-pointer hover:text-blue-600 transition-colors">
        <span>Forgot password?</span>
      </div>
      <div className="px-3">
        <button
          type="button"
          onClick={onLoginButton}
          className={"rounded-sm py-2.5 mt-4 w-full  hover:shadow-lg font-semibold transition-all duration-200"
            +` ${theme==='dark' ?'bg-white hover:bg-white/90 cursor-pointer text-black':'bg-blue-500  text-white hover:bg-blue-600'}`
          }
        >
          Sign In
        </button>
      </div>
    </div>
      </div>
  )
}