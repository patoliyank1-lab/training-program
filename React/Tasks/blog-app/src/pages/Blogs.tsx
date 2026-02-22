import { useContext, useEffect, useState } from "react"
import { ContextValue } from "../context/ContextValue"
import { IoMdSearch } from "react-icons/io";
import { addBlog, getBlogs } from "../utils/blogData";
import { getCurrentUser } from "../utils/userData";
import { SignalBlog } from '../components'
import type { Blog } from "../Type";


const blogHead = {
    // backgroundImage :`url()`,
    background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(./blog-page.jpg)',
    backgroundOrigin: 'border-box',
    backgroundRepeat: 'no-repeat',
    // backgroundAttachment: 'fixed',
    backgroundSize: 'cover',

};



function Blogs() {
    const { theme, isLogin } = useContext(ContextValue)
    const [showBlog, setShowBlog] = useState<boolean>(false)

    const [blogList, setBlogList] = useState<Blog[]>([])


    useEffect(()=>{
        const blogs = getBlogs();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBlogList(blogs)
    },[showBlog])





    return (
        <div className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-100'} flex flex-col items-center w-full overflow-auto no-scrollbar flex-1`} >
            <CreateBlog className={` ${!showBlog && 'hidden'} `} setShowBlog={setShowBlog} />
            <div className=" flex justify-center w-full"
                style={blogHead}>
                <div className="w-full max-w-350  h-full flex justify-center items-center">
                    <h1 className="text-5xl xl:text-7xl my-20 font-bold text-white cursor-default ">Blog Page</h1>
                </div>
            </div>

            <div className={"w-full max-w-350 p-5 h-full flex flex-col md:pt-10 pt-15 items-center gap-5"
                + ` ${theme === 'dark' ? 'text-white' : ''}`
            }>
                <div className="w-full flex justify-between px-5 h-10">
                    <div className="relative flex items-center flex-1 max-w-150 md:px-5 pr-5">
                        <input type="text" id="search" placeholder="search..."
                            className={`${theme === 'dark' ? '' : 'ring ring-gray-800 rounded-sm h-full w-full pl-5'}`} />
                        <IoMdSearch className="absolute size-6 right-8" />
                    </div>

                    {isLogin && <div className="bg-blue-500 h-full hover:bg-blue-600 text-white py-1 px-3 flex items-center rounded-sm shadow cursor-pointer"
                        onClick={() => setShowBlog && setShowBlog((prev) => !prev)}>
                        Create Blog
                    </div>}


                </div>

                {blogList.length === 0 && (
                    <div>Their is no Blog.</div>
                )}
                {blogList.map((blog)=>(
                    <SignalBlog key={blog.id} blog={blog}  />
                ))}


            </div>

        </div>
    )
}

export default Blogs;



function CreateBlog({ className, setShowBlog }: { className: string; setShowBlog: React.Dispatch<React.SetStateAction<boolean>> }) {

    const { theme } = useContext(ContextValue)
    const [title, setTitle] = useState<string>('')
    const [titleError, setTitleError] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [descriptionError, setDescriptionError] = useState<string>('')

    const onCreate = () => {
        const currUser = getCurrentUser();

        if (title.length >= 3 && description.length >= 15 && currUser) {


            setShowBlog((prev) => !prev)
            addBlog(title,description,currUser.id);

        }
        else {
            if (title.length <= 3) {
                setTitleError('title must be minimum 3 character')
            }
            if (title.length <= 3) {
                setDescriptionError('description must be minimum 15 character')
            }
        }

    }


    return (
        <div className={"fixed w-screen h-screen overflow-auto backdrop-blur-[2px]  z-10 top-0 right-0 flex justify-center items-center " + className}
        onClick={ () => setShowBlog && setShowBlog(false)}>
            <div className={"p-5 shadow-2xl gap-5 flex flex-col rounded-sm min-w-md" + ` ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white'}`}
                        onClick={(e) => e.stopPropagation()}
>
                <h1 className="text-3xl font-semibold ">Create Blog</h1>
                <form action="" className="flex flex-col gap-3">
                    <div className="flex flex-col">
                        <label htmlFor="title">
                            Title
                        </label>
                        <input type="text"
                            id="title"
                            name="title"
                            minLength={5}
                            value={title}
                            onChange={e => setTitle && setTitle(e.target.value)}
                            placeholder="Enter Title"
                            className={`ring-1 ring-gray-300  rounded-sm py-2.5 px-3 transition-all duration-200
                            ${theme === 'dark' ? '' : 'bg-gray-50'}
                            `} />
                            <p className="text-red-500">{titleError}</p>
                    </div>

                    <div className="flex flex-col ">
                        <label htmlFor="description">
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            value={description}
                            onChange={e => setDescription && setDescription(e.target.value)}
                            placeholder="Enter Title"
                            className={`ring-1 ring-gray-300  rounded-sm py-2.5 px-3 transition-all  resize-none duration-200 overflow-auto h-40
                            ${theme === 'dark' ? '' : 'bg-gray-50'}
                            `} />
                            <p className="text-red-500">{descriptionError}</p>

                        <div>
                            <div className="bg-blue-500 w-min  text-white text-xl cursor-pointer font-medium rounded-sm px-5 py-2 hover:bg-blue-700 mt-5"
                                onClick={onCreate}>Create</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

}
