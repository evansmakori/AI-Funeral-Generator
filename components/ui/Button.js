import clsx from "clsx";

export function Button({ as: As = "button", variant = "primary", className, ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-300";

  const styles = {
    primary: "bg-slate-900 text-white hover:bg-slate-800",
    secondary: "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100"
  };

  return <As className={clsx(base, styles[variant], className)} {...props} />;
}
