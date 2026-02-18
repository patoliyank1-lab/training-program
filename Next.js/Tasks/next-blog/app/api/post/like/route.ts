import { Post } from '@/app/Types/Blog';
import { getPosts } from '@/app/utils/data/getPost';
import { replacePostData } from '@/app/utils/data/replacePostData';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const post:{
    id:string,
    userId:string,
    email:string
  } = await request.json();
  
  if (!post.email || !post.id || !post.userId ) {
    return NextResponse.json({ error: 'no post found' }, { status: 400 });
  }

  const allPost = await getPosts();

  const user = allPost.find((post) => Number(post.id) === Number(id))




  const posts : Post[] = await getPosts();
    const index = posts.findIndex((ele) => ele.id === post.id );
    posts[index] = post;
    replacePostData(posts)
    console.log('post updated:', post.id);
    return NextResponse.json(posts,{ status: 203 })
}