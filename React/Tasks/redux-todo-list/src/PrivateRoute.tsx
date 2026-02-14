import { useSelector } from "react-redux";
import type { AppStore } from "./redux/store";
import { useEffect, type JSX } from "react";
import { useNavigate } from "react-router-dom";

function PrivateRoute({children}:{children:JSX.Element}) {

    const getStore = useSelector((state: AppStore) => state)
    const isLogin = getStore.userDetails.isLogin;
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isLogin){
            navigate('/login')
        }

    },[isLogin,navigate])

    return (
        <>
        {
            isLogin && (children)
        }
        </>
    )
}

export default PrivateRoute