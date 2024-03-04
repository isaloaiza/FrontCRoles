import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import PortalLayout from "../layout/PortalLayout";
import Footer from "../components/Footer";



const Reservas = () => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);

  const fetchReservas = async () => {
    try {
      const res = await axios.get("https://parking-0mw6.onrender.com/api/reserva");
      setReservas(res.data);
    } catch (error) {
      console.error("Error fetching reservas:", error);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const handleDelete = async (reservaId) => {
    try {
      await axios.delete(`https://parking-0mw6.onrender.com/api/reserva/${reservaId}`);
      // Actualizar la lista de reservas después de la eliminación
      fetchReservas();
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
     
      
      <table className="table">
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
                  cancelar reserva
                </button>
              </td>
              <td>
              <Link onClick={() => handleWhatsAppClick(reserva.telefono, reserva.nombre)}> <img src="https://cdn.icon-icons.com/icons2/1571/PNG/512/1024881-whatsapp_107716.png" alt="" className="whatsapp" /></Link>
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

export default Reservas;
