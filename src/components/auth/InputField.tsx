"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";

type InputFieldProps = {
  type: "text" | "email" | "password";
  name: string;
  placeholder: string;
};

export default function InputField({
  type,
  name,
  placeholder,
}: InputFieldProps) {
  const isPassword = type === "password";

  const [showPassword, setShowPassword] =
    useState(false);

  const getIcon = () => {
    if (isPassword) {
      return showPassword ? (
        <Eye size={14} />
      ) : (
        <EyeOff size={14} />
      );
    }

    if (type === "email") {
      return <Mail size={14} />;
    }

    return <User size={14} />;
  };

  return (
    <div className="group relative">
      <span
        className="
          pointer-events-none
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-zinc-400
          transition-colors
          duration-200
          group-focus-within:text-red-500
        "
      >
        {getIcon()}
      </span>

      <input
        type={
          isPassword && showPassword
            ? "text"
            : type
        }
        name={name}
        placeholder={placeholder}
        className="
          h-9
          w-full
          rounded-lg
          border
          border-zinc-700/60
          bg-zinc-900/60
          pl-9
          pr-9
          text-xs
          text-white
          placeholder:text-zinc-500
          outline-none
          transition-all
          duration-200
          focus:border-red-600
          focus:ring-2
          focus:ring-red-600/20
        "
      />

      {isPassword && (
        <button
          type="button"
          onClick={() =>
            setShowPassword((prev) => !prev)
          }
          aria-label={
            showPassword
              ? "Hide password"
              : "Show password"
          }
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-zinc-400
            transition-colors
            duration-200
            hover:text-white
          "
        >
          {showPassword ? (
            <EyeOff size={14} />
          ) : (
            <Eye size={14} />
          )}
        </button>
      )}
    </div>
  );
}