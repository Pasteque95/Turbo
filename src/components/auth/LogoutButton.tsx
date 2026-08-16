"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="
        rounded-lg
        bg-red-600
        px-5
        py-2
        text-sm
        font-semibold
        text-white
        transition-colors
        hover:bg-red-700
      "
    >
      Logout
    </button>
  );
}