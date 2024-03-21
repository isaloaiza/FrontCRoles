import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../Autenticacion/constanst";
import { useAuth } from '../Autenticacion/AutProvider';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const { getRol, getAccessToken, getRefreshToken, signOut } = useAuth();
  const [role, setRole] = useState<string | null>(null); // Estado para almacenar el rol
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserRole() {
      try {
        const userRole = await getRol(); // Llamar a la función para obtener el rol
        console.log("El rol es " + userRole);
        setRole(userRole || null); // Asignar null si userRole es undefined
      } catch (error) {
        setError("Ocurrió un error al obtener el rol del usuario.");
      }
    }

    fetchUserRole();
  }, [getRol]);

  async function handleSignOut(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`
        }
      });

      if (response.ok) {
        signOut();
        window.location.href = "/";
      } else {
        setError("Error al cerrar sesión. Inténtelo de nuevo.");
      }
    } catch (error) {
      console.error(error);
      setError("Error al cerrar sesión. Inténtelo de nuevo.");
    }
  }

  return (
    <>
      <header className="principal">
        <div className="container-pri">
          <Link to="/" className="inicio">
            Parking<span className="span">Location.</span>
          </Link>
        </div>
        <nav>
          <ul>
            {/* <li>
              <Link to="/Perfil">Perfil</Link>
            </li> */}
            {role === "usuario" && ( 
            <li>
              <Link to="/Dashboard">Mapa navegación</Link>
            </li>
            )}
            {role === "cliente" && ( 
            <li>
              <Link to="/Posts">Creación parqueadero</Link>
            </li>
            )}
            {role === "usuario" && ( 
              <li>
                <Link to="/ExplicacionUser">¿Como Funciona?</Link>
              </li>
               )}
                {role === "cliente" && ( 
               <li>
                <Link to="/Explicacion">¿Como Funciona?</Link>
              </li>
              )}
            <li>
              <div>
                <button className="p-14 hover:text-blue-500" onClick={handleSignOut}>Salir</button>
              </div>
            </li>
            {role && (
              <li>
                Rol: {role}
              </li>
            )}
          </ul>
        </nav>
      </header>

      {error && <div className="error-message">{error}</div>}

      <main>{children}</main>
    </>
  );
}