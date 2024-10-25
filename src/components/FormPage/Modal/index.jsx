const Modal = ({ onClose }) => {

    return (
      <div className="modalcontainer">
        <center>
          <div className="Modal">
            <h1 className="modalh1">Información</h1>
            <p className="Text">
              Su reserva será confirmada en unos minutos. Por favor, esté atento a su correo electrónico, donde
              recibirá toda la información sobre la aprobación o rechazo de su solicitud.
            </p>
            <p className="Text">
              <b>Tenga en cuenta lo siguiente:</b>
            </p>
            <ul className="Text">
              <li>El horario de inicio del servicio de préstamo es a partir de las 7:30 am y el cierre será a las 5:00 pm.</li>
              <li>Los salones están disponibles desde las 7:30 am hasta las 5:00 pm del día.</li>
              <li>Si no se presenta dentro de 15 minutos posteriores a la hora reservada, su reserva se considerará cancelada.</li>
            </ul>
            {/* Botón para cerrar el mensaje */}
            <button onClick={onClose}>Cerrar</button>
          </div>
        </center>
      </div>
    );
  };
  
  export default Modal