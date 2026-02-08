import clsx from "clsx";

export function Card({ className, children }) {
  return (
    <div
      className={clsx(
        "bg-white border border-slate-200/70 rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
}
