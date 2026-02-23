'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStore } from '../../redux/store';
import { deletePost, fetchPostBySlug, likePost } from '../../redux/Slices/postsSlice';
import { RiEyeLine, RiHeart3Line, RiTimeLine, RiArrowLeftLine, RiHeart3Fill } from 'react-icons/ri';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';
import CommentSection from '@/app/ui/CommentSection';
import CommentView from '@/app/ui/CommentView';

export default function PostPage() {
    const { id } = useParams();
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>();
    const { currentPost: post, loading } = useSelector((state: AppStore) => state.posts);
    const { user } = useAuth()
    const [isLike, setIsLike] = useState<boolean>(false);
     



    useEffect(() => {
        if (id) {
            dispatch(fetchPostBySlug({ id: id as string }));
        }
    }, [id, dispatch, isLike]);
    
    useEffect(()=>{
        if(user && post){
            const uId =  user.id;
            const hasLike = post.likesUser.find((id) => String(id) === String(uId));
            if(hasLike){
                setIsLike(true);
            } else setIsLike(false)
        }
        
    },[post])

    const onDelete = useCallback(() => {

        dispatch(deletePost({ id: id as string }))
        router.push('/posts')

    }, [dispatch])

    const onLike = useCallback(()=>{
        dispatch(likePost({id:id as string ,userId:user?.id as string }))
        setIsLike((prev) => !prev)
    },[])

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center text-(--text-muted)">
                Loading...
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
                <p className="text-lg text-(--text-muted)">Post not found.</p>
                <Link href="/posts" className="text-(--primary) no-underline hover:underline">
                    ← Back to posts
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-200 min-h-[80vh] mx-auto px-6 py-10">
            <div className='flex justify-between'>

                <Link href="/posts" className="inline-flex items-center gap-1 text-sm text-(--text-muted) no-underline hover:text-(--primary) transition-colors duration-200 mb-6">
                    <RiArrowLeftLine size={16} /> Back to posts
                </Link>

                {post.userId === user?.id && <div>
                    <Link
                        href={`/posts/update/${id}`}
                        className="text-sm px-4 py-1.5 rounded-md border border-(--primary) bg-(--primary) text-(--primary-text) no-underline transition-all duration-200 hover:bg-(--primary-hover) mr-3"
                    >
                        Edit
                    </Link>

                    <button
                        className="text-sm px-2.5 py-1 rounded-md border border-(--error) text-(--error) bg-transparent cursor-pointer"
                        onClick={onDelete} >
                        Delete
                    </button>
                </div>}
            </div>

            {post.thumbnail && (
                <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-72 object-cover rounded-xl mb-6"
                />
            )}

            <div className="flex items-center gap-3 mb-4">
                {post.Category && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-(--primary-light) text-(--text-purple)">
                        {post.Category}
                    </span>
                )}
                {post.tags?.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full border border-(--border) text-(--text-muted)">
                        {tag}
                    </span>
                ))}
            </div>

            <h1 className="text-3xl font-bold text-(--text-heading) mb-4">{post.title}</h1>

            <div className="flex items-center gap-5 text-sm text-(--text-disabled) mb-8">
                <span className="flex items-center gap-1 cursor-pointer" onClick={onLike}>
                    {isLike ?   <RiHeart3Fill size={14} />: <RiHeart3Line size={14} />} {post.likes}
                    
                </span>
                <span className="flex items-center gap-1">
                    <RiEyeLine size={16} /> {post.views}
                </span>
                <span className="flex items-center gap-1">
                    <RiTimeLine size={16} /> {new Date(post.createdAt).toLocaleDateString()}
                </span>
            </div>

            <div className="text-(--text-body) leading-relaxed whitespace-pre-wrap">
                {post.body}
            </div>
            <CommentView post={post}/>
            <CommentSection post={post} />
        </div>
    );
}
