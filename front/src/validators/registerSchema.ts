import * as Yup from 'yup';

export interface RegisterFormValuesType{
    email: string;
    password:string;
    confirmPassword: string;
    name:string;
    address: string;
    phone: string;
    [key: string]: string;
};

export const registerInitialValues = {
    email:"",
    password:"",
    confirmPassword:"",
    name:"",
    address:"",
    phone:"",
};

export const registerValidationSchema = Yup.object({
    email:Yup.string().email('Correo electronico invalido.').required("el correo electronico es requerido"),
    password: Yup.string().min(6,"ls contraseña debe tener al menos 6 caracteres.").required("la contraseña es requerida."),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'las dos contraseñas deben coincidir.')
    .required("Confirmacion requerida"),
    name:Yup.string().required('el campo es obligatorio'),
    address: Yup.string().required("el campo es requerido."),
    phone: Yup.string().matches(
        /^(?:\+54\s?9?\s?\d{2,4}\s?\d{6,8}|\(?0?\d{2,4}\)?\s?\d{6,8})$/,
        "el telefono debe contener solo numeros y caracteres validos."
    ).required("el campo es obligatorio"),
})