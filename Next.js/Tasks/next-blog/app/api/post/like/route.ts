import { Post } from '@/app/Types/Blog';
import { getPosts } from '@/app/utils/data/getPost';
import { replacePostData } from '@/app/utils/data/replacePostData';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { id, userId }: {id:string, userId:string} = await request.json();
  const posts = await getPosts();
  const index = posts.findIndex((p) => p.id === id);

  const post:Post = posts[index];
  
  if (post.likesUser.find((id) => String(id) === String(userId))) {
    post.likes = Math.max(0, post.likes - 1);
    post.likesUser = post.likesUser.filter((id) => id !== userId);
  } else {
    post.likes += 1;
    post.likesUser.push(userId);
  }

  posts[index] = post;
  replacePostData(posts);
  return NextResponse.json(post, { status: 200 });
}