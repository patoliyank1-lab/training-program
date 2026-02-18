import { promises as fs } from 'fs';
import { Post } from '@/app/Types/Blog';

export async function replacePostData(post: Post[]) {
    const filePath = './Data/postData.json'

    try {
        const jsonString = JSON.stringify(post, null, 4);
        fs.writeFile(filePath, jsonString);
        console.log(`Successfully wrote data to ${filePath}`);

    } catch (error) {
        console.error('Error writing file:', error);
    }
}