"use client"

import { registerUser } from "@/services/auth.services";
import { RegisterFormValuesType, registerInitialValues, registerValidationSchema } from "@/validators/registerSchema";
import {useFormik} from "formik"
import Button from "@/components/Ui/button";


function RegisterForm(){


    const formik = useFormik<RegisterFormValuesType>({
        initialValues: registerInitialValues,
        validationSchema: registerValidationSchema,
        onSubmit: async(values, { resetForm}) => {
            const response = await registerUser(values)
        console.log("registro Procesado , con respuesta del sercer", response);
        resetForm();
        }
    })



    return(
     <form
        onSubmit={formik.handleSubmit}
         className="max-w-md mx-auto p-6 rounded-xl shadow-lg bg-[var(--card-bg)] border border-[var(--card-border)] space-y-4 "
        >
        <label htmlFor="email" className="label">e-mail</label>
        <input id="email" name="email" type="email"  className={`input ${
            formik.errors.email && formik.touched.email ? "input-error" : ""
          }`} value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.email ? <p className="error-text">{formik.errors.email}</p> : null}   



         <label htmlFor="password" className="label">Constrasena</label>
        <input id="password" name="password" type="password"  className={`input ${
            formik.errors.password && formik.touched.password
              ? "input-error"
              : ""
          }`}  value={formik.values.password} onChange={formik.handleChange} />
        {formik.errors.password ? <p  className="error-text">{formik.errors.password}</p> : null}



        <label htmlFor="password" className="label">Confirmacion de contrasena</label>
        <input id="confirmPassword" name="confirmPassword" type="password"  className={`input ${
            formik.errors.confirmPassword && formik.touched.confirmPassword
              ? "input-error"
              : ""
          }`} value={formik.values.confirmPassword} onChange={formik.handleChange} />
        {formik.errors.confirmPassword ? <p className="error-text">{formik.errors.confirmPassword}</p> : null}



         <label htmlFor="name" className="label">Nombre</label>
        <input id="name" name="name" type="name"  className={`input ${
            formik.errors.name && formik.touched.name ? "input-error" : ""
          }`} value={formik.values.name} onChange={formik.handleChange} />
        {formik.errors.name ? <p className="error-text">{formik.errors.name}</p> : null}



         <label htmlFor="address" className="label">Direccion</label>
        <input id="address" name="address" type="string" className={`input ${
            formik.errors.address && formik.touched.address
              ? "input-error"
              : ""
          }`} value={formik.values.address} onChange={formik.handleChange}  />
        {formik.errors.address ? <p className="error-text">{formik.errors.address}</p> : null}



         <label htmlFor="phone" className="label">Telefono</label>
        <input id="phone" name="phone" type="string"  className={`input ${
            formik.errors.phone && formik.touched.phone ? "input-error" : ""
          }`} value={formik.values.phone} onChange={formik.handleChange} />
        {formik.errors.phone ? <p className="error-text">{formik.errors.phone}</p> : null}



        <Button type="submit" variant="primary" size="md" className="w-full" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Registrando..." : "Registrar"}
        </Button>
    
    </form>
    );

}

export default RegisterForm;