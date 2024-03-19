import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
import Mapa from "../../js/Mapa";
import "react-datepicker/dist/react-datepicker.css";
// import "../../assets/posts.css";//../../assets/posts.css
import PortalLayout from "../../layout/PortalLayout";
import Footer from "../../components/Footer";
import { useAuth } from "../../Autenticacion/AutProvider";


const Posts = () => {
  const navigate = useNavigate();
  const auth = useAuth(); // Obtener el contexto de autenticación
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userId = "..."; // Reemplazar con la lógica para obtener el userId
        const response = await fetch(`${config.apiUrl}?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${auth.getAccessToken()}` // Agregar el token de autorización al encabezado
          }
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Error al obtener los mensajes:", response.statusText);
        }
      } catch (error) {
        console.error("Error al obtener los mensajes:", error);
      }
    };

    fetchPosts();
  }, [auth]);

  

  // const handleReservation = () => {
  //   // Aquí iría la lógica para realizar la reserva
  //   setModalOpen(false); // Cerrar el modal después de la reserva
  // };

  const handleDelete = async (post) => {
    setPosts(posts.filter((p) => p._id !== post._id));
    await axios.delete(`${config.apiUrl}/${post._id}`);
  };

  return (
    <PortalLayout>
    <div className="campoDatos">
    <div style={{ width: '500px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ borderBottom: '2px solid blue', display: 'inline-block', paddingBottom: '5px' }}>Bienvenido Cliente</h1>
        </div>
      <Mapa posts={posts} />
      <div className="Puestos">
         <div className="intento">
            <h2>Crear Parqueaderos</h2>
            <div className="botones-separar">
             
              <button onClick={() => navigate("/post/new")}>
                Nuevo parqueadero
              </button>
              
              
            </div>
          </div>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Latitud</th>
              <th>Longitud</th>
              <th>Actualizacion</th>
              <th>Eliminacion</th>
              <th>Reserva</th> 
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td> {post.title} </td>
                <td> {post.content} </td>
                <td> {post.latitud} </td>
                <td> {post.longitud} </td>
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
      </div>
    
    </div>
    <Footer />
    </PortalLayout>
  );
};

export default Posts;