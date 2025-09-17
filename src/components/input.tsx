import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export function Input({ label, className, ...props }: InputProps) {
	return (
		<div
			className={`relative border border-zinc-400 rounded h-10 min-w-36 py-1 px-2 pl-4 ${className}`}
		>
			<label className="absolute left-2 -top-3 bg-white px-2 rounded text-sm">
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
