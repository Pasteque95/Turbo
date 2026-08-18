import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/components/auth/LogoutButton";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="flex w-56 flex-col border-r border-zinc-800 bg-zinc-900/60">
          {/* Logo */}
          <div className="flex h-20 items-center border-b border-zinc-800 px-6">
            <h1 className="text-xl font-bold tracking-[0.2em] text-red-500">
              TURBO
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6">
            <div className="space-y-2">
              <Link
                href="/dashboard"
                className="
                  block
                  rounded-lg
                  bg-red-600/10
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-red-500
                "
              >
                Dashboard
              </Link>

              <Link
                href="/trajecten"
                className="
                  block
                  rounded-lg
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-zinc-400
                  transition-colors
                  hover:bg-zinc-800
                  hover:text-white
                "
              >
                Trajecten
              </Link>
            </div>
          </nav>

          {/* Bottom navigation */}
          <div className="border-t border-zinc-800 p-3">
            <Link
              href="/profiel"
              className="
                mb-2
                block
                rounded-lg
                px-4
                py-3
                text-sm
                font-medium
                text-zinc-400
                transition-colors
                hover:bg-zinc-800
                hover:text-white
              "
            >
              Profiel
            </Link>

            <LogoutButton />
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1 p-10">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold">
              Welkom, {session.user.firstName}
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Dit is jouw Turbo-dashboard.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}