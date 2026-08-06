import InputField from "./InputField";
import LoginButton from "./LoginButton";

export default function LoginForm() {
  return (
    <form className="space-y-2.5">
      <InputField type="email" name="email" placeholder="Email" />
      <InputField type="password" name="password" placeholder="Password" />

      <div className="pt-1">
        <LoginButton>Login</LoginButton>
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