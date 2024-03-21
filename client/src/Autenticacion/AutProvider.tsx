/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, createContext, useState, useEffect } from "react";
import type { AccessTokenResponse, AuthResponse, User  } from "../types/types";
import { API_URL } from "../Autenticacion/constanst";

interface AuthContextType {
    esAutentico: boolean;
    getAccessToken: () => void;
    saveUser: (_userData: AuthResponse) => void;
    getRefreshToken: () => void;
    getUser: () => User | undefined;
    signOut: () => void;
    getRol: () => string | undefined;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
    esAutentico: false,
    getAccessToken: () => {},
    saveUser: (_userData: AuthResponse) => {},
    getRefreshToken: () => {},
    getUser: () => undefined,
    signOut: () => {},
    getRol: () => undefined,
});

export function AuthProvider({ children }: AuthProviderProps) {

    const [esAutentico, setEsAutentico] = useState(false);
    const [accessToken, setAccessToken] = useState<string>();
    const [user, setUser] = useState<User>();
    const [isLoading,setIsLoading]=useState(true);
    const [role, setRol] = useState<string>();

    useEffect(() => {
        checkAuth();
    }, []);

    async function requestNewAccessToken(refreshToken: string) {
        try {
            const response = await fetch(`${API_URL}/refresh-token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${refreshToken}`
                }
            });

            if (response.ok) {
                const json = await response.json() as AccessTokenResponse;

                if (json.error) {
                    throw new Error(json.error);
                }
                return json.body.accesToken;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error('Error al solicitar un nuevo token de acceso:', error);
            return null;
        }
    }
    
    async function getUserInfo(accessToken: string) {
        try {
            const response = await fetch(`${API_URL}/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.ok) {
                const json = await response.json();

                if (json.error) {
                    throw new Error(json.error);
                }
                return json.body;
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener información del usuario:', error);
            return null;
        }
    }
    

    async function checkAuth() {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
    
            if (accessToken) {
                const userInfo = await getUserInfo(accessToken);
                if (userInfo) {
                    saveSessionInfo(userInfo, accessToken, refreshToken!);
                    setIsLoading(false);
                    return;
                }
            } else if (refreshToken) {
                const newAccessToken = await requestNewAccessToken(refreshToken);
                if (newAccessToken) {
                    const userInfo = await getUserInfo(newAccessToken);
                    if (userInfo) {
                        saveSessionInfo(userInfo, newAccessToken, refreshToken);
                        setIsLoading(false);
                        return;
                    }
                }
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error en la verificación de autenticación:', error);
            setIsLoading(false);
        }
    }
    
    function signOut(){
        setEsAutentico(false);
        setAccessToken("");
        setUser(undefined);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
    
    function saveSessionInfo(userInfo: User, accessToken: string, refreshToken: string) {
        setAccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setEsAutentico(true);
        setUser(userInfo);
        setRol(userInfo.role);
    }
    
    function getRol() {
        return role;
    }

    function getAccessToken() {
        return accessToken;
    }

    function getRefreshToken(): string | null {
        const tokenData = localStorage.getItem("Token");
        if(tokenData){
            const token = JSON.parse(tokenData);
            return token;
        }
        return null;
    }

    function saveUser(userData: AuthResponse) {
        saveSessionInfo(
            userData.body.user, 
            userData.body.accessToken, 
            userData.body.refreshToken
        );
    }

    function getUser(){
        return user;
    }

    useEffect(() => {
        console.log("Datos del usuario:", user);
    }, [user]);

    return (
        <AuthContext.Provider value={{ esAutentico, getAccessToken, saveUser, getRefreshToken, getUser, signOut, getRol }}>
            {isLoading?  
                <div className="spinner-container relative w-full md:h-screen p-4 text-white h-unset flex justify-center items-center Z-10">
                    <div style={{display:'flex', alignItems:'center'}} className="Z-10">
                        <img src="../../../../public/images/logoMulti.png" 
                            className="logo scale-x-[-1] filter invert "
                            alt="" />
                        <h1 style={{marginLeft:'-100px', fontSize:100,marginTop:30}}>ultiServicios</h1>
                    </div>
                    <div className="spinner"></div>
                    <h1 style={{padding:20, fontSize:30}}>Loading...</h1>
                </div>
            : 
                children
            }
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
