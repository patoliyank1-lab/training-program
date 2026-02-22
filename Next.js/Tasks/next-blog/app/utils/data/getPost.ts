import fs from 'fs';
import data from '@/Data/postData.json'
import { Post } from '@/app/Types/Blog';


export async function getPosts(): Promise<Post[]> {
    try {
        const posts: Post[] | null = !data ? null : data as Post[];
        if (posts) {
            return posts;
        }
        const jsonString = JSON.stringify([], null, 4);
        fs.writeFile('./Data/postData.json', jsonString ,(err)=>{
            throw Error(err?.message)
        });
        console.log(`Successfully wrote data to ${'./Data/postData.json'}`);
        return [] as Post[];
    } catch (error) {
        console.error('Error writing file:', error);
        return [] as Post[];
    }
}