import { FaPaperPlane, FaRegEye, FaRegHeart } from "react-icons/fa";
import type { Blog, User } from "../Type";
import { useEffect, useState } from "react";
import { getUserById } from "../utils/userData";

export default function SignalBlog({ blog }: { blog: Blog }) {

    const [blogUser, setBlogUser] = useState<User>();
    const dateObject:Date = new Date(blog.createdAt)

    useEffect(() => {
        const user = getUserById(blog.u_id);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (user) { setBlogUser(user) };

    }, [blog])


    const img: string = blog.img ? blog.img : 'https://images.unsplash.com/photo-1770297345796-8de4cf924c08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8';


    return (
        <div className="w-full border min-h-80 flex flex-col md:flex-row  p-5 gap-5">
            <div className="bg-blue-100 flex-1 hidden md:flex overflow-hidden"> <img src={img} alt="" className="w-full h-full" /></div>
            <div className="flex-2  flex flex-col justify-between">
                <div className="flex flex-col flex-1 max-h-60 gap-3 hover:text-blue-500/90 transition-all duration-300">
                    <h1 className="text-6xl font-bold fade-mask-to-transparent h-19">{blog.title}</h1>
                    <p
                        className="flex-1 h-30 fade-mask-to-transparent"
                    >{blog.description}</p>
                </div>
                <div className="border border-t-gray-500 border-x-0 border-b-0 flex justify-between px-5">
                    <div className="flex gap-5">
                        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500"><FaRegHeart /> <span>21</span></div>
                        <div className="flex items-center gap-1 cursor-pointer
                        hover:text-blue-500"><FaPaperPlane /> <span>21</span></div>

                    </div>
                    <div>
                        <div className="flex items-center gap-1 cursor-pointer
                        hover:text-blue-500"><FaRegEye /> <span>21</span></div>
                    </div>
                </div>
                <div className=" flex justify-between py-1">
                    <div>
                        Created By : {blogUser?.fullName}
                    </div>
                    <div>{dateObject.toLocaleString()}</div>
                </div>
            </div>
        </div>
    )
}