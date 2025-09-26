'use client'

import { createContext, useContext, useEffect, useState } from "react";
//Esto es una interfaz que define los valores
interface AuthContextProps {
    dataUser: userSessionInterface | null;
    setDataUser:(dataUser: userSessionInterface | null)=> void;
    logout: () => void;
}

//Eso SI es la creacion del context y la definicion de sus valores iniciales
const AuthContext = createContext<AuthContextProps>({
    dataUser: null,
    setDataUser: () => {},
    logout: () => {}
});

interface AuthProviderProps {
    children:React.ReactElement;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
const [dataUser, setDataUser] = useState<userSessionInterface | null>(null)

//logica, que controlare con useEffect(1 o 2)
useEffect(()=>{
    if(dataUser){
        localStorage.setItem('userSession', JSON.stringify(dataUser));
    }
}, [dataUser]);
useEffect(() => {
    if(typeof window !== "undefined" && window.localStorage) {
    const dataUser = localStorage.getItem('userSession');
    if (dataUser) {
        setDataUser(JSON.parse(dataUser));
    }
    }
}, []);
//Metodos disponibles logout que es el faltante.
const logout = () => {
    setDataUser(null);
    if(typeof window !== "undefined" && window.localStorage){
        localStorage.removeItem("userSession");
        localStorage.removeItem("cart");
    }
};
return(
    <AuthContext.Provider value={{dataUser, setDataUser, logout}}>
        {children}
    </AuthContext.Provider>
)
};

export const useAuth = () => useContext(AuthContext);