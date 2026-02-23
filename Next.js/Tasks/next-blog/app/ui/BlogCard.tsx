'use client';
import Link from 'next/link';
import { Post } from '../Types/Blog';
import { RiEyeLine, RiHeart3Fill, RiHeart3Line, RiTimeLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { incrementViews } from '../redux/Slices/postsSlice';

export default function BlogCard({ post }: { post: Post }) {
    const dispatch = useDispatch<AppDispatch>();
    const [isLike, setIsLike] = useState<boolean>(false);
    const { user } = useAuth()
    useEffect(()=>{
        if(user){
            const uId =  user.id;
            const hasLike = post.likesUser.find((id) => String(id) === String(uId));
            if(hasLike){
                setIsLike(true);
            }
        }
        
    },[post])

    return (
        <Link href={`/posts/${post.id}`} className="no-underline">
            <div className="rounded-xl overflow-hidden bg-(--surface-raised) border border-(--border) hover:border-(--border-purple) transition-all duration-200 hover:shadow-(--shadow-md)"
            onClick={()=>{dispatch(incrementViews({ id: post.id as string }))}}>
                {post.thumbnail && (
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                    />
                )}
                <div className="p-4">
                    {post.Category && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-(--primary-light) text-(--text-purple) mb-2 inline-block">
                            {post.Category}
                        </span>
                    )}
                    <h2 className="text-lg font-semibold text-(--text-heading) mb-1 line-clamp-1">
                        {post.title}
                    </h2>
                    <p className="text-sm text-(--text-muted) mb-3 line-clamp-2">
                        {post.body}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-(--text-disabled)">
                        <span className="flex items-center gap-1">
                          {isLike ?   <RiHeart3Fill size={14} />: <RiHeart3Line size={14} />} {post.likes}
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
