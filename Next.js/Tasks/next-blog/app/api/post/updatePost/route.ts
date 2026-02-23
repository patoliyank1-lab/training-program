import { Post } from '@/app/Types/Blog';
import { getPosts } from '@/app/utils/data/getPost';
import { replacePostData } from '@/app/utils/data/replacePostData';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const post:Post = await request.json();
  
  if (!post) {
    return NextResponse.json({ error: 'no post found' }, { status: 400 });
  }
  const posts : Post[] = await getPosts();
  const index = posts.findIndex((ele) => String(ele.id) === String(post.id));
  posts[index] = post;
  console.log(post.id);
    replacePostData(posts)
    return NextResponse.json(posts,{ status: 203 })
}