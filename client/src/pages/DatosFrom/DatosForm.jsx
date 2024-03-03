import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
import Mapa from "../../js/Mapa";
import "react-datepicker/dist/react-datepicker.css";
// import "../../assets/posts.css";//../../assets/posts.css
import PortalLayout from "../../layout/PortalLayout";
import Footer from "../../components/Footer";


const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const [selectedPuestos, setSelectedPuestos] = useState(0);
  
 

  const fetchPosts = async () => {
    const userId = "...";

    try {
      const res = await axios.get(`${config.apiUrl}?userId=${userId}`);
      setPosts(res.data);
      if (res.data.length > 0) {
        setSelectedPuestos(res.data[0].puestos);
      }
    } catch (error) {
      console.error("Error al obtener los mensajes:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  

  

  

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