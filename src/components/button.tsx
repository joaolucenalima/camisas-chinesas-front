import type { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="flex items-center gap-2 text-lg font-semibold cursor-pointer rounded-lg self-end px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors"
    >
      {props.children}
    </button>
  );
}
