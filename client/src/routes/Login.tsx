import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Autenticacion/AutProvider";
import { useState } from "react";
import { API_URL } from "../Autenticacion/constanst";
import type { AuthResponse, AuthResponseError } from "../types/types";
import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Footer from "../components/Footer";


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
         auth.saveUser(json);
         
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
    

<DefaultLayout>
      <div className="form-box">
        <div className="wrapper">
          <div className="left">
          <div className="registration-info">
            <div className="title-regis">
              <h1>Bienvenido a <span className="span">ParkingLocation</span></h1>

            </div>
            <div className="regisP">
              <p>Accede a nuestra plataforma y disfrutar de servicios de estacionamiento convenientes y seguros.</p>

            </div>
            <div className="regislink">
              <p className="login-link">¿Aún no tienes cuenta? <a href="/signup">Registrate aquí</a></p>

            </div>
          </div>

          </div>
          <div className="right">

          <div className="form-area">
            <form className="formLogin" onSubmit={handleSubmit}>
              <div className="formTitle">
                <h2 className="form-title">Iniciar sesión</h2>

              </div>
              {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
              <div className="inputs">

                <input
                  type="email"
                  value={gmail}
                  onChange={(e) => setGmail(e.target.value)}
                  placeholder="Correo...."
                  className="log-input"></input>

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
        <div className='air air1'></div>
        <div className='air air2'></div>
        <div className='air air3'></div>
        <div className='air air4'></div>
      </div>
      <Footer />
    </DefaultLayout>
      
      
    
  );
}


// import { Navigate, useNavigate } from "react-router-dom";
// import { useAuth } from "../Autenticacion/AutProvider";
// import { useState } from "react";
// import { API_URL } from "../Autenticacion/constanst";
// import type { AuthResponse, AuthResponseError } from "../types/types";
// import React from "react";

// export default function Login() {
//   const [gmail, setGmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorResponse, setErrorResponse] = useState("");
//   const [isGmailValid, setIsGmailValid] = useState(true);
//   const [isPasswordValid, setIsPasswordValid] = useState(true);

//   const auth = useAuth();
//   const goto = useNavigate();

//   const handleGmailChange = (e) => {
//     setGmail(e.target.value);
//     setIsGmailValid(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value));
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setIsPasswordValid(e.target.value.length >= 8);
//   };

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${API_URL}/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ gmail, password })
//       });
//       if (response.ok) {
//         setErrorResponse("");
//         const json = (await response.json()) as AuthResponse;
//         if (json.body.accessToken && json.body.refreshToken) {
//           const guardar = auth.saveUser(json);
//           goto("/dashboard");
//         }
//       } else {
//         const json = (await response.json()) as AuthResponseError;
//         setErrorResponse(json.body.error);
//         return;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   console.log(auth.esAutentico);
//   if (auth.esAutentico) {
//     return <Navigate to="/dashboard" />;
//   }

//   return (
//     <>
//       <section className="relative w-full md:h-screen p-4 text-white h-unset flex justify-center items-center">
//         <div className="flex flex-col max-w-screen-lg mx-auto relative z-10">
//           <div className="pb-0">
//             <h2 className="text-4xl font-bold inline border-b-4 border-blue-600 border-opacity-40 sm:text-5xl">
//               Iniciar Sesión
//             </h2>
//             <p className="py-6">Completa el siguiente formulario para iniciar sesión</p>
//           </div>
//           <div className="flex justify-center items-center relative z-10 h-52">
//             <form
//               onSubmit={handleSubmit}
//               className="flex flex-col w-full md:w-1/2 rounded-md p-8"
//               style={{ zIndex: "20" }}
//             >
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Correo Electrónico"
//                 value={gmail}
//                 onChange={handleGmailChange}
//                 className={`my-4 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none ${
//                   isGmailValid ? "focus:border-blue-600" : "border-red-500"
//                 }`}
//                 required
//               />
//               {!isGmailValid && (
//                 <div className="text-red-500 mb-4">Ingrese un correo electrónico válido</div>
//               )}
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Contraseña"
//                 value={password}
//                 onChange={handlePasswordChange}
//                 className={`my-4 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none ${
//                   isPasswordValid ? "focus:border-blue-600" : "border-red-500"
//                 }`}
//                 required
//               />
//               {!isPasswordValid && (
//                 <div className="text-red-500 mb-4">La contraseña debe tener al menos 8 caracteres</div>
//               )}
//               {!!errorResponse && <div className="text-red-500 mb-4">{errorResponse}</div>}
//               <button
//                 type="submit"
//                 className="group text-white font-semibold w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-t from-blue-600 cursor-pointer mx-auto md:mx-0"
//                 disabled={!isGmailValid || !isPasswordValid}
//               >
//                 Iniciar Sesión
//               </button>
//             </form>
//             <div className="ml-8 relative z-20">
//               <img
//                 className="scale-x-[-1] filter invert transition-transform transform hover:scale-110 transition duration-500"
//                 alt="Imagen"
//               />
//             </div>
//           </div>
//           <div className="mt-4">
//             <p>
//               ¿No tienes una cuenta? <a href="/signup" className="text-blue-600">Registrarse</a>
//             </p>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }