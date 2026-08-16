import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-10 text-white">
      <h1 className="text-3xl font-bold">
        Welcome to Turbo
      </h1>

      <p className="mt-4 text-zinc-400">
        You are logged in.
      </p>

      <p className="mt-2 text-zinc-400">
        Welcome, {session.user.firstName}.
      </p>

      <div className="mt-6">
        <LogoutButton />
      </div>
    </main>
  );
}