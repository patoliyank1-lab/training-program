import { Post } from "@/app/Types/Blog";
import axios from "axios";

async function fetchPosts() {
    const response = await axios.get('/api/post/getAll');
    return response.data;
}

async function fetchPostBySlug(id: string) {
    const response = await axios.get(`/api/post/singlePost?id=${id}`);
    return response.data;
}

async function createPost(post: Post) {
    const response = await axios.post('/api/post/createPost', post);
    return response.data;

}

async function updatePost(post: Post) {
    const response = await axios.put('/api/post/updatePost', post);
    return response.data;
}

async function deletePost(id: string) {
    const response = await axios.delete(`/api/post/delete?id=${id}`);
    return response.data;
}

async function likePost({ id, userId }:{id:string, userId:string}) {
    const response = await axios.post(`/api/post/like`, {id, userId} );
    return response.data;
}


async function incrementViews(id: string) {
    const response = await axios.get(`/api/post/addView?id=${id}`);
    return response.data;
}


async function setFilters(filters:string[]) {
    const response = await axios.post(`/api/post/filter`, filters);
    return response.data;
}


const postService = {
    fetchPosts,
    fetchPostBySlug,
    createPost,
    updatePost,
    deletePost,
    likePost,
    incrementViews,
    setFilters,
}
export default postService;