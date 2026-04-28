import { UserCircleIcon } from "lucide-react";

export function Header() {
  return (
    <header className="py-4 px-6 flex items-center justify-between gap-2">
      <h1>Camisas chinesas</h1>

      <div className="flex items-center gap-3">
        <p className="text-sm">Olá, João</p>
        <UserCircleIcon size={24} />
      </div>
    </header>
  );
}
