import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"

const NavLink = [
  { name: 'Home', link: '/' },
  { name: 'Jobs', link: '/jobs' },
  { name: 'About us', link: '/about' },
  { name: 'Contact us', link: '/contact' },
]

export function SheetDemo({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">{children}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          {NavLink.map((nav, index) => (
            <Link key={index} href={nav.link}>
              <Button variant="ghost" className="w-full justify-start hover:text-(--color-primary)">
                {nav.name}
              </Button>
            </Link>
          ))}
        </div>
        <SheetFooter>
          <Link href={'/login'}>
            <Button variant='outline' className="w-full">Sign in</Button>
          </Link>
          <Link href={'/register'}>
            <Button className="w-full">Get Started</Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
