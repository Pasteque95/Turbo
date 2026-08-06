type LoginButtonProps = {
  children: React.ReactNode;
};

export default function LoginButton({
  children,
}: LoginButtonProps) {
  return (
    <button
      type="submit"
      className="
        h-9
        w-full
        rounded-lg
        bg-gradient-to-b
        from-red-600
        to-red-700
        text-xs
        font-bold
        text-white
        shadow-lg
        shadow-red-900/50
        transition-all
        duration-200
        hover:from-red-500
        hover:to-red-600
        active:scale-[0.98]
      "
    >
      {children}
    </button>
  );
}