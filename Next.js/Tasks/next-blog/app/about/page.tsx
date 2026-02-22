import { RiQuillPenLine } from "react-icons/ri";

export default function AboutPage() {
  return (
    <div className="max-w-[800px] min-h-[80vh] mx-auto px-6 py-16">
      <div className="flex items-center gap-3 mb-6">
        <RiQuillPenLine size={36} className="text-[var(--primary)]" />
        <h1 className="text-3xl font-bold text-[var(--text-heading)]">About BlogApp</h1>
      </div>

      <p className="text-[var(--text-body)] text-lg leading-relaxed mb-10">
        A simple blogging platform.
      </p>

    </div>
  );
}