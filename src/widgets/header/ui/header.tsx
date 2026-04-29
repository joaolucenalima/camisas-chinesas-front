import { useAuth } from "@/app/providers/auth/use-auth";
import { LoginForm } from "@/features/auth/ui/login-form";
import { UserCircleIcon } from "lucide-react";

export function Header() {
  const { user } = useAuth();

  return (
    <header className="h-12 px-6 flex items-center justify-between gap-2 border-b-2 border-b-border">
      <h1 className="font-medium">Camisas chinesas</h1>

      <div className="flex items-center gap-2">
        {user ? (
          <>
            <p className="text-sm">Olá, {user?.name}</p>
            <UserCircleIcon size={24} />
          </>
        ) : (
          <LoginForm />
        )}
      </div>
    </header>
  );
}
