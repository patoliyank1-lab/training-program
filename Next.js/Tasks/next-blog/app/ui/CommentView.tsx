import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStore } from "../redux/store";
import { Post } from "../Types/Blog";
import { useEffect, useState } from "react";
import { getComment } from "../redux/Slices/commentsSlice";
import clsx from "clsx";
import { Comment } from "../Types/Comment";

function CommentView({ post }: { post: Post }) {
    const dispatch = useDispatch<AppDispatch>();
    const { comments, loading } = useSelector((state: AppStore) => state.comments);
    const [isBoxOpen, setIsBoxOpen] = useState<boolean>(false)


    useEffect(() => {
        if (post.id) {
            dispatch(getComment({ postId: post.id }));
        }
    }, [post.id, dispatch]);

    return (
        <>
            <div className='rounded-xl w-full mt-5 overflow-hidden bg-(--surface-raised) border border-(--border) p-5'>
                <h1 className="text-3xl font-bold text-(--text-heading) mb-8">Comments</h1>

                {comments.length == 0 && <div className="flex w-full justify-center items-center h-20 text-(--text-muted)">
                    <p>Their is No comment.</p>
                </div>}
                {comments.length != 0 &&  <div className="relative pb-7">
                    <div className={clsx('transition-all delay-150 duration-300 ease-in-out', {
                        " max-h-100 overflow-y-auto no-scrollbar": isBoxOpen,
                        "max-h-30 fade-mask-to-transparent ": !isBoxOpen,
                    })}>
                        {comments.map((comment:Comment) => (
                            <div key={comment.id} className="p-2">
                                <p><span className="rounded-lg bg-(--primary) text-(--primary-text) font-bold px-2 py-1.5 mr-1">{comment.user.name[0].toUpperCase()}</span> <span>{comment.user.email}</span></p>
                                <p className="w-full px-3 py-2 rounded-lg border border-(--border) bg-(--surface) text-(--text-body) mt-1.5">{comment.massage}</p>
                            </div>
                        ))}
                    </div>
                    {!isBoxOpen && <div className="absolute -bottom-2 w-full z-20 flex justify-center items-center cursor-pointer"
                        onClick={() => setIsBoxOpen(true)}><p><big>↓</big> More</p> </div>}
                    {isBoxOpen && <div className="absolute -bottom-2 w-full z-20 flex justify-center items-center cursor-pointer"
                        onClick={() => setIsBoxOpen(false)}><p><big>↑</big> Less</p> </div>}
                </div>}
            </div>
        </>
    )
}

export default CommentView;