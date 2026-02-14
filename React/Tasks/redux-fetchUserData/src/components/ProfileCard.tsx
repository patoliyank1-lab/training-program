import { Facebook, Twitter, Instagram, Phone, Mail, User } from "lucide-react";


interface user{
    name : string;
    role:string;
    phone:string;
    email:string;
    url:string;
}
export {User};


export default function ProfileCard({name , role, phone, email , url} : user) {
  return (
    <>
      <div className="bg-white w-100 text-gray-950 rounded-md shadow p-5 flex flex-col">
        <div className=" text-center">
          <div className="rounded-full overflow-hidden p-1 size-24 bg-gray-100 mx-auto">
            <img src={url} alt="" />
          </div>
          <h1 id="name" className="text-3xl mt-5">
            {name}
          </h1>
          <h2 id="title" className="text-md">
            {role}
          </h2>
        </div>
        <div className="flex m-5">
          <div className="m-5 flex flex-col justify-center items-center">
            <div className="bg-gray-200 size-10 flex items-center justify-center rounded-full cursor-pointer ">
              <Facebook />
            </div>
            <div className="mt-2">Facebook</div>
          </div>
          <div className="m-5 flex flex-col justify-center items-center">
            <div className="bg-gray-200 size-10 flex items-center justify-center rounded-full cursor-pointer ">
              <Twitter />
            </div>
            <div className="mt-2">Twitter</div>
          </div>
          <div className="m-5 flex flex-col justify-center items-center">
            <div className="bg-gray-200 size-10 flex items-center justify-center rounded-full cursor-pointer ">
              <Instagram />
            </div>
            <div className="mt-2">Instagram</div>
          </div>
        </div>
        <div>
          <div className="flex m-5">
            <Phone />
            <div className="mx-5">{phone}</div>
          </div>
          <div className="flex m-5">
            <Mail />
            <div className="mx-5">{email}</div>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="btn-primary w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
          >
            Show Profile
          </button>
        </div>
      </div>
    </>
  );
}
