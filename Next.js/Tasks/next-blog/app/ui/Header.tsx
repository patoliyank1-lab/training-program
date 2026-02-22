'use client';
import Link from "next/link";
import clsx from "clsx";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { RiQuillPenLine, RiSunLine, RiMoonLine } from "react-icons/ri";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const { mode, toggleTheme } = useTheme();

  const isDark = mode === 'dark';

  return (
    <header className="sticky top-0 z-50 bg-[var(--surface)] border-b border-[var(--border)] shadow-sm">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[var(--primary)] no-underline">
          <RiQuillPenLine size={28} />
          <span>BlogApp</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-[0.95rem] text-[var(--text-body)] no-underline hover:text-[var(--primary)] transition-colors duration-200">Home</Link>
          <Link href="/posts" className="text-[0.95rem] text-[var(--text-body)] no-underline hover:text-[var(--primary)] transition-colors duration-200">Posts</Link>
          <Link href="/about" className="text-[0.95rem] text-[var(--text-body)] no-underline hover:text-[var(--primary)] transition-colors duration-200">About</Link>

          <button
            onClick={toggleTheme}
            className={clsx(
              "p-2 rounded-full transition-all duration-200 cursor-pointer",
              isDark
                ? "bg-[var(--surface-overlay)] text-yellow-400 hover:bg-[var(--border)]"
                : "bg-[var(--background-muted)] text-[var(--primary)] hover:bg-[var(--border)]"
            )}
            aria-label="Toggle theme"
          >
            {isDark ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
          </button>

          {isAuthenticated ? (
            <>
              <Link href="/user" className="text-[0.95rem] text-[var(--text-body)] no-underline hover:text-[var(--primary)] transition-colors duration-200">Profile</Link>
              <button
                onClick={logout}
                className="text-sm px-4 py-1.5 rounded-md border border-[var(--primary)] text-[var(--primary)] bg-transparent cursor-pointer transition-all duration-200 hover:bg-[var(--primary)] hover:text-[var(--primary-text)]"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm px-4 py-1.5 rounded-md border border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-text)] no-underline transition-all duration-200 hover:bg-[var(--primary-hover)]"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;