export default function Footer() {
  return (
    <footer className="w-full">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col items-center gap-4">
        <nav className="flex items-center gap-6">
          {["Home", "Jobs", "About", "Contact Us"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-slate-500 hover:text-(--color-primary) font-semibold transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="w-full h-px bg-slate-200" />

        <p className="text-xs text-slate-400">© 2025 JobPortal. All rights reserved.</p>

      </div>
    </footer>
  );
}
