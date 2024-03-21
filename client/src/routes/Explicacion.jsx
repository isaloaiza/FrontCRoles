import React from 'react';
import '../assets/Explicacion.css';
import PortalLayout from '../layout/PortalLayout';

export default function Explicacion() {
  const reproducirVideo = () => {
    // URL del video de YouTube
    const videoUrl = 'https://youtu.be/O9sj8yejEtk';
    // Abre una nueva ventana emergente con el video de YouTube
    window.open(videoUrl, '_blank', 'noopener noreferrer');
  };

  return (
    <PortalLayout>
      <div className="explicacion-container">
        <div className="steps-container">
          <h1>Pasos para crear su parqueadero en ParkingLocation</h1>
          <ol>
            <li>Ingresar al sistema de ParkingLocation.</li>
            <li>Ir al apartado de crear parqueadero.</li>
            <li>Dar clic en el botón "Crear Parqueadero".</li>
            <li>Llenar los datos del formulario.</li>
            <p>
              Para encontrar la latitud y longitud, puedes hacerlo de la siguiente forma:
              <a href="https://coordinates-gps.gosur.com/es/" target="_blank" rel="noopener noreferrer">click aquí</a>.
            </p>
            <li>El Parqueadero será validado y finalmente creado.</li>
            <div>
              <button onClick={reproducirVideo}>Ver Video</button>
            </div>
          </ol>
        </div>
        <div className="image-container">
          <img src="https://i.ibb.co/5KvC9QQ/Wireframing-bro-removebg-preview.png" alt="Imagen explicativa" className='intentoimg'/>
        </div>
      </div>
    </PortalLayout>
  );
}
