import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DefaultLayout from "../layout/DefaultLayout";
import { API_URL } from "../Autenticacion/constanst";
import Footer from "../components/Footer";



export default function Signup() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const goto = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          gmail,
          password,
          role
        })
      });

      const json = await response.json();
      if (response.ok) {
        console.log("Rol del usuario:", role);
        console.log("El usuario se creó correctamente");
        setErrorResponse("");
        showSuccessAlert(); // Mostrar SweetAlert cuando el registro es exitoso
        goto("/Login");
      } else {
        console.log(role);
        console.log("Algo malo ocurrió :o");
        setErrorResponse(json.error || "Ocurrió un error al crear el usuario.");
        showErrorAlert(); // Mostrar SweetAlert cuando hay un error en el registro
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setErrorResponse("Ocurrió un error al enviar la solicitud.");
      showErrorAlert();
    }
  }

  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: '¡Registro Exitoso!',
      text: 'El usuario se ha registrado correctamente.',
      confirmButtonText: 'OK'
    });
  };

  const showErrorAlert = () => {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: errorResponse || 'Ocurrió un error al crear el usuario.',
      confirmButtonText: 'OK'
    });
  };

  return (
    <DefaultLayout>
      <div className="form-box">
        <div className="wrapper">
        <div className="registration-info">
  <h1>Bienvenido a <span className="span">ParkingLocation</span></h1>
  <p className="registration-info-paragraph">Regístrate para acceder a nuestra plataforma y disfrutar de servicios de estacionamiento convenientes y seguros.</p>
  <p className="login-link">¿Ya tienes una cuenta? <a href="/signup">Iniciar sesión aquí</a></p>
</div>
          <div className="form-area">
            <form className="formSignup" onSubmit={handleSubmit}>
              <h2>Registro</h2>
              {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}

              <div className="inputs">
                <label htmlFor="" className="labelRol">Rol</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="log-input">
                  <option>Seleccionar Rol</option>
                  <option value="usuario">Usuario</option>
                  <option value="cliente">Cliente</option>
                </select>
                <label htmlFor="" className="labeluser">Nombre de usuario</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="log-input" placeholder="Nombre"></input>
                <label htmlFor="" className="label">Correo</label>
                <input type="email" value={gmail} onChange={(e) => setGmail(e.target.value)} className="log-input" placeholder="Email"></input>
                <label htmlFor="" className="label2">Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="log-input" placeholder="Contraseña"></input>

              </div>
              <button className="crear">Crear Usuario</button>
            </form>
          </div>
        </div>
      </div>

      <section className="foter">
        <Footer />
      </section>
      
    </DefaultLayout>
  );
}