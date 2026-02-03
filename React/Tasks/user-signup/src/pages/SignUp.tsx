import { useEffect, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { storeData, findUserByEmail, findUserByUsername } from '../hooks/useStorage'


interface typeError {
  value: string;
  isError: boolean;
  isInteract: boolean;
  errMassage: string
}

export default function SingUp({isShowLogin , onChangeISLogin}:{isShowLogin: boolean; onChangeISLogin:() => void}){
      const [showPassword, setShowPassword] = useState<boolean>(false);
      const [passType, setPassType] = useState<"password" | "text">("password");
      const [countryCode, setCountryCode] = useState<string>('+91');
    
      const [fullName, setFullName] = useState<typeError>({ value: '', isError: false, isInteract: false, errMassage: 'Invalid Name' });;
      const [number, setNumber] = useState<typeError>({ value: '', isError: false, isInteract: false, errMassage: 'Invalid number' });;
      const [email, setEmail] = useState<typeError>({ value: '', isError: false, isInteract: false, errMassage: 'Invalid email' });;
      const [username, setUsername] = useState<typeError>({ value: '', isError: false, isInteract: false, errMassage: 'Invalid username' });;
      const [password, setPassword] = useState<typeError>({ value: '', isError: false, isInteract: false, errMassage: 'Invalid password' });;
      const [confirmPassword, setConfirmPassword] = useState<typeError>({ value: '', isError: false, isInteract: false, errMassage: 'password does not match' });;


        useEffect(() => {
    if (showPassword) {
      setPassType("text");
    } else {
      setPassType("password");
    }
  }, [showPassword, setPassType]);

  useEffect(() => {
    // eslint-disable-next-line no-useless-escape
    if (!/^[a-zA-Z0-9\s,/()\&.:-]{3,50}$/.test(fullName.value) || fullName.value === "") {
      setFullName({ ...fullName, isError: true });
    } else {
      setFullName({ ...fullName, isError: false });
    }

    if (!/^\d{10}$/.test(number.value) || number.value.length < 10) {
      setNumber({ ...number, isError: true });

    } else {
      setNumber({ ...number, isError: false });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) || email.value === "") {
      setEmail({ ...email, isError: true, errMassage: 'Invalid email' })
    } else {
      if (!findUserByEmail(email.value)) {
        setEmail({ ...email, isError: false, errMassage: '' })
      } else {
        setEmail({ ...email, isError: true, errMassage: 'Email is already exist.' });
      }
    }

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

    if (password.value !== confirmPassword.value) {
      setConfirmPassword({ ...confirmPassword, isError: true });
    } else {
      setConfirmPassword({ ...confirmPassword, isError: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number.value, email.value, username.value, password.value, confirmPassword.value]);

  const onSubmit = () => {

    if (fullName.value === '' ||
      number.value === '' ||
      email.value === '' ||
      username.value === '' ||
      password.value === '' ||
      confirmPassword.value === ''
    ) {
      setFullName({ ...fullName, isError: true, errMassage: 'Invalid FUll Name', isInteract: true })
      setNumber({ ...number, isError: true, errMassage: 'Invalid number', isInteract: true })
      setEmail({ ...email, isError: true, errMassage: 'Invalid email', isInteract: true })
      setUsername({ ...username, isError: true, errMassage: 'Invalid username', isInteract: true })
      setPassword({ ...password, isError: true, errMassage: 'Invalid password', isInteract: true })
      setConfirmPassword({ ...confirmPassword, isError: true, errMassage: 'password does not match', isInteract: true })
    }


    if (!fullName.isError && !number.isError && !email.isError && !username.isError && !password.isError && !confirmPassword.isError && isShowLogin) {


      storeData(fullName.value, email.value, countryCode + number.value, username.value, password.value)
      setFullName({ ...fullName, isError: false, value: '', isInteract: false })
      setNumber({ ...number, isError: false, value: '', isInteract: false })
      setEmail({ ...email, isError: false, value: '', isInteract: false })
      setUsername({ ...username, isError: false, value: '', isInteract: false })
      setPassword({ ...password, isError: false, value: '', isInteract: false })
      setConfirmPassword({ ...confirmPassword, isError: false, value: '', isInteract: false })

    }

  };

    return(
        <div className="bg-white p-5 rounded shadow-xl">
            <div className="flex flex-col">
              <h1 className=" text-center text-3xl font-semibold text-gray-800 py-3">
                Sing up
              </h1>
              <span className=" m-2 text-gray-700">
                have account?
                <span
                  className="text-blue-600 underline cursor-pointer"
                  onClick={onChangeISLogin}
                >
                  click here
                </span>
              </span>
            </div>

            <div className=" flex flex-col flex-wrap">
              <div className="relative flex flex-col text-gray-800 m-3">
                <label htmlFor="fullname" className="mb-1">
                  Full Name:
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  maxLength={50}
                  value={fullName.value}
                  onClick={() => setFullName && setFullName({ ...fullName, isInteract: true })}
                  onChange={(e) => setFullName && setFullName({ ...fullName, value: e.target.value })}
                  placeholder="Full Name"
                  className={`ring ring-gray-500 ring-offset-2 bg-gray-100 rounded py-2 px-3  
                  ${(fullName.isError && fullName.isInteract) ? "focus:outline-none focus:ring-2 ring-red-500" : "focus:outline-none focus:ring-blue-500 focus:ring-2 "} `}
                />
                {(fullName.isError && fullName.isInteract) && (
                  <span className=" absolute text-sm text-red-500 pl-1 -bottom-5">
                    {fullName.errMassage}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative flex flex-col text-gray-800 m-3">
                  <label htmlFor="number" className="mb-1">
                    Phone number:
                  </label>
                  <div>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode && setCountryCode(e.target.value)}
                      className={`ring ring-gray-500 ring-offset-2 bg-gray-100 rounded py-2 px-1 mr-2 
                  ${((number.isError && number.isInteract)) ? "focus:outline-none focus:ring-2 ring-red-500" : "focus:outline-none focus:ring-blue-500 focus:ring-2 "} `}
                    >
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+2">+2</option>
                      <option value="+3">+3</option>
                    </select>

                    <input
                      type="text"
                      id="number"
                      name="number"
                      maxLength={10}
                      value={number.value}
                      onClick={() => setNumber && setNumber({ ...number, isInteract: true })}
                      onChange={(e) => setNumber && setNumber({ ...number, value: e.target.value })}
                      placeholder="number"
                      className={`ring ring-gray-500 ring-offset-2 bg-gray-100 rounded py-2 px-3  
                  ${((number.isError && number.isInteract)) ? "focus:outline-none focus:ring-2 ring-red-500" : "focus:outline-none focus:ring-blue-500 focus:ring-2 "} `}
                    />
                  </div>

                  {((number.isError && number.isInteract)) && (
                    <span className=" absolute text-sm text-red-500 pl-1 -bottom-5">
                      {number.errMassage}
                    </span>
                  )}
                </div>

                <div className="relative flex flex-col text-gray-800 m-3">
                  <label htmlFor="email" className="mb-1">
                    Email:
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="email"
                    maxLength={20}
                    value={email.value}
                    onClick={() => setEmail && setEmail({ ...email, isInteract: true })}
                    onChange={(e) => setEmail && setEmail({ ...email, value: e.target.value })}
                    className={`ring ring-gray-500 ring-offset-2 bg-gray-100 rounded py-2 px-3  
                  ${(email.isError && email.isInteract) ? "focus:outline-none focus:ring-2 ring-red-500" : "focus:outline-none focus:ring-blue-500 focus:ring-2 "} `}
                  />
                  {(email.isError && email.isInteract) && (
                    <span className=" absolute text-sm text-red-500 pl-1 -bottom-5">
                      {email.errMassage}
                    </span>
                  )}
                </div>
              </div>

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
                  <span className=" absolute text-sm text-red-500 pl-1 -bottom-5">
                    {username.errMassage}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
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
                    <span className="absolute text-sm text-red-500 pl-1 -bottom-5 ">
                      {password.errMassage}
                    </span>
                  )}
                </div>

                <div className="relative flex flex-col  text-gray-800 m-3">
                  <label htmlFor="password">confirm Password:</label>
                  <input
                    type={passType}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="confirm password"
                    maxLength={16}
                    value={confirmPassword.value}
                    onClick={() => setConfirmPassword && setConfirmPassword({ ...confirmPassword, isInteract: true })}
                    onChange={(e) => setConfirmPassword && setConfirmPassword({ ...confirmPassword, value: e.target.value })}
                    className={`ring ring-gray-500 ring-offset-2 bg-gray-100 rounded py-2 px-3  
                  ${(confirmPassword.isError && confirmPassword.isInteract) ? "focus:outline-none focus:ring-2 ring-red-500" : "focus:outline-none focus:ring-blue-500 focus:ring-2 "} `}
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
                  {(confirmPassword.isError && confirmPassword.isInteract) && (
                    <span className="absolute text-sm text-red-500 pl-1 -bottom-5 ">
                      {confirmPassword.errMassage}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex  w-full ">
              <button
                type="button"
                className="bg-blue-500 mt-10 md:w-70 text-white rounded py-2 w-full hover:bg-blue-700 hover:shadow font-semibold"
                onClick={onSubmit}
              >
                Sing up
              </button>
            </div>
          </div>
    )
}