import { useCallback, useState } from "react";
import Login  from './pages/Login'
import SingUp from "./pages/SignUp";

interface typeError {
  value: string;
  isError: boolean;
  isInteract: boolean;
  errMassage: string
}

function App() {
  const [isShowLogin, setIsShowLogin] = useState<boolean>(true);

  const [fullName, setFullName] = useState<typeError>({ value: '', isError: false, isInteract: false, errMassage: 'Invalid Name' });;
  const [number, setNumber] = useState<typeError>({ value: '', isError: false, isInteract: false, errMassage: 'Invalid number' });;
  const [email, setEmail] = useState<typeError>({ value: '', isError: false, isInteract: false, errMassage: 'Invalid email' });;
  const [username, setUsername] = useState<typeError>({ value: '', isError: false, isInteract: false, errMassage: 'Invalid username' });;
  const [password, setPassword] = useState<typeError>({ value: '', isError: false, isInteract: false, errMassage: 'Invalid password' });;
  const [confirmPassword, setConfirmPassword] = useState<typeError>({ value: '', isError: false, isInteract: false, errMassage: 'password does not match' });;

  const onChangeISLogin = useCallback(() => {
    setFullName({ ...fullName, isError: false, value: '', isInteract: false })
    setNumber({ ...number, isError: false, value: '', isInteract: false })
    setEmail({ ...email, isError: false, value: '', isInteract: false })
    setUsername({ ...username, isError: false, value: '', isInteract: false })
    setPassword({ ...password, isError: false, value: '', isInteract: false })
    setConfirmPassword({ ...confirmPassword, isError: false, value: '', isInteract: false })
    console.log(fullName);

    setIsShowLogin((prev) => !prev)
  }, [fullName, number, email, username, password, confirmPassword]);

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-gray-100 overflow-hidden">
        {isShowLogin ? (
          <SingUp isShowLogin={isShowLogin} onChangeISLogin={onChangeISLogin}/>
        ) : (
          <Login isShowLogin={isShowLogin} onChangeISLogin={onChangeISLogin}/>
        )}
      </div>
    </>
  );
}

export default App;
