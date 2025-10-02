'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { userSessionInterface } from "@/interfaces/userSession.interface";
interface AuthContextProps {
    dataUser: userSessionInterface | null;
    setDataUser:(dataUser: userSessionInterface | null)=> void;
    logout: () => void;
}


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