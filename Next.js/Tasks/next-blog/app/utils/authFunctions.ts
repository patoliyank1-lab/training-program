import axios from "axios";
import { User } from "../Types/User";

export function IsAdmin({ email }: { email: string }) {

    if (email === 'admin@blog.com') {
        return true;
    }
    return false;
}


export function CheckLogin({ email, password }: { email: string, password: string }): User | null {

    if (email === 'test@blog.com' && password === 'test@123') {

    }

    return null;
}

export function registerUser(user: User): boolean {

    try {
        if (user) {
            axios.post('/api/auth/register', user)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    throw Error(error)
                });
            return true;
        }
        return false;
    } catch (error) {
        console.error(error)
        return false
    }
}