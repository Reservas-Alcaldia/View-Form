import React, { useState} from 'react';

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    address: '',
    ministry: '',
    fecha_reserva: '',
    startTime: '',
    endTime: '',
    assistants: '',
    purpose: '',
    additionalEquipment: []
  });

  const [showDropdown, setShowDropdown] = useState(false); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'checkbox') {
      setFormData((prevState) => {
        if (checked) {
          return {
            ...prevState,
            additionalEquipment: [...prevState.additionalEquipment, value]
          };
        } else {
          return {
            ...prevState,
            additionalEquipment: prevState.additionalEquipment.filter((item) => item !== value)
          };
        }
      });
    } else if (name === 'phoneNumber' || name === 'assistants') {
      if (value === '' || Number.isInteger(Number(value))) {
        setFormData({ ...formData, [name]: value });
      }
    
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSubmit(); // Call the onSubmit handler from App
  };

  return (
    <>
      <div className='form-container'>
        
        <h1>Formulario de Reserva de Salones</h1>

        <form onSubmit={handleSubmit}>
          <div className='row'>
              <input
              type="text"
              name="name"
              placeholder='Nombre'
              value={formData.name}
              onChange={handleChange}
              required
              className='Row'
              />
          
              <input
              type="text"
              name="surname"
              placeholder='Apellido'
              value={formData.surname}
              onChange={handleChange}
              required
              className='Row'
              />
          </div>

          <div className='row'>
              <input
              type="email"
              name="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              required
              className='iRow'
              />
          </div>

          <div className='row'>
              <input
              type="number"
              name="phoneNumber"
              placeholder='Teléfono'
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              step="1"
              className='Row'
              />
          
              <input
              type="text"
              name="address"
              placeholder='Dirección'
              value={formData.address}
              onChange={handleChange}
              required
              className='Row'
              />
          </div>

          <div className='row'>
              <select
              name="ministry"
              value={formData.ministry}
              onChange={handleChange}
              required
              >
              <option value="" disabled>Secretaria donde perteneces</option>
              <option value="option1">Opción 1</option>
              <option value="option2">Opción 2</option>
              </select>
          </div>

          <div className='row'>
              <input
              type="date"
              name="fecha_reserva"
              value={formData.fecha_reserva}
              onChange={handleChange}
              className='iRow'
              placeholder='Fecha de Reserva'
              required
              />
          </div>

          <div className='row'>
              <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              placeholder='Hora de Inicio'
              min={"7:30"}
              max={"17:00"}
              required
              className='Row'
              />

              <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              placeholder='Hora de Finalización'
              min={"7:30"}
              max={"17:00"}
              required
              className='Row'
              />
          </div>

          <div className='row'>
              <input
              type="number"
              name="assistants"
              placeholder='Número de asistentes'
              value={formData.assistants}
              onChange={handleChange}
              required
              className='iRow'
              />
          </div>

          <div className='row'>
              <input
              type="text"
              name="purpose"
              placeholder='Propósito de la reunión'
              value={formData.purpose}
              onChange={handleChange}
              required
              className='iRow'
              />
          </div>

          <div>
              <button type="button" className='BtnDropdown' onClick={handleDropdownToggle}>
                  ¿Necesita Equipamiento Adicional?
              </button>
              {showDropdown && (
                  <div className="dropdown">
                  <label>
                      <input
                      type="checkbox"
                      name="additionalEquipment"
                      value="Portatil"
                      checked={formData.additionalEquipment.includes('Portatil')}
                      onChange={handleChange}
                      />
                      Portatil
                  </label>
                  <label>
                      <input
                      type="checkbox"
                      name="additionalEquipment"
                      value="Hdmi"
                      checked={formData.additionalEquipment.includes('Hdmi')}
                      onChange={handleChange}
                      />
                      Hdmi
                  </label>
                  </div>
              )}
          </div>
        </form>
    
      </div>
      <button type="button" className='submit' onClick={handleSubmit}>Enviar</button>
    </>
  );
};

export default UserForm;