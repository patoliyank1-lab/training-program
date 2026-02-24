import Link from "next/link";
import { RiQuillPenLine } from "react-icons/ri";

function Footer() {
    return (
        <footer className="sticky flex-col bg-(--surface-raised) border-t border-(--border) py-8 mt-auto">
            <div className="max-w-300 mx-auto px-6 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-(--primary)">
                    <RiQuillPenLine size={22} />
                    <span>BlogApp</span>
                </div>

                <nav aria-label="Footer links" className="flex gap-6">
                    <Link href="/" className="text-sm text-[var(--text-muted)] no-underline hover:text-[var(--primary)] transition-colors duration-200">Home</Link>
                    <Link href="/posts" className="text-sm text-(--text-muted) no-underline hover:text-(--primary) transition-colors duration-200">Posts</Link>
                    <Link href="/about" className="text-sm text-(--text-muted) no-underline hover:text-(--primary) transition-colors duration-200">About</Link>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;