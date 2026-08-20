import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function NieuwTrajectPage() {
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
        <section className="flex-1 p-8 md:p-10">
          <div className="mx-auto w-full max-w-5xl">
            {/* Header */}
            <div>
              <Link
                href="/trajecten"
                className="text-sm text-zinc-500 transition-colors hover:text-white"
              >
                ← Terug naar trajecten
              </Link>

              <h1 className="mt-4 text-3xl font-bold tracking-tight">
                Nieuw traject
              </h1>

              <p className="mt-2 text-sm text-zinc-400">
                Voeg een nieuw gereden traject toe.
              </p>
            </div>

            {/* Form */}
            <form className="mt-8 space-y-6">
              {/* Locaties */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
                <h2 className="text-lg font-semibold">
                  Route
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Geef aan waar je traject begon en eindigde.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Startlocatie */}
                  <div>
                    <label
                      htmlFor="startLocation"
                      className="mb-2 block text-sm font-medium text-zinc-300"
                    >
                      Startlocatie
                    </label>

                    <input
                      id="startLocation"
                      name="startLocation"
                      type="text"
                      placeholder="Bijvoorbeeld Brussel"
                      className="
                        h-11
                        w-full
                        rounded-lg
                        border
                        border-zinc-700
                        bg-zinc-950
                        px-4
                        text-sm
                        text-white
                        placeholder:text-zinc-600
                        outline-none
                        transition-colors
                        focus:border-red-600
                        focus:ring-2
                        focus:ring-red-600/20
                      "
                    />
                  </div>

                  {/* Eindlocatie */}
                  <div>
                    <label
                      htmlFor="endLocation"
                      className="mb-2 block text-sm font-medium text-zinc-300"
                    >
                      Eindlocatie
                    </label>

                    <input
                      id="endLocation"
                      name="endLocation"
                      type="text"
                      placeholder="Bijvoorbeeld Leuven"
                      className="
                        h-11
                        w-full
                        rounded-lg
                        border
                        border-zinc-700
                        bg-zinc-950
                        px-4
                        text-sm
                        text-white
                        placeholder:text-zinc-600
                        outline-none
                        transition-colors
                        focus:border-red-600
                        focus:ring-2
                        focus:ring-red-600/20
                      "
                    />
                  </div>
                </div>
              </div>

              {/* Tijd */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
                <h2 className="text-lg font-semibold">
                  Tijd
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Wanneer ben je vertrokken en aangekomen?
                </p>

                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Starttijd */}
                  <div>
                    <label
                      htmlFor="startTime"
                      className="mb-2 block text-sm font-medium text-zinc-300"
                    >
                      Startuur
                    </label>

                    <input
                      id="startTime"
                      name="startTime"
                      type="datetime-local"
                      className="
                        h-11
                        w-full
                        rounded-lg
                        border
                        border-zinc-700
                        bg-zinc-950
                        px-4
                        text-sm
                        text-white
                        outline-none
                        transition-colors
                        focus:border-red-600
                        focus:ring-2
                        focus:ring-red-600/20
                      "
                    />
                  </div>

                  {/* Eindtijd */}
                  <div>
                    <label
                      htmlFor="endTime"
                      className="mb-2 block text-sm font-medium text-zinc-300"
                    >
                      Einduur
                    </label>

                    <input
                      id="endTime"
                      name="endTime"
                      type="datetime-local"
                      className="
                        h-11
                        w-full
                        rounded-lg
                        border
                        border-zinc-700
                        bg-zinc-950
                        px-4
                        text-sm
                        text-white
                        outline-none
                        transition-colors
                        focus:border-red-600
                        focus:ring-2
                        focus:ring-red-600/20
                      "
                    />
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
                <h2 className="text-lg font-semibold">
                  Rijgegevens
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Vul de belangrijkste gegevens van je traject in.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Kilometers */}
                  <div>
                    <label
                      htmlFor="distanceKm"
                      className="mb-2 block text-sm font-medium text-zinc-300"
                    >
                      Aantal kilometer
                    </label>

                    <div className="relative">
                      <input
                        id="distanceKm"
                        name="distanceKm"
                        type="number"
                        min="0"
                        step="0.1"
                        placeholder="Bijvoorbeeld 25.5"
                        className="
                          h-11
                          w-full
                          rounded-lg
                          border
                          border-zinc-700
                          bg-zinc-950
                          px-4
                          pr-12
                          text-sm
                          text-white
                          placeholder:text-zinc-600
                          outline-none
                          transition-colors
                          focus:border-red-600
                          focus:ring-2
                          focus:ring-red-600/20
                        "
                      />

                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                        km
                      </span>
                    </div>
                  </div>

                  {/* Verkeer */}
                  <div>
                    <label
                      htmlFor="trafficLevel"
                      className="mb-2 block text-sm font-medium text-zinc-300"
                    >
                      Verkeersomstandigheden
                    </label>

                    <select
                      id="trafficLevel"
                      name="trafficLevel"
                      defaultValue=""
                      className="
                        h-11
                        w-full
                        rounded-lg
                        border
                        border-zinc-700
                        bg-zinc-950
                        px-4
                        text-sm
                        text-white
                        outline-none
                        transition-colors
                        focus:border-red-600
                        focus:ring-2
                        focus:ring-red-600/20
                      "
                    >
                      <option value="" disabled>
                        Kies een niveau
                      </option>

                      <option value="laag">
                        Laag
                      </option>

                      <option value="middel">
                        Middel
                      </option>

                      <option value="hoog">
                        Hoog
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Opmerking */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
                <h2 className="text-lg font-semibold">
                  Opmerking van de gids
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Voeg eventueel een opmerking van je begeleider toe.
                </p>

                <textarea
                  id="guideComment"
                  name="guideComment"
                  rows={5}
                  placeholder="Bijvoorbeeld: goed gereden, maar extra aandacht besteden aan parkeren..."
                  className="
                    mt-6
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-zinc-700
                    bg-zinc-950
                    px-4
                    py-3
                    text-sm
                    text-white
                    placeholder:text-zinc-600
                    outline-none
                    transition-colors
                    focus:border-red-600
                    focus:ring-2
                    focus:ring-red-600/20
                  "
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">
                <Link
                  href="/trajecten"
                  className="
                    rounded-lg
                    border
                    border-zinc-700
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-zinc-300
                    transition-colors
                    hover:bg-zinc-800
                    hover:text-white
                  "
                >
                  Annuleren
                </Link>

                <button
                  type="submit"
                  className="
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
                  Traject opslaan
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}