import { MdMenu } from "react-icons/md";
import { Button } from "../ui/button";
import { HeaderLogo } from "./logo";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { SheetDemo } from "./nav-sheet";

const NavLink  = [
    {name:'Home', link:'/'},
    {name:'Jobs', link:'/jobs'},
    {name:'About us', link:'/about'},
    {name:'Contact us', link:'/contact'},
]
function Header() {
  return (
    <header className="w-full border-b bg-background sticky top-0">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <div className="overflow-hidden">
          <HeaderLogo />
        </div>
        <div className="hidden md:inline-flex">
          {NavLink.map((nav,index) => (
            <Link key={index} href={nav.link}>
                <Button variant={'ghost'} className="hover:text-(--color-primary)">
                    {nav.name}
                </Button>
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-1 md:flex">
          <Link href={'/login'}>
          <Button variant='outline'>Sign in</Button>
          </Link>
          <Link href={'/register'}>
          <Button>Get Started</Button>
          </Link>
          <ModeToggle />
        </div>
        <div className="flex gap-2 md:hidden">
          <ModeToggle />
          <SheetDemo>
          <MdMenu className="size-6" />
          </SheetDemo>
          <span className="sr-only">Open Menu</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
