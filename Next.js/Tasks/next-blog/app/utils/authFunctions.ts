import axios from "axios";
import { StoreUser, User } from "../Types/User";
import generateId from "./helpers/generateId";

export function IsAdmin({ email }: { email: string }) {

    if (email === 'admin@blog.com') {
        return true;
    }
    return false;
}


// export  async function CheckLogin({ email, password }: { email: string, password: string }) {
    
//     try {
//    if(email && password){
//     // let user:StoreUser;

//             const response = await axios.post('/api/auth/login', {email:email, password:password})
//     return response.data;
//     }
//     return null
// } catch (error) {
//     console.error(error)
//     return null
// }
// }

// export async function registerUser({name,age,gender,email,password,avatar}:{name:string,age:string,gender:string,email:string,password:string,avatar:string}) {

//     const user:User = {
//     id: generateId(),
//     name: name,
//     age: Number(age),
//     gender: gender,
//     email: email,
//     password: password,
//     avatar: avatar,
//     role: email === 'admin@blog.com' ? 'admin' : 'user',
//     createdAt: new Date().toISOString(),
//     }

//     try {
//         if (user) {
//             const response = await axios.post('/api/auth/register', user)
//                 console.log(response.data);
                
//             return response.data;
//         }
//         return null;
//     } catch (error) {
//         console.error(error)
//         return null
//     }
// }