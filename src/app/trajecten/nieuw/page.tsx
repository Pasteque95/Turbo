import Link from "next/link";
import { createDrivingSession } from "@/app/actions/trajecten";

export default function NieuwTrajectPage() {
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
                Registreer een nieuw gereden traject.
              </p>
            </div>

            {/* Formulier */}
            <form 
              action={createDrivingSession}
              className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                      outline-none
                      transition-colors
                      placeholder:text-zinc-600
                      focus:border-red-600
                    "
                  />
                </div>

                {/* Startuur */}
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
                      outline-none
                      transition-colors
                      placeholder:text-zinc-600
                      focus:border-red-600
                    "
                  />
                </div>

                {/* Einduur */}
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
                    "
                  />
                </div>

                {/* Aantal km */}
                <div>
                  <label
                    htmlFor="distanceKm"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Aantal kilometer
                  </label>

                  <input
                    id="distanceKm"
                    name="distanceKm"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="Bijvoorbeeld 24.5"
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
                      placeholder:text-zinc-600
                      focus:border-red-600
                    "
                  />
                </div>

                {/* Verkeersomstandigheden */}
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
                    "
                  >
                    <option value="" disabled>
                      Kies verkeersomstandigheden
                    </option>
                    <option value="laag">Laag</option>
                    <option value="middel">Middel</option>
                    <option value="hoog">Hoog</option>
                  </select>
                </div>
              </div>

              {/* Opmerking */}
              <div className="mt-6">
                <label
                  htmlFor="guideComment"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Opmerking van de gids
                </label>

                <textarea
                  id="guideComment"
                  name="guideComment"
                  rows={5}
                  placeholder="Eventuele opmerkingen over dit traject..."
                  className="
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
                    outline-none
                    transition-colors
                    placeholder:text-zinc-600
                    focus:border-red-600
                  "
                />
              </div>

              {/* Knoppen */}
              <div className="mt-8 flex items-center justify-end gap-3 border-t border-zinc-800 pt-6">
                <Link
                  href="/trajecten"
                  className="
                    rounded-lg
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-zinc-400
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
                    transition-colors
                    hover:bg-red-500
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