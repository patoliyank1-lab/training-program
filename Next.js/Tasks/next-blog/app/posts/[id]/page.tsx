'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStore } from '../../redux/store';
import { fetchPostBySlug } from '../../redux/Slices/postsSlice';
import { RiEyeLine, RiHeart3Line, RiTimeLine, RiArrowLeftLine } from 'react-icons/ri';
import Link from 'next/link';

export default function PostPage() {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { currentPost: post, loading } = useSelector((state: AppStore) => state.posts);

    useEffect(() => {
        if (id) {
            dispatch(fetchPostBySlug({ id: id as string }));
        }
    }, [id, dispatch]);

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center text-[var(--text-muted)]">
                Loading...
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
                <p className="text-lg text-[var(--text-muted)]">Post not found.</p>
                <Link href="/posts" className="text-[var(--primary)] no-underline hover:underline">
                    ← Back to posts
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-[800px] min-h-[80vh] mx-auto px-6 py-10">
            <Link href="/posts" className="inline-flex items-center gap-1 text-sm text-[var(--text-muted)] no-underline hover:text-[var(--primary)] transition-colors duration-200 mb-6">
                <RiArrowLeftLine size={16} /> Back to posts
            </Link>

            {post.thumbnail && (
                <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-72 object-cover rounded-xl mb-6"
                />
            )}

            <div className="flex items-center gap-3 mb-4">
                {post.Category && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--primary-light)] text-[var(--text-purple)]">
                        {post.Category}
                    </span>
                )}
                {post.tags?.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-muted)]">
                        {tag}
                    </span>
                ))}
            </div>

            <h1 className="text-3xl font-bold text-[var(--text-heading)] mb-4">{post.title}</h1>

            <div className="flex items-center gap-5 text-sm text-[var(--text-disabled)] mb-8">
                <span className="flex items-center gap-1">
                    <RiHeart3Line size={16} /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                    <RiEyeLine size={16} /> {post.views}
                </span>
                <span className="flex items-center gap-1">
                    <RiTimeLine size={16} /> {new Date(post.createdAt).toLocaleDateString()}
                </span>
            </div>

            <div className="text-[var(--text-body)] leading-relaxed whitespace-pre-wrap">
                {post.body}
            </div>
        </div>
    );
}
