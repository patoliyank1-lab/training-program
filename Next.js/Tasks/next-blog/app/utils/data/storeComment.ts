import { promises as fs } from 'fs';
import { getComment } from './getComment';
import { Comment } from '@/app/Types/Comment';

export async function storeComment(comment:Comment) : Promise<Comment[]> {



    const filePath = './Data/commentData.json'

    try {
        const commentData: Comment[] = await getComment();
        commentData.push(comment);
        const jsonString = JSON.stringify(commentData, null, 4);
        fs.writeFile(filePath, jsonString);
        console.log(`Successfully wrote data to ${filePath}`);
        return commentData as Comment[];
    } catch (error) {
        console.error('Error writing file:', error);
        return [];
    }

}