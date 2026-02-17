import { User } from '@/app/Types/User';
import fs from 'fs';

import data from '@/Data/usersData.json'





export async function getUser(): Promise<User[]> {
    try {
        console.log(data);
        
        const user: User[] | null = !data ? null : data as User[];
        if (user) {
            return user;
        }
        const jsonString = JSON.stringify([], null, 4);
        fs.writeFile('./Data/userData.json', jsonString ,(err)=>{
            throw Error(err?.message)
        });
        console.log(`Successfully wrote data to ${'./Data/userData.json'}`);
        return [] as User[];
    } catch (error) {
        console.error('Error writing file:', error);
        return [] as User[];
    }
}