import { LoginFormValuesType } from "@/validators/loginSchema";
import { RegisterFormValuesType } from "@/validators/registerSchema";

export const registerUser = async (userData: RegisterFormValuesType) => {
try {
    const response = await fetch(`http://localhost:3007/users/register`,{
        method: 'POST',
        headers: {
            'content-type': "application/json",
        },
        body: JSON.stringify(userData),
    });
    if(response.ok){
        return response.json()
    }else{
        //agregar alerta(Upss!  no se pudo generar tu registro)
        throw new Error('registro fallido')
    }
} catch (error: any) {
    throw new Error (error);
}
};

export const loginUser = async (userData: LoginFormValuesType) => {
    try {
        const response = await fetch (`http://localhost:3007/users/login`, {
            method:'POST',
            headers: {
            'content-type': "application/json",
        },
        body: JSON.stringify(userData),
    });
          if(response.ok){
        return response.json()
    }else{
        //agregar alerta(Upss!  no se pudo generar tu registro)
        throw new Error('registro fallido');
    }
    } catch (error:any) {
        throw new Error(error);
    }
};