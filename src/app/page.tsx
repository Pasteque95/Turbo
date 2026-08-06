import Image from "next/image";
import AuthCard from "@/components/auth/AuthCard";

export default function Home() {
  return (
    <section className="relative flex flex-1 items-center justify-center overflow-hidden bg-zinc-950">

      {/* Achtergrondauto */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <Image
          src="/images/logo.png"
          alt="Turbo auto"
          width={1356}
          height={600}
          priority
          className="
            w-[85vw]
            h-auto
            max-w-none
            translate-y-10
            opacity-90
            pointer-events-none
            select-none
          "
        />
      </div>

      {/* Loginkaart */}
      <div className="relative z-10">
        <AuthCard />
      </div>

    </section>
  );
}