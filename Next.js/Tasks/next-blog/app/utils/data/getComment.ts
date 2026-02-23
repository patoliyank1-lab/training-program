import fs from 'fs';
import data from '@/Data/commentData.json'
import { Comment } from '@/app/Types/Comment';

export async function getComment(): Promise<Comment[]> {
      try {
        const posts: Comment[] | null = !data ? null : data as Comment[];
        if (posts) {
            return posts;
        }
        const jsonString = JSON.stringify([], null, 4);
        fs.writeFile('./Data/postData.json', jsonString ,(err)=>{
            throw Error(err?.message)
        });
        console.log(`Successfully wrote data to ${'./Data/postData.json'}`);
        return [] as Comment[];
    } catch (error) {
        console.error('Error writing file:', error);
        return [] as Comment[];
    }
}
