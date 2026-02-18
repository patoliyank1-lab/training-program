import { Post } from '@/app/Types/Blog';
import { storePost } from '@/app/utils/data/storePost';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const body: Post = await request.json();
    storePost(body)
    return NextResponse.json( 'post successfully created. ' , {status: 201})

  } catch (error) {

    return NextResponse.json( {error: 'post not created'}, {status: 401})
  }
}