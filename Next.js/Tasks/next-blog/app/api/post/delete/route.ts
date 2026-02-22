import { getPosts } from '@/app/utils/data/getPost';
import { replacePostData } from '@/app/utils/data/replacePostData';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID not provided' }, { status: 400 });
  }

  const posts = await getPosts();

    const updatedPost =  posts.filter((post)=> Number(post.id) !== Number(id));
    replacePostData(updatedPost)
    console.log('Deleting post with ID:', id);
    return NextResponse.json(updatedPost,{ status: 201 })

}