import { useEffect, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { storeData, findUserByEmail, findUserByUsername } from '../hooks/useStorage'


interface typeError {
  value: string;
  isError: boolean;
  isInteract: boolean;
  errMassage: string
}

export default function SignUp({ isShowLogin, onChangeISLogin }: { isShowLogin: boolean; onChangeISLogin: () => void }) {
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
        if (isShowLogin) {
          setUsername({ ...username, isError: false, errMassage: '' })
        } else {
          setUsername({ ...username, isError: true, errMassage: 'This is username is not found' })
        }
      } else {
        if (isShowLogin) {
          setUsername({ ...username, isError: true, errMassage: 'username is already exist.' })
        } else {
          setUsername({ ...username, isError: false, errMassage: '' })
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
      setFullName({ ...fullName, isError: true, errMassage: 'Invalid Full Name', isInteract: true })
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full mx-auto">
      <div className="flex flex-col">
        <h1 className="text-center text-3xl font-semibold text-gray-800 py-3">
          Sign Up
        </h1>
        <span className="mx-2 mb-4 text-gray-700">
          Have an account?{' '}
          <span
            className="text-blue-600 underline cursor-pointer hover:text-blue-700 transition-colors"
            onClick={onChangeISLogin}
          >
            Click here
          </span>
        </span>
      </div>

      <div className="flex flex-col">
        <div className="relative flex flex-col text-gray-800 mx-3 mb-7">
          <label htmlFor="fullname" className="mb-2 font-medium">
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
            placeholder="Enter your full name"
            className={`ring-1 ring-gray-300 bg-gray-50 rounded-md py-2.5 px-3 transition-all duration-200
                  ${(fullName.isError && fullName.isInteract) ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-blue-500 focus:outline-none"} `}
          />
          {(fullName.isError && fullName.isInteract) && (
            <span className="absolute text-sm text-red-500 pl-1 -bottom-6">
              {fullName.errMassage}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <div className="relative flex flex-col text-gray-800 mx-3 mb-7">
            <label htmlFor="number" className="mb-2 font-medium">
              Phone Number:
            </label>
            <div className="flex gap-2 w-full ">
              <select
              id="countryCode"
              name="countryCode"
                value={countryCode}
                onChange={(e) => setCountryCode && setCountryCode(e.target.value)}
                className={`ring-1 ring-gray-300 bg-gray-50 rounded-md py-2.5 px-2 transition-all duration-200
                  ${((number.isError && number.isInteract)) ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-blue-500 focus:outline-none"} `}
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
                placeholder="1234567890"
                className={`flex-1 ring-1 w-full ring-gray-300 bg-gray-50 rounded-md py-2.5 px-3 transition-all duration-200 
                  ${((number.isError && number.isInteract)) ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-blue-500 focus:outline-none"} `}
              />
            </div>

            {((number.isError && number.isInteract)) && (
              <span className="absolute text-sm text-red-500 pl-1 -bottom-6">
                {number.errMassage}
              </span>
            )}
          </div>

          <div className="relative flex flex-col text-gray-800 mx-3 mb-7">
            <label htmlFor="userEmail" className="mb-2 font-medium">
              Email:
            </label>
            <input
              type="text"
              id="userEmail"
              name="userEmail"
              placeholder="your@email.com"
              
              maxLength={20}
              value={email.value}
              onClick={() => setEmail && setEmail({ ...email, isInteract: true })}
              onChange={(e) => setEmail && setEmail({ ...email, value: e.target.value })}
              className={`ring-1 ring-gray-300 bg-gray-50 rounded-md py-2.5 px-3 transition-all duration-200
                  ${(email.isError && email.isInteract) ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-blue-500 focus:outline-none"} `}
            />
            {(email.isError && email.isInteract) && (
              <span className="absolute text-sm text-red-500 pl-1 -bottom-6">
                {email.errMassage}
              </span>
            )}
          </div>
        </div>

        <div className="relative flex flex-col text-gray-800 mx-3 mb-7">
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
            className={`ring-1 ring-gray-300 bg-gray-50 rounded-md py-2.5 px-3 transition-all duration-200
                  ${(username.isError && username.isInteract) ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-blue-500 focus:outline-none"} `}
            autoComplete='true'
          />
          {(username.isError && username.isInteract) && (
            <span className="absolute text-sm text-red-500 pl-1 -bottom-6">
              {username.errMassage}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <div className="relative flex flex-col text-gray-800 mx-3 mb-7">
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
              className={`ring-1 ring-gray-300 bg-gray-50 rounded-md py-2.5 px-3 pr-10 transition-all duration-200
                  ${(password.isError && password.isInteract) ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-blue-500 focus:outline-none"} `}
            />
            {showPassword ? (
              <div
                className="absolute right-5 top-10.5 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <Eye size={20} />
              </div>
            ) : (
              <div
                className="absolute right-5 top-10.5 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
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

          <div className="relative flex flex-col text-gray-800 mx-3 mb-7">
            <label htmlFor="confirmPassword" className="mb-2 font-medium">Confirm Password:</label>
            <input
              type={passType}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              maxLength={16}
              value={confirmPassword.value}
              onClick={() => setConfirmPassword && setConfirmPassword({ ...confirmPassword, isInteract: true })}
              onChange={(e) => setConfirmPassword && setConfirmPassword({ ...confirmPassword, value: e.target.value })}
              className={`ring-1 ring-gray-300 bg-gray-50 rounded-md py-2.5 px-3 pr-10 transition-all duration-200
                  ${(confirmPassword.isError && confirmPassword.isInteract) ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-2 focus:ring-blue-500 focus:outline-none"} `}
            />
            {showPassword ? (
              <div
                className="absolute right-5 top-10.5 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
                onClick={() => setShowPassword((prev) => !prev)}

              >
                <Eye size={20} />
              </div>
            ) : (
              <div
                className="absolute right-5 top-10.5 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <EyeClosed size={20} />
              </div>
            )}
            {(confirmPassword.isError && confirmPassword.isInteract) && (
              <span className="absolute text-sm text-red-500 pl-1 -bottom-6">
                {confirmPassword.errMassage}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full px-3">
        <button
          type="button"
          className="bg-blue-500 mt-4 text-white rounded-md py-2.5 w-full hover:bg-blue-600 hover:shadow-lg font-semibold transition-all duration-200"
          onClick={onSubmit}
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}