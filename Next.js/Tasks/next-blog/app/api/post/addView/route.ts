import { getPosts } from '@/app/utils/data/getPost';
import { replacePostData } from '@/app/utils/data/replacePostData';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const posts = await getPosts();
    const index = posts.findIndex((p) => p.id === id);

    posts[index].views += 1;
    replacePostData(posts);
    return NextResponse.json(posts[index], { status: 200 });
}
