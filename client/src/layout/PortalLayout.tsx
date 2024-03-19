import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../Autenticacion/constanst";
import { useAuth } from "../Autenticacion/AutProvider";


export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const [role, setRole] = useState<string | undefined>(undefined);
  const [, setErrorResponse] = useState<string>("");

  useEffect(() => {
    async function fetchUserRole() {
      try {
        const userRole = await auth.getRol();
        setRole(userRole);
      } catch (error) {
        setErrorResponse("Ocurrió un error al obtener el rol del usuario.");
      }
    }

    fetchUserRole();
  }, [auth]);

  async function handleSignOut(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`
        }
      });

      if (response.ok) {
        auth.signOut();
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
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
            <li>
              <Link to="/Perfil">Perfil</Link>
            </li>
            <li>
              <Link to="/Dashboard">Mapa navegación</Link>
            </li>
            <li>
              <Link to="/Posts">Creación parqueadero</Link>
            </li>
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

      <main>{children}</main>
    </>
  );
}

