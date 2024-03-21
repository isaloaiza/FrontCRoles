import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useParams, useNavigate } from 'react-router-dom';
import './Post.css';
import config from '../../config.json';
import PortalLayout from '../../layout/PortalLayout';
import { useAuth } from '../../Autenticacion/AutProvider';

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useAuth(); // Obtener el contexto de autenticación
  const [post, setPost] = useState({
    title: '',
    content: '',
    horarios: '',
    tarifaCarro: '',
    tarifaMoto: '',
    telefono: '',
    nosotros: '',
    latitud: '',
    longitud: '',
    puestos: '',
    userId: ''
  });



  useEffect(() => {
    if (id !== "new") {
      const fetchPost = async () => {
        try {
          const response = await fetch(`${config.apiUrl}/${id}`, {
            headers: {
              Authorization: `Bearer ${auth.getAccessToken()}` // Agregar el token de autorización al encabezado
            }
          });
          if (response.ok) {
            const data = await response.json();
            setPost(data);
            const userId = data.userId;
            console.log("el usuario es"+userId);
          } else {
            console.error("Error al obtener el parqueadero:", response.statusText);
            navigate("/error");
          }
        } catch (error) {
          console.error("Error al obtener el parqueadero:", error);
          navigate("/error");
        }
      };
      fetchPost();
    }
  }, [id, navigate, auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos requeridos
    const { title, content, horarios, tarifaCarro, tarifaMoto, telefono, nosotros, latitud, longitud, puestos } = post;
    if (!title || !content || !horarios || !tarifaCarro || !tarifaMoto || !telefono || !nosotros || !latitud || !longitud || !puestos) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    // Validación de formato de teléfono
    const telefonoPattern = /^\d{10}$/;
    if (!telefonoPattern.test(telefono)) {
      alert('Por favor ingresa un número de teléfono válido (10 dígitos sin espacios ni caracteres especiales).');
      return;
    }

    // Validación de longitud y latitud
    if (latitud < -90 || latitud > 90 || longitud < -180 || longitud > 180) {
      alert('Por favor ingresa valores válidos para la latitud (-90 a 90) y la longitud (-180 a 180).');
      return;
    }

    // Envío del formulario si todas las validaciones son exitosas
    try {
      const requestOptions = {
        method: id === "new" ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.getAccessToken()}` // Agregar el token de autorización al encabezado
        },
        body: JSON.stringify(post)
      };

      const response = await fetch(id === "new" ? config.apiUrl : `${config.apiUrl}/${id}`, requestOptions);
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'La reserva se guardó correctamente'
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            navigate("/Posts");
          }
        });
      } else {
        const data = await response.json();
        console.error("Error al guardar la reserva:", data);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Los datos están duplicados o no coinciden'
        });
      }
    } catch (error) {
      console.error("Error al guardar la reserva:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al guardar la reserva'
      });
    }
  }

  return (
    <PortalLayout>
      <div class="DatosParqueadero">
        <div class="form1">
          <form action="#">
            <div class="form-header1">
              <div class="title">
                <h2>{id === 'new' ? 'Nuevo Parqueadero' : 'Actualizar Parqueadero'}</h2>
              </div>
              <div class="login-button">
                <button><a href="#">Bienvenido</a></button>
              </div>
            </div>
            
            <div class="input-group">
              <div class="input-box">
                <label for="firstname">Nombre parqueadero</label>
                <input type="text" id="title" placeholder="Ej: parquedero nuevaVista..." name="title"
                  value={post.title} onChange={handleChange} className="form-control2" />
              </div>

              <div class="input-box">
                <label for="lastname">Direccion</label>
                <input
                  type="text"
                  id="content"
                  placeholder="Ej: calle 4 ta #23 - 45"
                  name="content"
                  value={post.content}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div class="input-box">
                <label for="lastname">Horarios</label>
                <input
                  type="text"
                  placeholder="Ej: 3h, 24h, 2h"
                  name="horarios"
                  value={post.horarios}
                  onChange={handleChange}
                />
              </div>

              <div class="input-box">
                <label for="lastname">Tarifa Moto</label>
                <input
                  type="text"
                  placeholder="Ej: 1000, 3000, 5000"
                  name="tarifaMoto"
                  value={post.tarifaMoto}
                  onChange={handleChange}
                />
              </div>

              <div class="input-box">
                <label for="lastname">Tarifa Carro</label>
                <input
                  type="text"
                  placeholder="Ej: 10.000, 6.000, 3.000"
                  name="tarifaCarro"
                  value={post.tarifaCarro}
                  onChange={handleChange}
                />
              </div>

              <div class="input-box">
                <label for="email">Telefono</label>
                <input
                  type="text"
                  id="telefono"
                  placeholder="Ej: 3235148905"
                  name="telefono"
                  value={post.telefono}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div class="input-box">
                <label for="number">Latitud</label>
                <input
                  type="number"
                  id="latitud"
                  placeholder="Ej: 4.54536565"
                  name="latitud"
                  value={post.latitud}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div class="input-box">
                <label for="password">Longitud</label>
                <input
                  type="number"
                  id="longitud"
                  placeholder="Ej: -75.8789697"
                  name="longitud"
                  value={post.longitud}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div class="input-box">
                <label for="password">Puesto disponibles</label>
                <input
                  type="number"
                  placeholder="ej: 34"
                  name="puestos"
                  value={post.puestos}
                  onChange={handleChange}
                />
              </div>

              <div class="input-box">
                <label for="password">Descripcion Parqueadero</label>
                <textarea
                  type="text"
                  placeholder="Sobre nosotros.."
                  name="nosotros"
                  value={post.nosotros}
                  onChange={handleChange}
                />
              </div>

            </div>
            <div class="continue-button">
              <button onClick={handleSubmit} className="btn btn-primary">{id === 'new' ? 'Agregar' : 'Actualizar'}</button>
            </div>
          </form>
        </div>
      </div>
    </PortalLayout>
  );
};

export default Post;