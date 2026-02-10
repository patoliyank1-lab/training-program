import { FaPaperPlane, FaRegEye, FaRegHeart } from "react-icons/fa";

export default function SignalBlog({ title, description, img }: { title: string; description: string; img?:string }) {

if(!img){
    img = 'https://images.unsplash.com/photo-1770297345796-8de4cf924c08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8' ;
}

    return (
        <div className="w-full border h-80 flex flex-col md:flex-row  p-5 gap-5">
            <div className="bg-blue-100 flex-1 hidden md:flex overflow-hidden"> <img src={img} alt="" className="w-full h-full"/></div>
            <div className="flex-2  flex flex-col justify-between">
                <div className="flex flex-col flex-1 max-h-60 gap-3 hover:text-blue-500/90 transition-all duration-300">
                    <h1 className="text-6xl font-bold fade-mask-to-transparent h-19">{title}</h1>
                    <p
                        className="flex-1 h-30 fade-mask-to-transparent"
                    >{description}</p>
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
            </div>
        </div>
    )
}