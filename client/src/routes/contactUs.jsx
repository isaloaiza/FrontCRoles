import DefaultLayout from "../layout/DefaultLayout";
import emailjs from '@emailjs/browser';
import React, { useRef } from "react";
import '../assets/Contac.css'
import { RiMailFill,  RiTwitterXFill } from "react-icons/ri";
import { FaPhone, FaFacebook } from "react-icons/fa6";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import Footer from "../components/Footer";



const ContactUs = () => {
  const refForm = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const serviceId = "service_ghhs3xh";
    const templateId = "template_qjyqutf";
    const apiKey = "y8ZnVdPiGF3qDQgh5";

    emailjs.sendForm(serviceId, templateId,refForm.current, apiKey)
      .then(result => console.log(result.text))
      .catch(error => console.error(error));
  };

  return (
    <DefaultLayout>
    <div className="contacto">
     
    <div className="box-info">
        <h1>CONTÁCTATE CON NOSOTROS</h1>
        <div className="data">
            <p><FaPhone />   +57 323 588 8007</p>
            <p> <RiMailFill/>   parkinlocation750@gmail.com</p>
        </div>
        <div className="links">
            <a href="#"><FaFacebook /></a>
            <a href="#"><BsInstagram/></a>
            <a href="#"><RiTwitterXFill/></a>
            <a href="#"><BsLinkedin /></a>
        </div>
    </div>
    <form onSubmit={handleSubmit}>
        <div className="input-box">
         <input name="username" type="text" placeholder="ej: Maria Luisa" required  />
             
            
        </div>
        <div className="input-box">
            <input type="email" placeholder="ej marialuisaalonso850@gmail.com" name="email" required />
            <i className="fa-solid fa-envelope"></i>
        </div>
        <div className="input-box">
            <textarea maxLength={500} placeholder="Escribe tu mensaje" name="message" id="" cols={30} rows={10}></textarea>
        </div>
        <button type="submit">Enviar mensaje</button>
    </form>
   
</div>

<Footer />
</DefaultLayout>
  );
};

export default ContactUs;
