import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DefaultLayout from "../layout/DefaultLayout";
import { API_URL } from "../Autenticacion/constanst";
import Footer from "../components/Footer";


export default function Login() {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const goto = useNavigate();

  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();

    

 
// Validación de campos de entrada
    if (!gmail || !password) {
      setErrorResponse("Por favor, ingresa un correo electrónico y una contraseña.");
      return;
    }

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

      const json = await response.json();
      const userRol = json.user;

      if (response.ok) {
        // Almacenamiento seguro del token de acceso y el rol del usuario
        
        
localStorage.setItem("token", json.token);

        if (userRol === "cliente") {
          goto("/Posts");
        } else {
          goto("/dashboard");
        }
      } else {
        // Manejo de errores en la respuesta del servidor
        
        
setErrorResponse(json.error || "Ocurrió un error al iniciar sesión.");
        showErrorAlert();
      }
    } catch (error) {
      // Manejo de errores de red
      console.error("Error al enviar la solicitud:", error);
      setErrorResponse("Hubo un problema de red. Inténtalo de nuevo más tarde.");
      showErrorAlert();
    }
  }

  const showErrorAlert = () => {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: errorResponse || 'Ocurrió un error al iniciar sesión.',
      confirmButtonText: 'OK'
    });
  };

  return (
    
    <DefaultLayout>
      <div className="form-box">
        <div className="wrapper">
        <div className="registration-info-login">
        <h1>Bienvenido a <span className="span">ParkingLocation</span></h1>
        <p>Accede a nuestra plataforma y disfrutar de servicios de estacionamiento convenientes y seguros.</p>
        <p className="login-link">¿Aún no tienes cuenta? <a href="/signup">Registrate aquí</a></p>
        </div>
          <div className="form-area">
            <form className="formLogin" onSubmit={handleSubmit}>
              <h2>Inicia sesión</h2>
              {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
              <div className="inputs">
                <label htmlFor="" className="label">Correo</label>
                <input
                  type="email"
                  value={gmail}
                  onChange={(e) => setGmail(e.target.value)}
                  placeholder="Correo...."
                  className="log-input"></input>
                <label htmlFor="" className="label2">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña...."
                  className="log-input"></input>
              </div>
              <button className="crear">Acceder</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </DefaultLayout>
  );
}