import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userId = Number(session.user.id);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      provisionalLicenseAt: true,
    },
  });

  if (!user) {
    redirect("/");
  }

  const drivingStats = await prisma.drivingSession.aggregate({
    where: {
      userId,
    },
    _sum: {
      distanceKm: true,
    },
    _count: {
      id: true,
    },
  });

  const totalKm = drivingStats._sum.distanceKm ?? 0;
  const totalSessions = drivingStats._count.id;

  const recentSessions = await prisma.drivingSession.findMany({
    where: {
      userId,
    },
    orderBy: {
      startTime: "desc",
    },
    take: 5,
  });

  const now = new Date();
  const licenseDate = new Date(user.provisionalLicenseAt);

  let monthsDriving =
    (now.getFullYear() - licenseDate.getFullYear()) * 12 +
    (now.getMonth() - licenseDate.getMonth());

  if (now.getDate() < licenseDate.getDate()) {
    monthsDriving--;
  }

  monthsDriving = Math.max(monthsDriving, 0);

  const minimumReached = monthsDriving >= 9;

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

            {/* Statistics */}
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Kilometers */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                <p className="text-sm text-zinc-400">
                  Gereden kilometers
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {totalKm.toFixed(1)}{" "}
                  <span className="text-sm font-normal text-zinc-500">
                    / 1500 KM
                  </span>
                </p>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-red-600"
                    style={{
                      width: `${Math.min((totalKm / 1500) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Rijperiode */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                <p className="text-sm text-zinc-400">
                  Rijperiode
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {monthsDriving}{" "}
                  <span className="text-sm font-normal text-zinc-500">
                    maanden
                  </span>
                </p>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-red-600"
                    style={{
                      width: `${Math.min((monthsDriving / 9) * 100, 100)}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-xs text-zinc-500">
                  {minimumReached
                    ? "Minimum van 9 maanden bereikt"
                    : `${9 - monthsDriving} maanden tot het minimum`}
                </p>
              </div>

              {/* Trajecten */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                <p className="text-sm text-zinc-400">
                  Trajecten
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {totalSessions}
                </p>

                <p className="mt-4 text-xs text-zinc-500">
                  Opgeslagen rijtrajecten
                </p>
              </div>
            </div>

            {/* Recente trajecten */}
            <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                <div>
                  <h3 className="font-semibold">
                    Recente trajecten
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500">
                    Je laatste opgeslagen rijtrajecten
                  </p>
                </div>

                <Link
                  href="/trajecten"
                  className="
                    text-xs
                    font-medium
                    text-red-500
                    transition-colors
                    hover:text-red-400
                  "
                >
                  Alle trajecten
                </Link>
              </div>

              {recentSessions.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm text-zinc-400">
                    Je hebt nog geen trajecten toegevoegd.
                  </p>

                  <Link
                    href="/trajecten"
                    className="
                      mt-3
                      inline-block
                      text-xs
                      font-medium
                      text-red-500
                      transition-colors
                      hover:text-red-400
                    "
                  >
                    Eerste traject toevoegen
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-zinc-800">
                  {recentSessions.map((session) => (
                    <div
                      key={session.id}
                      className="
                        grid
                        grid-cols-4
                        gap-4
                        px-5
                        py-4
                        text-sm
                      "
                    >
                      <div>
                        <p className="text-xs text-zinc-500">
                          Start
                        </p>

                        <p className="mt-1 text-zinc-200">
                          {session.startLocation}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-500">
                          Eind
                        </p>

                        <p className="mt-1 text-zinc-200">
                          {session.endLocation}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-500">
                          Afstand
                        </p>

                        <p className="mt-1 text-zinc-200">
                          {session.distanceKm.toFixed(1)} km
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-500">
                          Datum
                        </p>

                        <p className="mt-1 text-zinc-200">
                          {new Intl.DateTimeFormat("nl-BE", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }).format(session.startTime)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}