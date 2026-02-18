import { User } from "@/app/Types/User";
import { getUser } from "./getUser";

export const checkLogin = async ({email, password}:{email:string, password:string}) => {
    const allUser:User[] = await getUser();

    const user = allUser.find((user) => user.email === email);

    if(!user){
        return null;
    }

    if(user.password === password){
        return user
    }

    return null

}