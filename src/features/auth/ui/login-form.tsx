import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { useForm } from "react-hook-form";
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/ui/input";
import { Field, FieldError, FieldLabel } from "@/shared/ui/field";
import { InputGroup, InputGroupButton, InputGroupInput } from "@/shared/ui/input-group";
import { Eye, EyeClosed } from "lucide-react";
import { useAuth } from "@/app/providers/auth/use-auth";

const loginFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginFormType = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const { isAuthLoading, login, register: registerMutation } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  function onLoginSubmit(data: LoginFormType) {
    if (isRegisterMode) {
      registerMutation(data);
    } else {
      login(data);
    }

    setIsRegisterMode(false);
    setShowPassword(false);
    reset();
    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          setIsRegisterMode(false);
          setShowPassword(false);
          reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Fazer login</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isRegisterMode ? "Criar conta" : "Fazer login"}</DialogTitle>
          <DialogDescription>
            {isRegisterMode
              ? "Crie uma conta para participar e comprar camisas"
              : "Para participar e poder comprar camisas em conjunto"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onLoginSubmit)} className="flex flex-col gap-3">
          <Field>
            <FieldLabel htmlFor="name_input">Nome</FieldLabel>

            <Input id="name_input" autoComplete="off" {...register("name")} />

            {!!errors.name && (
              <FieldError className="text-destructive text-sm">{errors.name.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="password_input">Senha</FieldLabel>

            <InputGroup>
              <InputGroupInput
                id="password_input"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                {...register("password")}
              />
              <InputGroupButton onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <Eye /> : <EyeClosed />}
              </InputGroupButton>
            </InputGroup>

            {!!errors.password && (
              <FieldError className="text-destructive text-sm">
                {errors.password.message}
              </FieldError>
            )}
          </Field>

          <div className="flex items-center justify-between gap-3 mt-2">
            <p className="text-muted-foreground">
              {isRegisterMode ? "Já tem conta?" : "Ainda não tem conta?"}

              <button
                type="button"
                className="font-medium text-foreground ml-1 cursor-pointer hover:text-primary hover:underline transition-colors"
                onClick={() => {
                  setIsRegisterMode((prev) => !prev);
                  reset();
                }}
                disabled={isAuthLoading}
              >
                {isRegisterMode ? "Entrar" : "Cadastrar"}
              </button>
            </p>

            <Button type="submit" disabled={isAuthLoading}>
              {isRegisterMode ? "Cadastrar" : "Entrar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
