import PopupWithForm from "./PopupWithForm";

const PopupWithSubmit = ({ isOpen, onClose, onConfirm, onLoading }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onConfirm();
  };

  return (
    <PopupWithForm
      name="profileData"
      title="Вы уверены?"
      buttonText={onLoading ? `Удаление...` : `Удалить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default PopupWithSubmit;
