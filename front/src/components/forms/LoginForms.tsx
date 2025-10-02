"use client";
import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/services/auth.services"; 
import {
  LoginFormValuesType,
  loginInitialValues,
  loginValidationSchema,
} from "@/validators/loginSchema";
import { useFormik } from "formik";
import Button from "@/components/Ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { notifySuccess, notifyError } from "@/Alerts/notify";
import FormField from "@/components/forms/FormField";

function LoginForm() {
  const { setDataUser } = useAuth();
  const router = useRouter();
  const qs = useSearchParams();
  const from = qs.get("from");
  const setAuthFlag = () => {
    const maxAge = 60 * 60 * 24 * 7;
    document.cookie = `bt_auth=1; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
  };

const hasMessage = (e: unknown): e is { message: string } => {
    return typeof e === 'object' && e !== null && 'message' in e;
};
  const formik = useFormik<LoginFormValuesType>({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const res = await loginUser(values);
        setDataUser({ ...res.user, token: res.token });
        setAuthFlag();
        notifySuccess("Sesión iniciada");
        resetForm();
        router.replace(from || "/home");
    } catch (e: unknown) {
 notifyError(hasMessage(e) ? e.message : "Credenciales inválidas");
} finally {
       setSubmitting(false);
     }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto p-6 md:p-8 rounded-xl shadow-lg bg-[var(--card-bg)] border border-[var(--card-border)]"
    >
      <FormField id="email" name="email" label="E-mail" type="email" formik={formik} />
      <FormField id="password" name="password" label="Contraseña" type="password" formik={formik} />

      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full mt-2"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>

      <p className="mt-4 text-sm text-center text-[color:var(--fg)/.75]">
        ¿No tenés cuenta?{" "}
        <Link
          href={`/register${from ? `?from=${encodeURIComponent(from)}` : ""}`}
          className="link"
        >
          Registrate
        </Link>
      </p>
    </form>
  );
}
export default LoginForm;
