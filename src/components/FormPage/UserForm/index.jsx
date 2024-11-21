import React, { useState, useEffect } from 'react';
import secretariasData from '../../../const/alcaldias.json';
import Modal from '../Modal';

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
    additionalEquipment: [],
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [secretarias, setSecretarias] = useState([]);
  const [errors, setErrors] = useState({}); // To hold validation error messages

  useEffect(() => {
    if (secretariasData && secretariasData.secretarias && Array.isArray(secretariasData.secretarias)) {
      setSecretarias(secretariasData.secretarias);
    } else {
      console.error('Error: Datos de secretarías no están correctamente estructurados.');
      setSecretarias([]);
    }
  }, []);

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
        setFormData({
          ...formData,
          [name]: name === 'assistants' ? Number(value) : value,
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  // Validation function
  const validateForm = () => {
    const errors = {};
    const today = new Date();
    const selectedDate = new Date(formData.fecha_reserva);
    
    // Validate phone number and assistants for negative values
    if (formData.phoneNumber < 0) {
      errors.phoneNumber = 'El número de teléfono no puede ser negativo.';
    }
    if (formData.assistants < 0) {
      errors.assistants = 'El número de asistentes no puede ser negativo.';
    }

    if (!formData.email.includes('@medellin.gov.co')) {
      errors.email = 'El correo debe ser de dominio medellin.gov.co.';
    }

    if (selectedDate <= today) {
      errors.fecha_reserva = 'La fecha de reserva debe ser en el futuro.';
    }

    const [startHour, startMinute] = formData.startTime.split(':').map(Number);
    const [endHour, endMinute] = formData.endTime.split(':').map(Number);

    if (
      (startHour < 7 || (startHour === 7 && startMinute < 0)) ||
      (endHour > 17 || (endHour === 17 && endMinute > 30))
    ) {
      errors.time = 'Las horas deben estar entre 7:00 AM y 5:30 PM.';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const requestData = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      phoneNumber: Number(formData.phoneNumber),
      address: formData.address,
      ministry: formData.ministry,
      fecha_reserva: formData.fecha_reserva,
      startTime: formData.startTime,
      endTime: formData.endTime,
      assistants: Number(formData.assistants),
      purpose: formData.purpose,
      additionalEquipment: formData.additionalEquipment
    };

    console.log('Request Data:', requestData);

    try {
      const response = await fetch('http://localhost:3000/solicitud/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Server Error Response:', errorResponse);
        throw new Error('Error al enviar la solicitud');
      }

      const responseData = await response.json();
      console.log('Respuesta del servidor:', responseData);
      alert('Solicitud enviada con éxito');
      setShowModal(true);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Hubo un error al enviar la solicitud');
    }

    console.log(formData);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
              className={`Row ${errors.name ? 'error' : ''}`}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
            <input
              type="text"
              name="surname"
              placeholder='Apellido'
              value={formData.surname}
              onChange={handleChange}
              required
              className={`Row ${errors.surname ? 'error' : ''}`}
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
              className={`iRow ${errors.email ? 'error' : ''}`}
            />
          </div>
          {errors.email && <p className="error-message">{errors.email}</p>}

          <div className='row'>
            <input
              type="number"
              name="phoneNumber"
              placeholder='Teléfono'
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              step="1"
              className={`Row ${errors.phoneNumber ? 'error' : ''}`}
            />
            <input
              type="text"
              name="address"
              placeholder='Dirección'
              value={formData.address}
              onChange={handleChange}
              required
              className={`Row ${errors.address ? 'error' : ''}`}
            />
          </div>
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}

          <div className="row">
            <select
              name="ministry"
              value={formData.ministry}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Secretaría donde perteneces
              </option>
              {secretarias.length > 0 ? (
                secretarias.map((secretaria) => (
                  <option key={secretaria.id} value={secretaria.Nombre}>
                    {secretaria.Nombre}
                  </option>
                ))
              ) : (
                <option disabled>No hay secretarías disponibles</option>
              )}
            </select>
          </div>

          <div className='row'>
            <input
              type="date"
              name="fecha_reserva"
              value={formData.fecha_reserva}
              onChange={handleChange}
              className={`iRow ${errors.fecha_reserva ? 'error' : ''}`}
              placeholder='Fecha de reserva'
              required
            />
          </div>
          {errors.fecha_reserva && <p className="error-message">{errors.fecha_reserva}</p>}

          <div className='row'>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              placeholder='Hora de Inicio'
              min={"07:30"}
              max={"17:30"}
              required
              className={`Row ${errors.time ? 'error' : ''}`}
            />
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              placeholder='Hora de Finalización'
              min={"07:30"}
              max={"17:30"}
              required
              className={`Row ${errors.time ? 'error' : ''}`}
            />
          </div>
          {errors.time && <p className="error-message">{errors.time}</p>}

          <div className='row'>
            <input
              type="number"
              name="assistants"
              placeholder='Número de asistentes'
              value={formData.assistants}
              onChange={handleChange}
              required
              className={`iRow ${errors.assistants ? 'error' : ''}`}
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
              className={`iRow ${errors.purpose ? 'error' : ''}`}
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
      {showModal && <Modal onClose={handleCloseModal} />}
    </>
  );
};

export default UserForm;
