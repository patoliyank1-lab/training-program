import { Post } from '@/app/Types/Blog';
import { getPosts } from '@/app/utils/data/getPost';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID not provided' }, { status: 400 });
  }

  const posts: Post[] = await getPosts();
  const post = posts.find((ele) => ele.id === id);
  if (!post) {
    return NextResponse.json({ error: 'no post found' }, { status: 404 });
  }
  return NextResponse.json(post, { status: 200 });
}