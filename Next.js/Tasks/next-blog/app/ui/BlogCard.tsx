import Link from 'next/link';
import { Post } from '../Types/Blog';
import { RiEyeLine, RiHeart3Line, RiTimeLine } from 'react-icons/ri';

export default function BlogCard({ post }: { post: Post }) {
    return (
        <Link href={`/posts/${post.id}`} className="no-underline">
            <div className="rounded-xl overflow-hidden bg-[var(--surface-raised)] border border-[var(--border)] hover:border-[var(--border-purple)] transition-all duration-200 hover:shadow-[var(--shadow-md)]">
                {post.thumbnail && (
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                    />
                )}
                <div className="p-4">
                    {post.Category && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[var(--primary-light)] text-[var(--text-purple)] mb-2 inline-block">
                            {post.Category}
                        </span>
                    )}
                    <h2 className="text-lg font-semibold text-[var(--text-heading)] mb-1 line-clamp-1">
                        {post.title}
                    </h2>
                    <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-2">
                        {post.body}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[var(--text-disabled)]">
                        <span className="flex items-center gap-1">
                            <RiHeart3Line size={14} /> {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                            <RiEyeLine size={14} /> {post.views}
                        </span>
                        <span className="flex items-center gap-1">
                            <RiTimeLine size={14} /> {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
