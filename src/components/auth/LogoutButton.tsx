"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="
        w-full
        rounded-lg
        px-4
        py-3
        text-left
        text-sm
        font-medium
        text-zinc-400
        transition-colors
        hover:bg-red-600/10
        hover:text-red-500
      "
    >
      Uitloggen
    </button>
  );
}