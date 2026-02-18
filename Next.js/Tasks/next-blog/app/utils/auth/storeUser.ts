import { User } from '@/app/Types/User';
import { promises as fs } from 'fs';
import {getUser} from './getUser';

export async function storeUser(user: User) {
    const filePath = './Data/usersData.json'

    try {
        const userData: User[] = await getUser();
        userData.push(user);

        const jsonString = JSON.stringify(userData, null, 4);
        fs.writeFile(filePath, jsonString);

        console.log(`Successfully wrote data to ${filePath}`);

    } catch (error) {
        console.error('Error writing file:', error);
    }
}