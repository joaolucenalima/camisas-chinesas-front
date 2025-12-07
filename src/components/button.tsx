import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "destructive";
};

export function Button({ variant = "primary", ...props }: ButtonProps) {
  const buttonVariants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-zinc-600 hover:bg-zinc-700",
    destructive: "bg-red-800 hover:bg-red-900",
  };

  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-2 text-lg font-semibold cursor-pointer rounded-lg px-6 py-2 text-white ${buttonVariants[variant]} transition-colors ${props.className}`}
    >
      {props.children}
    </button>
  );
}
