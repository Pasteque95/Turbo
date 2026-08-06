export default function GlassBackground() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        bottom-0
        left-1/2
        h-36
        w-36
        -translate-x-1/2
        translate-y-1/2
        rounded-full
        bg-red-600/25
        blur-2xl
      "
    />
  );
}