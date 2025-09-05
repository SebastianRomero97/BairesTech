import * as Yup from 'yup';
//definir la interfaz de los valores del formulario = login
export interface LoginFormValuesType{
    email: string;
    password: string;
}
//definir los valores iniciales de mi formulario
export const loginInitialValues: LoginFormValuesType ={
    email: "",
    password: "",
};

//esquema devalidacion para este formulario con YUP//
export const loginValidationSchema = Yup.object ({
email:Yup.string().email('Correo electronico invalido.').required("el correo electronico es requerido"),
password: Yup.string().min(6,"ls contraseña debe tener al menos 6 caracteres.").required("la contraseña es requerida.")
});

