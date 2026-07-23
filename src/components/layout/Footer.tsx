export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900">
      <div className="mx-auto max-w-7xl px-6 py-4 text-center text-sm text-zinc-400">
        © {new Date().getFullYear()} Turbo
      </div>
    </footer>
  );
}