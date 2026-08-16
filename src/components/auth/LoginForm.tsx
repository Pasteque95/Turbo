"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import InputField from "./InputField";
import LoginButton from "./LoginButton";

type LoginFormProps = {
  onRegister: () => void;
};

export default function LoginForm({
  onRegister,
}: LoginFormProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!result || result.error) {
      setError("Invalid email or password.");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2.5"
    >
      <InputField
        type="email"
        name="email"
        placeholder="Email"
      />

      <InputField
        type="password"
        name="password"
        placeholder="Password"
      />

      {error && (
        <p className="text-center text-xs text-red-500">
          {error}
        </p>
      )}

      <div className="pt-1">
        <LoginButton>
          {loading ? "Logging in..." : "Login"}
        </LoginButton>
      </div>

      <div className="pt-1 text-center">
        <button
          type="button"
          className="
            text-xs
            text-zinc-400
            transition-colors
            duration-200
            hover:text-red-500
          "
        >
          Forgot password?
        </button>
      </div>

      <p className="text-center text-xs text-zinc-400">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onRegister}
          className="
            font-semibold
            text-red-500
            transition-colors
            duration-200
            hover:text-red-400
          "
        >
          Sign up
        </button>
      </p>
    </form>
  );
}