import Link from "next/link";

const NavLink = [
  { name: 'Home', link: '/' },
  { name: 'Jobs', link: '/jobs' },
  { name: 'About us', link: '/about' },
  { name: 'Contact us', link: '/contact' },
]

export default function Footer() {
  return (
    <footer className="w-ful">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col items-center gap-4">
        <nav className="flex items-center gap-6">
          {NavLink.map((link,index) => (
            <Link
              key={index}
              href={link.link}
              className="text-sm text-slate-500 hover:text-(--color-primary) font-semibold transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="w-full h-px bg-slate-200" />

        <p className="text-xs text-slate-400">© 2025 JobPortal. All rights reserved.</p>

      </div>
    </footer>
  );
}
