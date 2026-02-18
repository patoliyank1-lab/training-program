"use client";
import { Stack } from "@mui/material"
import Button from '@mui/material/Button';
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

function Header() {

  const { logout } = useAuth()

  const fun = () => {

    logout();

  }




  return (
    <div className={'sticky top-0 w-full min-h-20 shadow flex items-center justify-center '}>
        <div className="flex">
             <Stack direction="row" spacing={2}>
             <Link href={'/'}>
                <Button>HOME</Button>
             </Link>
              <Link href={'/about'}>
                <Button>ABOUT</Button>
             </Link>
             <Link href={'/about'}>
                <Button onClick={fun}>Logout</Button>
             </Link>
             </Stack>
        </div>
    </div>
  )
}

export default Header