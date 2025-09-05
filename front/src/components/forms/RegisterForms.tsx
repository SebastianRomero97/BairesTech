"use client"

import { RegisterFormValuesType, registerInitialValues, registerValidationSchema } from "@/validators/registerSchema";
import {useFormik} from "formik"
function RegisterForm(){


    const formik = useFormik<RegisterFormValuesType>({
        initialValues: registerInitialValues,
        validationSchema: registerValidationSchema,
        onSubmit: () => {
            console.log("usuario registrado")
        }
    })



    return(
     <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        <label htmlFor="email">e-mail</label>
        <input id="email" name="email" type="email" value={formik.values.email} onChange={formik.handleChange}/>
        {formik.errors.email ? <p>{formik.errors.email}</p> : null}   

         <label htmlFor="password">Constrasena</label>
        <input id="password" name="password" type="password" value={formik.values.password} onChange={formik.handleChange}/>
        {formik.errors.password ? <p>{formik.errors.password}</p> : null}

        <label htmlFor="password">Confirmacion de contrasena</label>
        <input id="confirmPassword" name="confirmPassword" type="password" value={formik.values.confirmPassword} onChange={formik.handleChange}/>
        {formik.errors.confirmPassword ? <p>{formik.errors.confirmPassword}</p> : null}

         <label htmlFor="name">Nombre</label>
        <input id="name" name="name" type="name" value={formik.values.name} onChange={formik.handleChange}/>
        {formik.errors.name ? <p>{formik.errors.name}</p> : null}

         <label htmlFor="address">Direccion</label>
        <input id="address" name="address" type="string" value={formik.values.address} onChange={formik.handleChange}/>
        {formik.errors.address ? <p>{formik.errors.address}</p> : null}

         <label htmlFor="phone">Telefono</label>
        <input id="phone" name="phone" type="string" value={formik.values.phone} onChange={formik.handleChange}/>
        {formik.errors.phone ? <p>{formik.errors.phone}</p> : null}

        <button type="submit"disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Registrando..." : "Registrar"}
        </button>
    </form>
    );

}

export default RegisterForm;