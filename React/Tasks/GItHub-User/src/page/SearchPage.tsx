import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsersList } from "../API/getUserDetails";

export default function Search() {
    const { keyword } = useParams();
    const [userDetails, setUserDetails] = useState<unknown[]>();


useEffect(()=>{
    (async() => {
        if(keyword !== undefined){
            const userList = await getUsersList(keyword);
            if( userList.data){
                setUserDetails(userList.data.items)
            }
        }
    })();
},[keyword])

    useEffect(()=>{
        console.log(userDetails);
    },[userDetails])

    
    return(
        <>
        
        </>
    )
}