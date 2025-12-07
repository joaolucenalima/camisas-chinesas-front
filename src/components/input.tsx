import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={props.id}>{label}</label>

      <input
        type="text"
        className="border border-zinc-500 bg-zinc-700 rounded h-10 min-w-36 py-1 px-4 
          hover:border-zinc-400 focus-visible:border-zinc-400 focus:outline-zinc-400
          disabled:text-zinc-400 disabled:bg-zinc-800 disabled:cursor-not-allowed disabled:border-zinc-600"
        {...props}
      />
    </div>
  );
}
