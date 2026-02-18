import { TextField } from "@mui/material"

function Page() {
    return (
        <>
            <div className="w-full h-full flex justify-center items-center">

                <div className="flex flex-col gap-3 max-w-xl p-5 m-5 rounded-xl bg-gray-100 shadow">
                    <h1 className="text-gray-950 text-3xl font-bold">Create Blog</h1>

                    <div className="flex-1 w-full">
                        <label htmlFor="title">Title</label>
                        <TextField id="title" label="title" variant="outlined" className="w-full" />
                    </div>
                    <div className="flex-1 w-full">
                        <label htmlFor="title">Title</label>
                        <TextField id="title" label="title" variant="outlined" className="w-full" />
                    </div>


                </div>

            </div>
        </>
    )
}

export default Page