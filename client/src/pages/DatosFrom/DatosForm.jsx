import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
import Mapa from "../../js/Mapa";
import PortalLayout from "../../layout/PortalLayout";
import Footer from "../../components/Footer";
import { useAuth } from "../../Autenticacion/AutProvider";

const Posts = () => {
  const navigate = useNavigate();
  const auth = useAuth(); // Obtener el contexto de autenticación
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${config.apiUrl}`, {
          headers: {
            Authorization: `Bearer ${auth.getAccessToken()}` // Agregar el token de autorización al encabezado
          }
        });
        if (response.ok) {
          const data = await response.json();
          const filteredPosts = data.filter(post => post.userId === auth.getUser().id);
          setUserPosts(filteredPosts);
        } else {
          console.error("Error al obtener los mensajes:", response.statusText);
        }
      } catch (error) {
        console.error("Error al obtener los mensajes:", error);
      }
    };

    fetchPosts();
  }, [auth]);

  const handleDelete = async (post) => {
    setUserPosts(userPosts.filter((p) => p._id !== post._id));
    await axios.delete(`${config.apiUrl}/${post._id}`);
  };

  return (
  //   <PortalLayout>
  //   <div className="campoDatos">
  //     <div style={{ width: '500px', margin: '0 auto', textAlign: 'center' }}>
  //       <h1 style={{ borderBottom: '2px solid blue', display: 'inline-block', paddingBottom: '5px' }}>Bienvenido Cliente</h1>
  //     </div>
  //     <Mapa posts={userPosts} />
  //     <div className="table__header">
  //       <h1>Crear Parqueadero</h1>
        
  //       <div className="export__file">
  //         <button onClick={() => navigate("/post/new")}>Nuevo parqueadero</button>
  //       </div>
  //     </div>
  //     <section className="table__body">
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Nombre</th>
  //             <th>Descripción</th>
  //             <th>Latitud</th>
  //             <th>Longitud</th>
  //             <th>ID Usuario</th> 
  //             <th>Actualización</th>
  //             <th>Eliminación</th>
  //             <th>Reserva</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {userPosts.map((post) => (
  //             <tr key={post._id}>
  //               <td>{post.title}</td>
  //               <td>{post.content}</td>
  //               <td>{post.latitud}</td>
  //               <td>{post.longitud}</td>
  //               <td> {post.userId} </td> 
  //               <td>
  //                 <button onClick={() => navigate(`/post/${post._id}`)} className="btn btn-primary">
  //                   Actualizar
  //                 </button>
  //               </td>
  //               <td>
  //                 <button onClick={() => handleDelete(post)} className="btn btn-danger">
  //                   Eliminar
  //                 </button>
  //               </td>
  //               <td>
  //                 <button onClick={() => navigate('/Reservas')} className="btn btn-primary">
  //                   Reserva
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </section>
  //   </div>
  //   <Footer />
  // </PortalLayout>

  <PortalLayout>
  <div className="campoDatos">
    <div style={{ width: '500px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ borderBottom: '2px solid blue', display: 'inline-block', paddingBottom: '5px' }}>Bienvenido Cliente</h1>
    </div>
    <Mapa posts={userPosts} />
    <div className="table__header">
      <h1>Crear Parqueadero</h1>
      <div className="export__file">
        <button onClick={() => navigate("/post/new")}>Nuevo parqueadero</button>
      </div>
    </div>
    <section className="table__body">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Latitud</th>
            <th>ID Usuario</th> {/* Cambiado de "Longitud" a "ID Usuario" */}
            <th>Actualizacion</th>
            <th>Eliminacion</th>
            <th>Reserva</th> 
          </tr>
        </thead>
        <tbody>
          {userPosts.map((post) => (
            <tr key={post._id}>
              <td> {post.title} </td>
              <td> {post.content} </td>
              <td> {post.latitud} </td>
              <td> {post.userId} </td> {/* Muestra el ID del usuario */}
              <td>
                <button
                  onClick={() => navigate(`/post/${post._id}`)}
                  className="btn btn-primary"
                >
                  Actualizar
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(post)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </td>
              <td>
                <button
                  onClick={() => navigate('/Reservas')}
                  className="btn btn-primary"
                >
                  Reserva
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  </div>
  <Footer />
</PortalLayout>



  );
};

export default Posts;
