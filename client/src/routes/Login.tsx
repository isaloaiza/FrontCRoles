import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Autenticacion/AutProvider";
import { useState } from "react";
import { API_URL } from "../Autenticacion/constanst";
import type { AuthResponse, AuthResponseError } from "../types/types";
import React from "react";


export default function Login() {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const auth = useAuth();
  const goto = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          gmail,
          password
        })
      });

      if (response.ok) {
        setErrorResponse("");
        const json = (await response.json()) as AuthResponse;

        if (json.body.accessToken && json.body.refreshToken) {
          const guardar = auth.saveUser(json);
         
          goto("/dashboard");
        }
      } else {
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(auth.esAutentico);
  
  if (auth.esAutentico) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      
      <section className="relative w-full md:h-screen p-4 text-white h-unset flex justify-center items-center">
        <div className="flex flex-col max-w-screen-lg mx-auto relative z-10">
          <div className="pb-0">
            <h2 className="text-4xl font-bold inline border-b-4 border-blue-600 border-opacity-40 sm:text-5xl">Iniciar Sesión</h2>
            <p className="py-6">Completa el siguiente formulario para iniciar sesión</p>
          </div>

          <div className="flex justify-center items-center relative z-10 h-52">
            <form onSubmit={handleSubmit} className="flex flex-col w-full md:w-1/2 rounded-md p-8" style={{ zIndex: "20" }}>
              <input 
                type="text" 
                name="name" 
                placeholder="Correo Electrónico" 
                value={gmail} 
                onChange={(e) => setGmail(e.target.value)} 
                className="my-4 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-blue-600" 
                required 
              />

              <input 
                type="password" 
                name="password" 
                placeholder="Contraseña" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="my-4 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-blue-600" 
                required 
              />

              {!!errorResponse && <div className="text-red-500 mb-4">{errorResponse}</div>}

              <button 
                type="submit" 
                className="group text-white font-semibold w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-t from-blue-600 cursor-pointer mx-auto md:mx-0"
              > 
                Iniciar Sesión  
              </button>
            </form>
            
            <div className="ml-8 relative z-20">
              <img 
                className="scale-x-[-1] filter invert transition-transform transform hover:scale-110 transition duration-500" 
                
                alt="Imagen" 
              />
            </div>
          </div>

          <div className="mt-4">
            <p>¿No tienes una cuenta? <a href="/signup" className="text-blue-600">Registrarse</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
