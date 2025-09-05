"use client";
import { LoginFormValuesType, loginInitialValues, loginValidationSchema } from "@/validators/loginSchema";
import { useFormik } from "formik";
import { useState } from "react";

function LoginForm() {
    const formik = useFormik<LoginFormValuesType>({
        initialValues: loginInitialValues,
        validationSchema: loginValidationSchema,
        onSubmit: () => {
            console.log("login exitoso")
        },
    });
    return(
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <label htmlFor=""> e-mail</label>
            <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            { formik.errors.email && formik.touched.email ? (
                <p className="text-red-600">
                    {formik.errors.email}
                </p>
                ) : null}

            <label htmlFor="password">Constraseña</label>
            <input 
            id="password"
            name="password"
            type="password"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
                <p id="password-error" className="text-red-600">
                    {formik.errors.password}
                </p>
                ) : null }


        <button type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "iniciando sesión..." : "Iniciar sesión"}</button>
        </form>
    );
}
export default LoginForm;