'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/app//hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStore } from '@/app/redux/store';
import { fetchPostBySlug, updatePost } from '@/app/redux/Slices/postsSlice';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  body: Yup.string().required('Body is required').min(10, 'Body must be at least 10 characters'),
  Category: Yup.string().required('Category is required'),
  tags: Yup.string().required('At least one tag is required'),
});

export default function CreatePostPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { currentPost: post, loading } = useSelector((state: AppStore) => state.posts);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };


  useEffect(() => {
    if (id) {
      dispatch(fetchPostBySlug({ id: id as string }));
      post && setPreview(post.thumbnail)
    }
  }, [id, dispatch]);


  const formik = useFormik({
    initialValues: {
      title: post ? post.title : '',
      body: post ? post.body : '',
      Category: post ? post.Category : '',
      tags: post ? post.tags.join(',') as string : '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {

      let imgUrl:string = preview;


      if (!thumbnailFile){
      setUploading(true);
      } else{
        setUploading(true);
        const formData = new FormData();
        formData.append('file', thumbnailFile);  
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        imgUrl = data.secure_url;
      }
  


      const UpdatedPost = {
        id: post ? post.id : '-1',
        title: values.title,
        body: values.body,
        Category: values.Category,
        tags: values.tags.split(',').map(t => t.trim()),
        thumbnail: imgUrl,
        likes:post ? post.likes : 0,
        likesUser:post ? post.likesUser : [],
        comments: post ? post.comments : 0,
        views: post ? post.views : 0,
        userId: user?.id || '',
        createdAt: new Date().toISOString(),
      };
      dispatch(updatePost(UpdatedPost));
      setUploading(false);
      router.push(`/posts/${id}`);
    },
  });

  const inputClass = "w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-body)] outline-none focus:border-[var(--primary)] transition-colors duration-200";
  const labelClass = "text-sm font-medium text-[var(--text-heading)] mb-1";
  const errorClass = "text-xs text-[var(--error)] mt-1";

  return (
    <div className="max-w-150 min-h-[80vh] mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-(--text-heading) mb-8">Update Post</h1>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label htmlFor="title" className={labelClass}>Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Post title"
            className={inputClass}
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && <p className={errorClass}>{formik.errors.title}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="thumbnail" className={labelClass}>Thumbnail</label>
          <input
            id="thumbnail"
            name="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-(--text-body) file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-(--primary) file:text-(--primary-text) file:cursor-pointer hover:file:bg-(--primary-hover)"
          />
          {preview && (
            
            <img src={preview} alt="Preview" className="mt-2 rounded-lg max-h-40 object-cover" />
          )}
          {!thumbnailFile && formik.submitCount > 0 && <p className={errorClass}>Thumbnail is required</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="Category" className={labelClass}>Category</label>
          <input
            id="Category"
            name="Category"
            type="text"
            placeholder="e.g. Technology"
            className={inputClass}
            value={formik.values.Category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Category && formik.errors.Category && <p className={errorClass}>{formik.errors.Category}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="tags" className={labelClass}>Tags (comma separated)</label>
          <input
            id="tags"
            name="tags"
            type="text"
            placeholder="react, nextjs, web"
            className={inputClass}
            value={formik.values.tags}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.tags && formik.errors.tags && <p className={errorClass}>{formik.errors.tags}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="body" className={labelClass}>Body</label>
          <textarea
            id="body"
            name="body"
            rows={8}
            placeholder="Write your post content here..."
            className={inputClass + " resize-y"}
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.body && formik.errors.body && <p className={errorClass}>{formik.errors.body}</p>}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full py-2.5 rounded-lg bg-(--primary) text-(--primary-text) font-medium cursor-pointer hover:bg-(--primary-hover) transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
}