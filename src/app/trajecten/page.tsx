import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { deleteDrivingSession } from "@/app/actions/trajecten";

export default async function TrajectenPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userId = Number(session.user.id);

  const trajecten = await prisma.drivingSession.findMany({
    where: {
      userId,
    },
    orderBy: {
      startTime: "desc",
    },
  });

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
                  bg-red-600/10
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-red-500
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
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1 py-8 md:py-10">
          <div className="mx-auto w-[90%]">
            {/* Page header */}
            <div className="flex items-start justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Mijn trajecten
                </h1>

                <p className="mt-2 text-sm text-zinc-400">
                  Bekijk al je gereden trajecten.
                </p>
              </div>

              <Link
                href="/trajecten/nieuw"
                className="
                  inline-flex
                  shrink-0
                  items-center
                  rounded-lg
                  bg-red-600
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-red-600/10
                  transition-all
                  duration-200
                  hover:bg-red-500
                  hover:shadow-red-600/20
                "
              >
                <span className="mr-2 text-lg leading-none">+</span>
                Nieuw traject toevoegen
              </Link>
            </div>

            {/* Trajecten */}
            <div className="mt-8 w-full">
              {trajecten.length === 0 ? (
                <div
                  className="
                    flex
                    min-h-[160px]
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-zinc-800
                    bg-zinc-900/40
                    px-6
                    py-10
                    text-center
                  "
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-300">
                      Je hebt nog geen trajecten toegevoegd.
                    </p>

                    <p className="mt-2 text-sm text-zinc-500">
                      Voeg je eerste rijtraject toe om hier je geschiedenis
                      te bekijken.
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className="
                    w-full
                    overflow-hidden
                    rounded-xl
                    border
                    border-zinc-800
                    bg-zinc-900/40
                  "
                >
                  {/* Table header */}
                  <div
                    className="
                      grid
                      grid-cols-[1.4fr_1.4fr_0.8fr_0.9fr_1.2fr_0.8fr]
                      border-b
                      border-zinc-800
                      px-6
                      py-4
                      text-xs
                      font-medium
                      uppercase
                      tracking-wide
                      text-zinc-500
                    "
                  >
                    <span>Start</span>
                    <span>Einde</span>
                    <span>KM</span>
                    <span>Verkeer</span>
                    <span>Datum</span>
                    <span>Acties</span>
                  </div>

                  {/* Table rows */}
                  {trajecten.map((traject) => (
                    <div
                      key={traject.id}
                      className="
                        border-b
                        border-zinc-800/70
                        px-6
                        py-5
                        last:border-b-0
                        hover:bg-zinc-800/30
                      "
                    >
                      {/* Trajectgegevens */}
                      <div
                        className="
                          grid
                          grid-cols-[1.4fr_1.4fr_0.8fr_0.9fr_1.2fr_0.8fr]
                          items-center
                          text-sm
                        "
                      >
                        <div>
                          <p className="font-medium text-white">
                            {traject.startLocation}
                          </p>

                          <p className="mt-1 text-xs text-zinc-500">
                            {new Date(
                              traject.startTime
                            ).toLocaleTimeString("nl-BE", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>

                        <div>
                          <p className="font-medium text-white">
                            {traject.endLocation}
                          </p>

                          <p className="mt-1 text-xs text-zinc-500">
                            {new Date(
                              traject.endTime
                            ).toLocaleTimeString("nl-BE", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>

                        <span className="font-medium text-white">
                          {traject.distanceKm.toFixed(1)} km
                        </span>

                        <span className="text-zinc-300">
                          {traject.trafficLevel}
                        </span>

                        <span className="text-zinc-400">
                          {new Date(
                            traject.startTime
                          ).toLocaleDateString("nl-BE")}
                        </span>

                        {/* Acties */}
                        <div className="flex items-center gap-2">
                          {/* Bewerken */}
                          <Link
                            href={`/trajecten/${traject.id}/bewerken`}
                            className="
                              rounded-lg
                              px-3
                              py-2
                              text-xs
                              font-medium
                              text-zinc-400
                              transition-colors
                              hover:bg-zinc-800
                              hover:text-white
                            "
                          >
                            Bewerken
                          </Link>

                          {/* Verwijderen */}
                          <form action={deleteDrivingSession}>
                            <input
                              type="hidden"
                              name="sessionId"
                              value={traject.id}
                            />

                            <button
                              type="submit"
                              className="
                                rounded-lg
                                px-3
                                py-2
                                text-xs
                                font-medium
                                text-red-500
                                transition-colors
                                hover:bg-red-600/10
                                hover:text-red-400
                              "
                            >
                              Verwijderen
                            </button>
                          </form>
                        </div>
                      </div>

                      {/* Opmerking van de gids */}
                      {traject.guideComment && (
                        <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950/50 px-4 py-3">
                          <p className="text-xs font-medium text-zinc-500">
                            Opmerking van de gids
                          </p>

                          <p className="mt-1 text-sm text-zinc-300">
                            {traject.guideComment}
                          </p>
                        </div>
                      )}
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