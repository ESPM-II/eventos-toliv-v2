import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import '../carousel.css';

const CarouselComponent = ({ events }) => {
  const containerStyle = {
    height: '500px',
    overflow: 'hidden',
    position: 'relative',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Opacidad del 70%
  };

  const neonTextStyle = {
    textShadow: '0 0 10px rgba(0, 191, 255, 1), 0 0 20px rgba(0, 191, 255, 1), 0 0 30px rgba(0, 255, 0, 1)',
    color: '#fff',
  };

  const captionStyle = {
    position: 'absolute',
    right: '50%', // Mover el texto hacia la derecha
    top: '50%',
    transform: 'translateY(-50%)',
    width: '70%', // Ajustar el ancho máximo del título
    textAlign: 'right', // Alinear el texto a la derecha
    padding: '0 50px 0 30px', // Agregar padding a los lados
    margin: '0 50px 0 50px',
  };

  const descriptionStyle = {
    ...neonTextStyle,
    fontSize: '18px',
    lineHeight: '1.5',
    marginTop: '10px',
    whiteSpace: 'normal', // Permitir saltos de línea
    margin: '0 0 0 30%', // Agregar padding a los lados
  };

  const buttonStyle = {
    marginTop: '20px',
    background: 'none',
    border: '2px solid rgba(0, 255, 0, 1)',
    color: '#fff',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '5px',
    ...neonTextStyle,
  };

  const formatEventTitle = (title) => {
    return title.replace(/-/g, ' ');
  };

  return (
    <div style={containerStyle}>
      <Carousel>
        {events.map((event) => (
          <Carousel.Item key={event.id}>
            <img
              className="d-block w-100"
              src={event.image_url}
              alt={event.title}
              style={{ objectFit: 'cover', height: '500px', width: '300px' }}
            />
            <div style={overlayStyle}></div>
            <Carousel.Caption style={captionStyle}>
              <h3 style={neonTextStyle}>{formatEventTitle(event.name)}</h3>
              <p style={descriptionStyle}>
                {event.description && event.description.length > 100
                  ? `${event.description.substring(0, 500)}...`
                  : event.description}
              </p>
              <a href={event.event_url} target="_blank" rel="noopener noreferrer">
                <button className="button-hover" style={buttonStyle}>
                  Ver más
                </button>
              </a>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
