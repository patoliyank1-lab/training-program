import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { findUserByUsername, getUserByUsername } from '../hooks/useStorage';

interface typeError {
    value: string;
    isError: boolean;
    isInteract: boolean;
    errMassage: string
}

export default function Login({isShowLogin , onChangeISLogin}:{isShowLogin: boolean; onChangeISLogin:() => void}) {
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
        if(isShowLogin){
          setUsername({ ...username, isError: false, errMassage: '' })
        }else{
          setUsername({...username,isError:true, errMassage: 'This is username is not found'})
        }
      } else {
        if(isShowLogin){
          setUsername({ ...username, isError: true, errMassage: 'username is already exist.' }) 
        }else{
          setUsername({ ...username, isError: false, errMassage: ''})
        }
        }
    }

    if (!/^[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(password.value) || password.value === "") {
      setPassword({ ...password, isError: true });
    } else {
      setPassword({ ...password, isError: false });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username.value, password.value]);



  const onLoginButton = () =>{
      if(username.value === ''){
        setUsername({ ...username, isError: true, errMassage: 'Invalid username', isInteract: true })
      }
      if(password.value === ''){
      setPassword({ ...password, isError: true, errMassage: 'Invalid password', isInteract: true })
      };


      if(!username.isError && !password.isError){
        const User = getUserByUsername(username.value)[0];
        if(User.password !== password.value){
        setPassword({ ...password, isError: true, errMassage: 'Password does not mach.', isInteract: true })

        }

      }

  }



    return (
        <div className="bg-white p-5 rounded shadow-xl">
            <div className="flex flex-col">
                <h1 className=" text-center text-3xl font-semibold text-gray-800 pt-3">
                    Sing in
                </h1>
                <span className=" m-2 text-gray-700">
                    Create new Account?
                    <span
                        className="text-blue-600 underline cursor-pointer"
                        onClick={onChangeISLogin}
                    >
                        click here
                    </span>
                </span>
            </div>
            <div className=" flex flex-col ">
                <div className="relative flex flex-col text-gray-800 m-3">
                    <label htmlFor="username" className="mb-1">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="username"
                        maxLength={16}
                        value={username.value}
                        onClick={() => setUsername && setUsername({ ...username, isInteract: true })}
                        onChange={(e) => setUsername && setUsername({ ...username, value: e.target.value })}
                        className={`ring ring-gray-500 md:w-90 ring-offset-2 bg-gray-100 rounded py-2 px-3  
                  ${(username.isError && username.isInteract) ? "focus:outline-none focus:ring-2 ring-red-500" : "focus:outline-none focus:ring-blue-500 focus:ring-2 "} `}
                    />
                    {(username.isError && username.isInteract) && (
                        <span className=" absolute text-sm text-red-500 pl-1 -bottom-6">
                            {username.errMassage}
                        </span>
                    )}
                </div>
                <div className="relative flex flex-col  text-gray-800 m-3">
                    <label htmlFor="password">Password:</label>
                    <input
                        type={passType}
                        id="password"
                        name="password"
                        placeholder="password"
                        maxLength={16}
                        value={password.value}
                        onClick={() => setPassword && setPassword({ ...password, isInteract: true })}
                        onChange={(e) => setPassword && setPassword({ ...password, value: e.target.value })}
                        className={`ring ring-gray-500 ring-offset-2 bg-gray-100 rounded py-2 px-3  
                  ${(password.isError && password.isInteract) ? "focus:outline-none focus:ring-2 ring-red-500" : "focus:outline-none focus:ring-blue-500 focus:ring-2 "} `}
                    />
                    {showPassword ? (
                        <div
                            className="absolute right-2 bottom-2"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            <Eye />
                        </div>
                    ) : (
                        <div
                            className="absolute right-2 bottom-2"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            <EyeClosed />
                        </div>
                    )}
                    {(password.isError && password.isInteract) && (
                        <span className="absolute text-sm text-red-500 pl-1 -bottom-6 ">
                            {password.errMassage}
                        </span>
                    )}
                </div>
            </div>
            <div className="m-2 mt-4 text-blue-700 cursor-pointer">
                <span>forgot password?</span>
            </div>
            <div>
                <button
                    type="button"
                    onClick={onLoginButton}
                    className="bg-blue-500 text-white rounded py-2 w-full hover:bg-blue-700 hover:shadow font-semibold mt-2"
                >
                    Login
                </button>
            </div>
        </div>
    )
}