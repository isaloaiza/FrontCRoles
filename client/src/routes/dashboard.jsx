import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.json";
import Mapa from '../js/Mapa';
import PortalLayout from '../layout/PortalLayout';
import '../assets/dashboard.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../Autenticacion/AutProvider';
import Modal from 'react-modal';
import CalendarComponent from './calendarComponent';
import Footer from "../components/Footer";


const Dashboard = () => {
  const { getUser } = useAuth();
  const [parqueaderos, setParqueaderos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedParqueaderoId, setSelectedParqueaderoId] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    fetchParqueaderos();
  }, []);

  const fetchParqueaderos = async () => {
    try {
      const res = await axios.get(config.apiUrl);
      setParqueaderos(res.data);
    } catch (error) {
      console.error("Error fetching parqueaderos:", error);
    }
  };

  const handleReservarClick = (parqueaderoId) => {
    setSelectedParqueaderoId(parqueaderoId);
    setModalOpen(true);
  };

  return (
    <PortalLayout>
      <div className="posts">
        <div style={{ width: '500px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ borderBottom: '2px solid blue', display: 'inline-block', paddingBottom: '5px' }}>Bienvenido usuario</h1>
        </div>
        <Mapa posts={parqueaderos} />
        <div className="parqueaderos">
          {parqueaderos.map((parqueadero) => (
            <div key={parqueadero._id} className="card">
              <h2>{parqueadero.title}</h2>
              <p>{parqueadero.content}</p>
              <p>Puestos disponibles: {parqueadero.puestos}</p>
              <div style={{ marginLeft: "69px"}}>

              <Link to={`/post/${parqueadero._id}/info`} >
                <img src="https://images.vexels.com/media/users/3/154623/isolated/preview/ec9ca7f0d84780221389129e7adaccf1-icono-de-contacto-de-burbuja-de-discurso-de-informacion.png" alt="" className="whatsapp"/>
              </Link>
              <Link onClick={() => handleReservarClick(parqueadero._id)} >
                <img src="https://cdn-icons-png.flaticon.com/512/2907/2907150.png" alt="" className="whatsapp"/>
              </Link>

              </div>
              
            </div>
          ))}
        </div>
        {/* Modal para reservar */}
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          contentLabel="Reservar"
          className="custom-modal-content"
          overlayClassName="custom-modal-overlay"
        >
          <button onClick={() => setModalOpen(false)} className="modal-boton"> Cerrar</button>
          <CalendarComponent parqueaderoId={selectedParqueaderoId} onClose={() => setModalOpen(false)} />
        </Modal>
      </div>
      <Footer />
    </PortalLayout>
  );
}

export default Dashboard;
