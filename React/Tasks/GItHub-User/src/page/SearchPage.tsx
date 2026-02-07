import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsersList } from "../API/getUserDetails";
import type { getUserType, searchUserType } from "../Utils/Types";
import { ThemeContext } from "../context/ThemeContext";
import useUserList from "../hook/useUserList";

export default function Search() {

    const { theme } = useContext(ThemeContext);

    const { keyword } = useParams();
    const [userDetails, setUserDetails] = useState<searchUserType[]>([]);
    const [list, number, setNumber, setUserList] = useUserList(1)


    useEffect(() => {
        setNumber(1);
        setUserList(userDetails);
    }, [setNumber, setUserList, userDetails])




    useEffect(() => {
        (async () => {
            if (keyword !== undefined) {
                const userList: getUserType = await getUsersList(keyword);
                if (userList.success && userList.data) {
                    setUserDetails(userList.data.items)
                }
            }
        })();
    }, [keyword])






    const onLeftClick = () => {
        if (number !== 1) {
            setNumber((prev: number) => prev - 1);
        }
    }

    const onRightClick = () => {
        if (number !== Math.ceil(userDetails.length / 10)) {
            setNumber((prev: number) => prev + 1);
        }
    }



    return (
        <>
            <div className={` h-lvh flex transform -translate-y-14 pt-14 flex-col ${theme === 'dark' ? 'bg-body' : 'bg-gray-100'}`}>
                <div className="flex-1 p-5 overflow-auto no-scrollbar w-full">
                {list && list.map((user) => (
                    <div
                        id={user.login}
                        key={user.id}
                        className={`border border-gray-500 shadow-xl   max-w-270 mx-auto rounded-xl flex flex-wrap w-full my-2 relative text-gray-500
                            ${theme === 'dark' ? 'bg-gray-900 ' : 'bg-gray-200'}`}
                    >

                        <User user={user} />
                    </div>
                ))}
                </div>
                <div className="my-5 w-full p-2 flex justify-center gap-5">
                    <div
                        className={"border size-8 flex justify-center items-center rounded-md border-gray-500 text-gray-500 cursor-pointer shadow" + ` ${theme === 'dark' ? 'bg-gray-900 ' : 'bg-gray-200'}`}
                        onClick={() => onLeftClick && onLeftClick()}>{'<'}</div>

                    <div
                        className={"border size-8 flex justify-center items-center rounded-md border-gray-500 text-gray-500 cursor-pointer shadow" + ` ${theme === 'dark' ? 'bg-gray-900 ' : 'bg-gray-200'}`}
                    >{number}</div>

                    <div
                        className={"border size-8 flex justify-center items-center rounded-md border-gray-500 text-gray-500 cursor-pointer shadow" + ` ${theme === 'dark' ? 'bg-gray-900 ' : 'bg-gray-200'}`}
                        onClick={() => onRightClick && onRightClick()}>{'>'}</div>

                </div>
            </div>

        </>
    )
}


function User({ user }: { user: searchUserType }) {

    const navigate = useNavigate();


    const onClick = (element: HTMLElement) => {
        const keyword: string = element.innerText;
        console.log(keyword);
        navigate(`/users/${keyword}`)
    }

    return (
        <>
            <div className="w-full p-5 flex">
                <div className="bg-amber-50 rounded-full overflow-hidden flex justify-center items-center md:size-14 size-8 mr-4"><img src={user.avatar_url} className="w-full h-full" alt="" /></div>
                <div className="flex items-center flex-1">
                    <h3 className="text-blue-500 text md:text-xl cursor-pointer hover:underline"
                        onClick={(e) => onClick && onClick(e.target as HTMLElement)}>{user.login}</h3>
                    {(user.user_view_type) === 'public' && <div
                        className="border rounded-2xl ml-2 h-5 px-2 right-0 top-0 text-sm flex justify-center items-center "
                        style={{ fontSize: "12px" }}
                    >
                        Public
                    </div>}
                </div>
            </div>
        </>
    )
}
