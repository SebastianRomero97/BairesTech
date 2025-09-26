import RegisterForm from "@/components/forms/RegisterForms";
import { H3 } from "@/components/Ui/typography";

export default function RegisterPage() {
  return (
    <main className="px-4 pt-16 md:pt-20">
      <div className="max-w-md mx-auto flex flex-col gap-16 md:gap-20">
        <H3 className="text-2xl font-bold text-center">
          Regístrate para iniciar sesión
        </H3>
        <RegisterForm />
      </div>
    </main>
  );
}
