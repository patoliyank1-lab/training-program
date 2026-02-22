import { getPosts } from '@/app/utils/data/getPost';
import { replacePostData } from '@/app/utils/data/replacePostData';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { id, userId, email } = await request.json();
  const posts = await getPosts();
  const index = posts.findIndex((p) => p.id === id);

  const post = posts[index];
  if (post.likesUser?.userId === userId) {
    post.likes = Math.max(0, post.likes - 1);
    post.likesUser = { userId: '', email: '' };
  } else {
    post.likes += 1;
    post.likesUser = { userId, email };
  }

  posts[index] = post;
  replacePostData(posts);
  return NextResponse.json(post, { status: 200 });
}