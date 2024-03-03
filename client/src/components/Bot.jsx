
import Modal from 'react-modal';

const Chatbot = ({isOpen, closeModal}) => {
  return (
    <Modal className="modalchat"
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel="Example Modal"
    >
    <div className="modalC">
    <h2>modal chatbot</h2>
    <iframe src='https://webchat.botframework.com/embed/iaparking-bot?s=ivS8Ddy-QX4.75llnWMLjbSI8HxhMrZzUIDdlaLqSy9qMe1dFr5rIws' className='frame'></iframe>
    <button onClick={closeModal} className='crear'>Cerrar</button>

    </div>
    </Modal>
    )
}

export default Chatbot;
