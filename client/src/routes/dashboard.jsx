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
import { FcInfo, FcFinePrint } from "react-icons/fc";


const Dashboard = () => {
  const {  getRol } = useAuth();
  const auth = useAuth();
  const [parqueaderos, setParqueaderos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedParqueaderoId, setSelectedParqueaderoId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(config.apiUrl, {
          headers: {
            Authorization: `Bearer ${auth.getAccessToken()}`
          }
        });
        if (response.status === 200) {
          setParqueaderos(response.data);
        } else {
          console.error("Error al obtener los posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error al obtener los posts:", error);
      }
    };

    fetchPosts();
  }, [auth]);


  const handleReservarClick = (parqueaderoId) => {
    setSelectedParqueaderoId(parqueaderoId);
    setModalOpen(true);
  };

  // Filtrar parqueaderos según el término de búsqueda
  const filteredParqueaderos = parqueaderos.filter(parqueadero => {
    return parqueadero.title.toLowerCase().includes(searchTerm.toLowerCase());
  });


  

  return (
    <PortalLayout>
      <div className="posts">
        <div style={{ width: '500px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ borderBottom: '2px solid blue', display: 'inline-block', paddingBottom: '5px' }}>Bienvenido {getRol()}</h1>
          {/* Campo de búsqueda */}
          {/* <h2>Rol: {getRol()}</h2> */}
          {/* <h2> {auth.getUser() ? auth.getUser().id : ""}</h2> */}
        </div>
        <Mapa posts={filteredParqueaderos} />

        <div className="table__header">
          <h1>Parqueaderos</h1>
          <div className="input-group">
            <input type="search" className="burcasor" placeholder="Busca Parqueaderos..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
          </div>

        </div>
       
      
        <div className="parqueaderos">

        
          {filteredParqueaderos.map((parqueadero) => (
           <div className="card" key={parqueadero._id}>
           <div className="card-header">
             <p>{parqueadero.content}</p>
             <span className="title">{parqueadero.title}</span>
           </div>
           <div className="card-author">
             <a className="author-avatar" href="#">
               <span>
             </span></a>
             <svg className="half-circle" viewBox="0 0 106 57">
               <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
             </svg>
             <div className="author-name">
               <div className="author-name-prefix">Puestos disponibles: {parqueadero.puestos}</div> {parqueadero.horarios}
               </div>
             </div>
             <div className="tags">
            
              <Link to={`/post/${parqueadero._id}/info`} > 
              <FcInfo /> info
                           </Link>

              
               <Link onClick={() => handleReservarClick(parqueadero._id)} >
               <FcFinePrint /> reserva
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
          {/* <button onClick={() => setModalOpen(false)} className="modal-boton"> Cerrar</button> */}
          <CalendarComponent parqueaderoId={selectedParqueaderoId} onClose={() => setModalOpen(false)} />
        </Modal>

      </div>
      <Footer />
    </PortalLayout>
  );
}

export default Dashboard;
