import type { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="flex items-center gap-2 text-lg cursor-pointer rounded self-end px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 transition-colors"
    >
      {props.children}
    </button>
  );
}
