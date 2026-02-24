import { Post } from '@/app/Types/Blog';
import { Comment } from '@/app/Types/Comment';
import { getPosts } from '@/app/utils/data/getPost';
import { storeComment } from '@/app/utils/data/storeComment';
import axios from 'axios';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const body: Comment = await request.json();
    const response: Comment[] = await storeComment(body)

   const post:Post = await axios.get(`http://localhost:3000/api/post/singlePost?id=${body.postId}`)

   post.comments += 1;

   axios.put(`http://localhost:3000/api/post/updatePost`, post)


    return NextResponse.json( response , {status: 201})

  } catch (error) {
    console.log(error);
    
    return NextResponse.json( {error: 'post not created'}, {status: 401})
  }
}