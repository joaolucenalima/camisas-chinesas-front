export function Shirt({ image }: { image: string }) {
	return (
		<div className="border border-zinc-400 rounded w-52 shadow">
			<img src={`http://localhost:3333/download/${image}`} />

			<div className="text-sm p-2 overflow-ellipsis">
				<p>{image}</p>
			</div>
		</div>
	);
}
