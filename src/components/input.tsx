import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export function Input({ label, className, ...props }: InputProps) {
	return (
		<div
			className={`relative border border-zinc-600 rounded h-10 min-w-36 py-1 px-2 pl-4 hover:border-zinc-500 has-focus-visible:border-zinc-400 ${className}`}
		>
			<label className="absolute left-2 -top-3 bg-zinc-900 px-2 rounded text-sm">
				{label}
			</label>

			<input
				type="text"
				className="w-full h-full border-none bg-none focus:outline-none focus:ring-0"
				{...props}
			/>
		</div>
	);
}
