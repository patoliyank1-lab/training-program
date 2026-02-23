"use client";
import Link from "next/link";
import clsx from "clsx";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { RiQuillPenLine, RiSunLine, RiMoonLine } from "react-icons/ri";
import Image from "next/image";

function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const { mode, toggleTheme } = useTheme();

  const isDark = mode === "dark";

  return (
    <header className="sticky top-0 z-50 bg-(--surface) border-b border-(--border) shadow-sm">
      <div className="max-w-300 mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-(--primary) no-underline"
        >
          <RiQuillPenLine size={28} />
          <span>BlogApp</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-[0.95rem] text-(--text-body) no-underline hover:text-(--primary) transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/posts"
            className="text-[0.95rem] text-(--text-body) no-underline hover:text-(--primary) transition-colors duration-200"
          >
            Posts
          </Link>
          <Link
            href="/about"
            className="text-[0.95rem] text-(--text-body) no-underline hover:text-(--primary) transition-colors duration-200"
          >
            About
          </Link>

          <button
            onClick={toggleTheme}
            className={clsx(
              "p-2 rounded-full transition-all duration-200 cursor-pointer",
              isDark
                ? "bg-(--surface-overlay) text-yellow-400 hover:bg-(--border)"
                : "bg-(--background-muted)-[var(--primary)] hover:bg-(--border)",
            )}
            aria-label="Toggle theme"
          >
            {isDark ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                href="/user"
                className="text-[0.95rem] text-(--text-body) no-underline hover:text-(--primary) transition-colors duration-200"
              >
                <Image
                  src={user ? user.avatar : ''}
                  width={30}
                  height={30}
                  className="rounded-full overflow-hidden size-9"
                  alt="Picture of the author"
                />
              </Link>
              <button
                onClick={logout}
                className="text-sm px-4 py-1.5 rounded-md border border-(--primary) text-(--primary) bg-transparent cursor-pointer transition-all duration-200 hover:bg-(--primary) hover:text-(--primary-text)"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm px-4 py-1.5 rounded-md border border-(--primary) bg-(--primary) text-(--primary-text) no-underline transition-all duration-200 hover:bg-(--primary-hover)"
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
