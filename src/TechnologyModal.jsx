import Modal from './Modal';

function TechnologyModal({ isOpen, onClose, technology = {}, onSave }) {
  const handleSave = () => {
    // вызываем callback (можно расширить для редактирования полей)
    onSave && onSave(technology.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Технология: ${technology.title || ''}`}>
      <div>
        <p>{technology.description}</p>
        <p>Статус: <strong>{technology.status}</strong></p>
        <button onClick={handleSave}>Ок</button>
      </div>
    </Modal>
  );
}

export default TechnologyModal;
