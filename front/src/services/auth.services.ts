import { LoginFormValuesType } from "@/validators/loginSchema";
import { RegisterFormValuesType } from "@/validators/registerSchema";
import { userSessionInterface } from "@/interfaces/userSession.interface";

const hasMessage = (e: unknown): e is { message: string } => {
    return typeof e === 'object' && e !== null && 'message' in e;
};

export const registerUser = async (userData: RegisterFormValuesType): Promise<userSessionInterface> => {
try {
    const response = await fetch(`http://localhost:3007/users/register`,{
        method: 'POST',
        headers: {
            'content-type': "application/json",
        },
        body: JSON.stringify(userData),
    });
    if(response.ok){
        return response.json() as Promise<userSessionInterface>;
    }else{
        const errorData = await response.json();
            throw new Error(errorData.message || 'Registro fallido');
    }
} catch (error: unknown) { 
        const errorMessage = hasMessage(error) ? error.message : "Error desconocido al registrar.";
        throw new Error(errorMessage);
    }
};

export const loginUser = async (userData: LoginFormValuesType): Promise<userSessionInterface> => {
    try {
        const response = await fetch (`http://localhost:3007/users/login`, {
            method:'POST',
            headers: {
            'content-type': "application/json",
        },
        body: JSON.stringify(userData),
    });
          if(response.ok){
        return response.json() as Promise<userSessionInterface>;
    }else{
        const errorData = await response.json();
            throw new Error(errorData.message || 'Inicio de sesión fallido');
    }
    } catch (error: unknown) { 
        const errorMessage = hasMessage(error) ? error.message : "Error desconocido al iniciar sesión.";
        throw new Error(errorMessage);
    }
};