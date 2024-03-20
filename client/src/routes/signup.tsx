import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import { API_URL } from "../Autenticacion/constanst";
import { useAuth } from "../Autenticacion/AutProvider";

export default function Signup() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isGmailValid, setIsGmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const auth = useAuth();
  const goto = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsUsernameValid(/^[a-zA-Z0-9]+$/.test(e.target.value));
  };

  const handleGmailChange = (e) => {
    setGmail(e.target.value);
    setIsGmailValid(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordValid(e.target.value.length >= 8);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, gmail, password, role })
      });
      const json = await response.json();
      if (response.ok) {
        console.log("Rol del usuario:", role);
        console.log("El usuario se creó correctamente");
        setErrorResponse("");
        goto("/Login");
      } else {
        console.log(role);
        console.log("Algo malo ocurrió :o");
        setErrorResponse(json.error || "Ocurrió un error al crear el usuario.");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setErrorResponse("Ocurrió un error al enviar la solicitud.");
    }
  }

  if (auth.esAutentico) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <DefaultLayout>
      <div className="form-box">
        <div className="wrapper">
          <div className="img-area">
            <img src="https://i.ibb.co/b5JYgx6/43a26b3f-306e-467e-9bd6-b7be20f9ef82.jpg" alt="imagen" />
          </div>
          <div className="form-area">
            <form className="form" onSubmit={handleSubmit}>
              <h1>Signup</h1>
              {errorResponse && <div className="errorMessage">{errorResponse}</div>}
              <label>Rol</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option>Seleccionar Rol</option>
                <option value="usuario">Usuario</option>
                <option value="cliente">Cliente</option>
              </select>
              <label>Nombre</label>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className={isUsernameValid ? '' : 'invalid'}
              />
              {!isUsernameValid && <div className="error-message">El nombre de usuario solo debe contener letras y números</div>}
              <label>Email</label>
              <input
                type="email"
                value={gmail}
                onChange={handleGmailChange}
                className={isGmailValid ? '' : 'invalid'}
              />
              {!isGmailValid && <div className="error-message">Ingrese un correo electrónico válido</div>}
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className={isPasswordValid ? '' : 'invalid'}
              />
              {!isPasswordValid && <div className="error-message">La contraseña debe tener al menos 8 caracteres</div>}
              <button type="submit" disabled={!isUsernameValid || !isGmailValid || !isPasswordValid}>
                Create Usuario
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}