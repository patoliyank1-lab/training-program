import { Comment } from "@/app/Types/Comment";
import axios from "axios";

const addComment = async (comment:Comment): Promise<Comment[]> => {

    const response = await axios.post('/api/comment/add', comment);
    return response.data;

}


const getComment = async (postId:string): Promise<Comment[]> => {
    const response = await axios.get(`/api/comment/get?id=${postId}`);
    return response.data;
}

const commentService = {
    addComment,
    getComment,
}
export default commentService;