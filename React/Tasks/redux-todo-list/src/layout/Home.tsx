import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppStore } from "../redux/store";


function Home() {

    const getStore = useSelector((state: AppStore) => state)
    const isLogin = getStore.userDetails.isLogin;
    const navigate = useNavigate();


    return (
        <div className="h-screen w-full flex justify-center items-center">
            {!isLogin ? (


                <div className="bg-blue-600 px-3 py-2 cursor-pointer rounded-md text-white"
                    onClick={() => navigate && navigate('/login')}>
                    Go to Login Page
                </div>

            ) : (
                <div className="bg-blue-600 px-3 py-2 cursor-pointer rounded-md text-white"
                    onClick={() => navigate && navigate('/dashboard')}>
                    Go to Dashboard
                </div>
            )}
        </div>
    )
}

export default Home;

