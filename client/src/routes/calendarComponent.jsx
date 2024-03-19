import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from "sweetalert2";

const CalendarComponent = ({ parqueaderoId }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [nombre, setNombre] = useState('');
  const [placa, setPlaca] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');

  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: '¡Reserva Exitosa!',
      text: 'La reserva se ha creado correctamente.',
      confirmButtonText: 'OK'
    });
  };

  const showErrorAlert = (errorMessage) => {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: errorMessage,
      confirmButtonText: 'OK'
    });
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
  };

  const handleSubmit = async () => {
    try {
      if (!time || !nombre || !correo || !telefono || !placa) {
        setError('Por favor, completa todos los campos.');
        return;
      }

      const reservationData = {
        date: formatDate(date), // Formatear la fecha antes de enviarla
        time: time,
        nombre: nombre,
        correo: correo,
        placa: placa,
        telefono: telefono,
        parqueaderoId: parqueaderoId
      };

      const response = await axios.post('http://localhost:5000/api/reserva', reservationData);
      console.log('Reserva creada:', response.data);
      showSuccessAlert();
      navigate("/reservas");
    } catch (error) {
      console.error('Error creating reservation:', error);
      const errorMessage = error.response && error.response.data ? error.response.data.message : 'Error al crear la reserva. Por favor, inténtalo de nuevo más tarde.';
      showErrorAlert(errorMessage);
    }
  };

  return (
    <div className="calendar">
      <div>
        <h1>Hacer Reserva</h1>
      </div>
      <div className="input-container">
        <label htmlFor="">Fecha</label>
        <DatePicker
          selected={date}
          onChange={date => setDate(date)}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label htmlFor="">Hora de llegada</label>
        <input type="time" value={time} onChange={e => setTime(e.target.value)} className="input-field" />
      </div>
      <div className="input-container">
        <label htmlFor="">Nombre</label>
        <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} className="input-field" />
      </div>
      <div className="input-container">
        <label htmlFor="">Correo</label>
        <input type="text" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} className="input-field" />
      </div>

      <div className="input-container">
        <label htmlFor="">Placa</label>
        <input type="text" placeholder="Placa" value={placa} onChange={e => setPlaca(e.target.value)} className="input-field" />
      </div>
      
      <div className="input-container">
        <label htmlFor="">Telefono</label>
        <input type="number" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} className="input-field" />
      </div>
      <button onClick={handleSubmit} className='btn btn-primary'>Enviar</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CalendarComponent;
