import * as Yup from 'yup';

export interface LoginFormValuesType{
    email: string;
    password: string;
    [key: string]: string;
}

export const loginInitialValues: LoginFormValuesType ={
    email: "",
    password: "",
};


export const loginValidationSchema = Yup.object ({
email:Yup.string().email('Correo electronico invalido.').required("el correo electronico es requerido"),
password: Yup.string().min(6,"ls contraseña debe tener al menos 6 caracteres.").required("la contraseña es requerida.")
});

