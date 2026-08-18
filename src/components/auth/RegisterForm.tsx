"use client";

import { useState } from "react";
import InputField from "./InputField";
import LoginButton from "./LoginButton";
import { registerUser } from "@/app/actions/auth";

type RegisterFormProps = {
  onLogin: () => void;
};

export default function RegisterForm({
  onLogin,
}: RegisterFormProps) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage("");

    const result = await registerUser(formData);

    setMessage(result.message);
    setLoading(false);
  }

  return (
    <form action={handleSubmit} className="space-y-2.5">
      <InputField
        type="text"
        name="firstName"
        placeholder="First name"
      />

      <InputField
        type="text"
        name="lastName"
        placeholder="Last name"
      />

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

      <InputField
        type="date"
        name="provisionalLicenseAt"
        placeholder="Provisional license date"
      />

      {message && (
        <p className="text-center text-xs text-zinc-400">
          {message}
        </p>
      )}

      <div className="pt-1">
        <LoginButton>
          {loading ? "Creating account..." : "Sign up"}
        </LoginButton>
      </div>

      <p className="text-center text-xs text-zinc-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onLogin}
          className="
            font-semibold
            text-red-500
            transition-colors
            duration-200
            hover:text-red-400
          "
        >
          Login
        </button>
      </p>
    </form>
  );
}