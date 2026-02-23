'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import generateId from '../utils/helpers/generateId';
import { Post } from '../Types/Blog';
import { Comment } from '../Types/Comment';
import { useAuth } from '../hooks/useAuth';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/Slices/commentsSlice';

const validationSchema = Yup.object({
    name: Yup.string().required('name is required').min(3, 'Title must be at least 3 characters'),
    email: Yup.string().required('email is required'),
    body: Yup.string().required('comment is required').min(10, 'Body must be at least 10 characters'),
});

function CommentSection({ post }: { post: Post }) {

    const { user } = useAuth()
    const dispatch = useDispatch<AppDispatch>();


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            body: '',
        },
        validationSchema,
        onSubmit: async (values) => {

            const comment: Comment = {
                id: generateId(),
                postId: post.id,
                massage: values.body,
                user: {
                    userId: user ? user.id : null,
                    name: values.name,
                    email: values.email,
                },
                createdAt: new Date().toISOString(),
            };
            values.body = '';
            values.email = '';
            values.name = '';
            dispatch(addComment({ comment }))
        },
    });


    const inputClass = "w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-body)] outline-none focus:border-[var(--primary)] transition-colors duration-200";
    const labelClass = "text-sm font-medium text-[var(--text-heading)] mb-1";
    const errorClass = "text-xs text-[var(--error)] mt-1";


    return (
        <div className='rounded-xl w-full mt-5 overflow-hidden bg-(--surface-raised) border border-(--border) p-5'>

            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
                <div className='flex w-full '>
                    <div className="flex flex-1 mr-3 flex-col">
                        <label htmlFor="name" className={labelClass}>Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Post title"
                            className={inputClass}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && <p className={errorClass}>{formik.errors.name}</p>}
                    </div>

                    <div className="flex flex-1 flex-col">
                        <label htmlFor="email" className={labelClass}>Email</label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="e.g. Technology"
                            className={inputClass}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && <p className={errorClass}>{formik.errors.email}</p>}
                    </div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="body" className={labelClass}>Comment</label>
                    <textarea
                        id="body"
                        name="body"
                        rows={8}
                        placeholder="Write your post content here..."
                        className={inputClass + " h-20  resize-none"}
                        value={formik.values.body}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.body && formik.errors.body && <p className={errorClass}>{formik.errors.body}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-(--primary) text-(--primary-text) font-medium cursor-pointer hover:bg-(--primary-hover) transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Comment
                </button>
            </form>

        </div>
    )
}

export default CommentSection