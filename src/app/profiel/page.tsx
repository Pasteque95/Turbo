import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function ProfielPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="flex w-56 flex-col border-r border-zinc-800 bg-zinc-900/60">
          <nav className="flex-1 px-3 py-6">
            <div className="space-y-2">
              <Link
                href="/dashboard"
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

          <div className="border-t border-zinc-800 p-3">
            <Link
              href="/profiel"
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
              Profiel
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1 py-8 md:py-10">
          <div className="mx-auto w-[90%] max-w-5xl">
            <h1 className="text-3xl font-bold tracking-tight">
              Mijn profiel
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Bekijk je accountgegevens en beheer je account.
            </p>

            {/* Accountgegevens */}
            <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
              <h2 className="text-lg font-semibold">
                Accountgegevens
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-zinc-500">
                    Voornaam
                  </p>

                  <p className="mt-1 text-sm text-zinc-200">
                    {session.user.firstName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-zinc-500">
                    Achternaam
                  </p>

                  <p className="mt-1 text-sm text-zinc-200">
                    {session.user.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-zinc-500">
                    E-mailadres
                  </p>

                  <p className="mt-1 text-sm text-zinc-200">
                    {session.user.email ?? "Geen e-mailadres"}
                  </p>
                </div>
              </div>
            </div>

            {/* Accountbeheer */}
            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
              <h2 className="text-lg font-semibold">
                Accountbeheer
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Je wordt uitgelogd en teruggestuurd naar de startpagina.
              </p>

              <div className="mt-5">
                <LogoutButton />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}