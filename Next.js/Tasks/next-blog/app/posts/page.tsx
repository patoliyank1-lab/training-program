'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStore } from '../redux/store';
import { fetchPosts } from '../redux/Slices/postsSlice';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import BlogCard from '../ui/BlogCard';

export default function PostsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, loading } = useSelector((state: AppStore) => state.posts);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center text-[var(--text-muted)]">
                Loading posts...
            </div>
        );
    }

    return (
        <div className="max-w-[1000px] min-h-[80vh] mx-auto px-6 py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-[var(--text-heading)]">All Posts</h1>
                {isAuthenticated && (
                    <Link
                        href="/posts/create"
                        className="text-sm px-4 py-2 rounded-md bg-[var(--primary)] text-[var(--primary-text)] no-underline hover:bg-[var(--primary-hover)] transition-colors duration-200"
                    >
                        + New Post
                    </Link>
                )}
            </div>

            {posts.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-lg text-[var(--text-muted)]">No posts yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}
