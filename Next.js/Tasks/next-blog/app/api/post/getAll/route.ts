import { Post } from '@/app/Types/Blog';
import { getPosts } from '@/app/utils/data/getPost';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const posts : Post[] = await getPosts();
    return NextResponse.json(posts,{ status: 202 })

}