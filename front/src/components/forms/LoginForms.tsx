"use client";
import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/services/auth.services";
import { LoginFormValuesType, loginInitialValues, loginValidationSchema } from "@/validators/loginSchema";
import { useFormik } from "formik";
import Button from "@/components/Ui/button";
import Link from "next/link";

function LoginForm() {
    const {setDataUser} = useAuth()

    const formik = useFormik<LoginFormValuesType>({
        initialValues: loginInitialValues,
        validationSchema: loginValidationSchema,
        onSubmit: async (values, {resetForm}) => {
            const response = await loginUser(values)
            setDataUser(response)
            console.log('login exitoso con respuesta del servidor', response)
            resetForm();
        },
    });
    return(
        <form  onSubmit={formik.handleSubmit} 
         className="max-w-md mx-auto p-6 rounded-xl shadow-lg bg-[var(--card-bg)] border border-[var(--card-border)] space-y-5">
            <label htmlFor="email" className="label"> e-mail</label>
            <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`input ${
            formik.errors.email && formik.touched.email ? "input-error" : ""
          }`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            { formik.errors.email && formik.touched.email ? (
                <p className="error-text">
                    {formik.errors.email}
                </p>
                ) : null}

            <label htmlFor="password" className="label">Constraseña</label>
            <input 
            id="password"
            name="password"
            type="password"
            required
            className={`input ${
            formik.errors.password && formik.touched.password
              ? "input-error"
              : ""
          }`}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
                <p id="password-error" className="error-text">
                    {formik.errors.password}
                </p>
                ) : null }


        <Button type="submit" variant="primary" size="md" className="w-full" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "iniciando sesión..." : "Iniciar sesión"}</Button>
        </form>
    );
}
export default LoginForm;