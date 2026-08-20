import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-900">
      <div className="flex h-16 items-center px-8">
        <Link
          href="/dashboard"
          className="text-3xl font-bold text-red-600 transition-colors hover:text-red-500"
        >
          Turbo
        </Link>
      </div>
    </header>
  );
}