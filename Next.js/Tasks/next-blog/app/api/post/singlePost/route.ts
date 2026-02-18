import { Post } from '@/app/Types/Blog';
import { getPosts } from '@/app/utils/data/getPost';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
 const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID not provided' }, { status: 400 });
  }

  console.log(request)
  const posts : Post[] = await getPosts();
    const post = posts.find((ele) => Number(ele.id) === Number(id) );
  if (!post || !post) {
    return NextResponse.json({ error: 'no post found' }, { status: 400 });
  }
    return NextResponse.json(post,{ status: 202 })
}