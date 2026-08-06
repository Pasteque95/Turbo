import CardHeader from "./CardHeader";
import GlassBackground from "./GlassBackground";
import LoginForm from "./LoginForm";

export default function AuthCard() {
  return (
    <div
      className="
        relative
        w-[260px]
        overflow-hidden
        rounded-2xl
        border
        border-red-600/50
        bg-zinc-950/95
        px-6
        py-7
        shadow-[0_0_60px_-15px_rgba(220,38,38,0.6)]
      "
    >
      <GlassBackground />

      <div className="relative z-10">
        <CardHeader />

        <div className="mt-5">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}