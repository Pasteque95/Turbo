export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900">
      <div className="flex h-8 items-center justify-center">
        <p className="text-sm text-zinc-400">
          © {new Date().getFullYear()} Turbo
        </p>
      </div>
    </footer>
  );
}