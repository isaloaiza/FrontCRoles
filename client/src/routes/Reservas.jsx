import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import PortalLayout from "../layout/PortalLayout";
import Footer from "../components/Footer";
import puestos from '../puestos.json'
import { useAuth } from "../Autenticacion/AutProvider";
import '../pages/DatosFrom/info.css'



const Reservas = () => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const auth = useAuth(); // Obtener el contexto de autenticación

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await fetch(`${puestos.apiUrl}`, {
          headers: {
            Authorization: `Bearer ${auth.getAccessToken()}` // Agregar el token de autorización al encabezado
          }
        });
        if (response.ok) {
          const data = await response.json();
          const filteredPosts = data.filter(reserva => reserva.userId === auth.getUser().id);
          
          setReservas(filteredPosts);
        } else {
          console.error("Error al obtener los mensajes:", response.statusText);
        }
      } catch (error) {
        console.error("Error al obtener los mensajes:", error);
      }
    };

    fetchReserva();
  }, [auth]);

  const handleDelete = async (reservaId) => {
    try {
      const accessToken = auth.getAccessToken(); // Obtener el token de acceso del contexto de autenticación
      await axios.delete(`https://rolescambios.onrender.com/api/reserva/${reservaId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      // Actualizar la lista de reservas después de la eliminación
      fetchReserva(); // Aquí corregimos el nombre de la función a fetchReserva
    } catch (error) {
      console.error("Error deleting reserva:", error);
    }
  };
  

  let codigoPais = '57'; // Código de país
    
    const handleWhatsAppClick = (numeroTelefono, nombre) => {
      const mensajeInicial = encodeURIComponent(`¡Hola ${nombre}!, recuerda que tienes una reserva en nuestro parqueadero, para mas información comunícate con este número.`);
      const numeroWhatsApp = `${codigoPais}${numeroTelefono}`;
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeInicial}`;
      window.open(urlWhatsApp, '_blank');
    }

  return (
    <PortalLayout>
    <div className="posts">
    <div className="datosReserva">
      <Link to="/Dashboard">
        <Button color="primary">Regresar</Button>
      </Link>
     
      <section class="table__body">
      <table >
        <thead>
          <tr >
           
            <th>Fecha</th>              
            <th>Tiempo</th>
            <th>Nombre</th>             
            <th>Numero</th>
            <th>Placa</th>
            <th>Eliminar</th>
            <th>Enviar mensaje</th>
        

           
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva._id}>
              <td> {reserva.date} </td>
              <td> {reserva.time} </td>
              <td> {reserva.nombre} </td>
              <td className="numeroW">{reserva.telefono}</td> 
              <td> {reserva.placa} </td>
         
              

             
              
              <td>
                <button
                  onClick={() => {
                    handleDelete(reserva._id);
                  }}
                  className="btn btn-danger"
                >
                  salida de vehiculo
                </button>
              </td>
              <td>
              <Link onClick={() => handleWhatsAppClick(reserva.telefono, reserva.nombre)}> <img src="https://cdn.icon-icons.com/icons2/1571/PNG/512/1024881-whatsapp_107716.png" alt="" className="whatsapp" /></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </section>
    
    </div>
  </div>

  <Footer />
  </PortalLayout>
  );
};

export default Reservas;
