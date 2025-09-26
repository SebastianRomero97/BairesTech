import LoginForm from "@/components/forms/LoginForms";

export default function LoginPage() {
  return (
    <main className="px-4 pt-16 md:pt-20">
      <div className="max-w-md mx-auto flex flex-col gap-16 md:gap-20">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Logueate para iniciar sesión
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}
