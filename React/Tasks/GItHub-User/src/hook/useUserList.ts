import { useState, type Dispatch, type SetStateAction } from "react";
import type { searchUserType } from "../Utils/Types";

export default function useUserList(defaultNumber:number) :[searchUserType[], number, Dispatch<SetStateAction<number>>, Dispatch<SetStateAction<searchUserType[]>> ] {

    const [userList, setUserList] = useState<searchUserType[]>([]);

    const [listNumber, setListNumber] = useState<number>(defaultNumber)
    const userListArray: searchUserType[][] = [];

    for(let i = 0; i <= Math.ceil(userList.length/10) ; i++){
        const userListA =  userList.slice(i * 10 , (i + 1) * 10);
        userListArray.push(userListA);   
    }

    return [userListArray[listNumber - 1] , listNumber, setListNumber, setUserList ]
}