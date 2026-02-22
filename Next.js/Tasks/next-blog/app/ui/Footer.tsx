import Link from "next/link";
import { RiQuillPenLine } from "react-icons/ri";

function Footer() {
    return (
        <footer className="bg-[var(--surface-raised)] border-t border-[var(--border)] py-8 mt-auto">
            <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-[var(--primary)]">
                    <RiQuillPenLine size={22} />
                    <span>BlogApp</span>
                </div>

                <nav className="flex gap-6">
                    <Link href="/" className="text-sm text-[var(--text-muted)] no-underline hover:text-[var(--primary)] transition-colors duration-200">Home</Link>
                    <Link href="/posts" className="text-sm text-[var(--text-muted)] no-underline hover:text-[var(--primary)] transition-colors duration-200">Posts</Link>
                    <Link href="/about" className="text-sm text-[var(--text-muted)] no-underline hover:text-[var(--primary)] transition-colors duration-200">About</Link>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;