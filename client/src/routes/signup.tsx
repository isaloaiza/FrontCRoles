import  { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import { API_URL } from "../Autenticacion/constanst";
import { useAuth } from "../Autenticacion/AutProvider";
import Footer from "../components/Footer";

export default function Signup() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const auth = useAuth();

  const goto = useNavigate();

  async function handleSubmit(e: { preventDefault: () => void; }) {
    
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
        goto("/Login"); // Redirigir al usuario a la página de inicio de sesión después de registrarse
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
          <div className="Sright">

            <div className="form-area">
              <form className="formSignup" onSubmit={handleSubmit}>
                <div className="formTitle">
                  <h2 className="form-title">Registro</h2>

                </div>
                {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}

                <div className="inputs">

                  <select value={role} onChange={(e) => setRole(e.target.value)} className="log-input">
                    <option>Seleccionar Rol...</option>
                    <option value="usuario">Usuario</option>
                    <option value="cliente">Cliente</option>
                  </select>

                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="log-input" placeholder="Nombre"></input>

                  <input type="email" value={gmail} onChange={(e) => setGmail(e.target.value)} className="log-input" placeholder="Email"></input>

                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="log-input" placeholder="Contraseña"></input>

                </div>
                <button className="crear">Crear Usuario</button>
              </form>
            </div>
          </div>
          <div className="left">
            <div className="registration-info">
              <div className="title-regis">
                <h1>Bienvenido a <span className="span">ParkingLocation</span></h1>

              </div>
              <div className="regisP">
                <p className="registration-info-paragraph">Regístrate para acceder a nuestra plataforma y disfrutar de servicios de estacionamiento convenientes y seguros.</p>

              </div>
              <div className="regisLink">
                <p className="login-link">¿Ya tienes una cuenta? <a href="/Login">Iniciar sesión aquí</a></p>

              </div>
            </div>

          </div>
        </div>
        <div className='air air1'></div>
        <div className='air air2'></div>
        <div className='air air3'></div>
        <div className='air air4'></div>
      </div>

      <section className="footer">
        <Footer />
      </section>

    </DefaultLayout>
    // <DefaultLayout>
    //   <div className="form-box">
    //     <div className="wrapper">
    //       <div className="img-area">
    //         <img src="https://i.ibb.co/b5JYgx6/43a26b3f-306e-467e-9bd6-b7be20f9ef82.jpg" alt="imagen" />
    //       </div>
    //       <div className="form-area">
    //         <form className="form" onSubmit={handleSubmit}>
    //           <h1>Signup</h1>
    //           {errorResponse && <div className="errorMessage">{errorResponse}</div>}
    //           <label>Rol</label>
    //           <select value={role} onChange={(e) => setRole(e.target.value)}>
    //             <option>Seleccionar Rol</option>
    //             <option value="usuario">Usuario</option>
    //             <option value="cliente">Cliente</option>
    //           </select>
    //           <label>Nombre</label>
    //           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    //           <label>Email</label>
    //           <input type="email" value={gmail} onChange={(e) => setGmail(e.target.value)} />
    //           <label>Password</label>
    //           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //           <button type="submit">Create Usuario</button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </DefaultLayout>
  );
}