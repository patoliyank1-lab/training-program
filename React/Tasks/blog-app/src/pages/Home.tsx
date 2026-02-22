import { useContext } from "react"
import { ContextValue } from "../context/ContextValue"


const blogHead = {
                    // backgroundImage :`url()`,
                    background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(./blog-page.jpg)',
                    backgroundOrigin: 'border-box',
                    backgroundRepeat: 'no-repeat',
                    // backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',

                }

function Home() {


    const { theme } = useContext(ContextValue)
    return (
        <div className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-100'} flex flex-col items-center w-full flex-1`} >
            <div className="bg-amber-100 flex justify-center w-full h-[]"
                style={blogHead}>
                <div className="w-full max-w-350  h-full flex justify-center items-center">
                        <h1 className="text-5xl xl:text-7xl my-20 text-white">Home Page</h1>
                </div>
            </div>
        </div>
    )
}

export default Home;

