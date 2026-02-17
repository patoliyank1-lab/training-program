"use client";
import { Stack } from "@mui/material"
import Button from '@mui/material/Button';
import Link from "next/link";
import generateId from "../utils/helpers/generateId";
// import getUser from "../utils/data/getUser";

function Header() {



  const fun = async () => {
    console.log(generateId())
  }



  return (
    <div className={'sticky top-0 w-full min-h-20 shadow flex items-center justify-center '}>
        <div className="flex">
             <Stack direction="row" spacing={2}>
             <Link href={'/'}>
                <Button>HOME</Button>
             </Link>
              <Link href={'/about'}>
                <Button onClick={fun}>ABOUT</Button>
             </Link>
             </Stack>
        </div>
    </div>
  )
}

export default Header