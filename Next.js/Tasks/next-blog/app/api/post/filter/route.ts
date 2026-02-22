import { getPosts } from '@/app/utils/data/getPost';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { category, tag, search, sortBy } = await request.json();
    let posts = await getPosts();

    if (category) {
        posts = posts.filter((p) => p.Category === category);
    }
    if (tag) {
        posts = posts.filter((p) => p.tags.includes(tag));
    }
    if (search) {
        const q = search.toLowerCase();
        posts = posts.filter((p) => p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q));
    }
    if (sortBy === 'popular') {
        posts.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'oldest') {
        posts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else {
        posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return NextResponse.json(posts, { status: 200 });
}
