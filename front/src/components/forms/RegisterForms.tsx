"use client";

import { registerUser } from "@/services/auth.services";
import {
  RegisterFormValuesType,
  registerInitialValues,
  registerValidationSchema,
} from "@/validators/registerSchema";
import { useFormik } from "formik";
import Button from "@/components/Ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { notifySuccess, notifyError } from "@/Alerts/notify";
import FormField from "@/components/forms/FormField";

function RegisterForm() {
  const router = useRouter();
  const qs = useSearchParams();
  const from = qs.get("from");

  const formik = useFormik<RegisterFormValuesType>({
    initialValues: registerInitialValues,
    validationSchema: registerValidationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await registerUser(values);
        notifySuccess("Cuenta creada. Iniciá sesión para continuar.");
        resetForm();
        router.replace(`/login${from ? `?from=${encodeURIComponent(from)}` : ""}`);
      } catch (e: any) {
        notifyError(e?.message || "No se pudo completar el registro");
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
      <FormField
        id="confirmPassword"
        name="confirmPassword"
        label="Confirmación de contraseña"
        type="password"
        formik={formik}
      />
      <FormField id="name" name="name" label="Nombre" type="text" formik={formik} />
      <FormField id="address" name="address" label="Dirección" type="text" formik={formik} />
      <FormField
        id="phone"
        name="phone"
        label="Teléfono"
        type="text"
        formik={formik}
        errorLines={2}   // por si el mensaje es más largo
      />

      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full mt-2"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Registrando..." : "Registrar"}
      </Button>
    </form>
  );
}

export default RegisterForm;
