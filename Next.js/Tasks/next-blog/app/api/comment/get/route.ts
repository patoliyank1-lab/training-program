import { Comment } from '@/app/Types/Comment';
import { getComment } from '@/app/utils/data/getComment';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  
  if (!id) {
    return NextResponse.json({ error: 'ID not provided' }, { status: 400 });
  }
  
  const comment : Comment[] = await getComment();
  
  const response = comment.filter((co) => (co.postId) === id)

    return NextResponse.json(response,{ status: 202 })

}