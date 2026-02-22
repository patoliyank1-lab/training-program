import { promises as fs } from 'fs';
import {getPosts} from './getPost';
import { Post } from '@/app/Types/Blog';

export async function storePost(post: Post) {
    const filePath = './Data/postData.json'

    try {
        const postData: Post[] = await getPosts();
        postData.push(post);

        const jsonString = JSON.stringify(postData, null, 4);
        fs.writeFile(filePath, jsonString);

        console.log(`Successfully wrote data to ${filePath}`);

    } catch (error) {
        console.error('Error writing file:', error);
    }
}