import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CarouselComponent from './components/CarouselComponent';

function App() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Ruta a mi archivo JSON
    const jsonFilePath = '../eventosToliv.eventsScraps.json';

    // Obtengo los datos del archivo JSON
    fetch(jsonFilePath)
      .then((response) => response.json())
      .then((data) => {
        // Actualizo el estado con los datos de los eventos
        setEvents(data);
      })
      .catch((error) => {
        console.error('Error al cargar el archivo JSON', error);
      });
  }, []);

  // Función para manejar cambios en el cuadro de búsqueda
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtra los eventos según el término de búsqueda
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <CarouselComponent events={events} />
      <br />
      <div className="container">
        {/* Cuadro de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={handleSearch}
          className="form-control mb-4"
        />

        <div className="row">
          {filteredEvents.map((event, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="neon-border">
                <div className="card border">
                  <img
                    className="card-img-top img-fluid"
                    src={event.image_url}
                    alt="Card cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{event.name}</h5>
                    <p className="card-text">
                      {event.description && event.description.length > 30
                        ? event.description.substring(0, 30) + '...'
                        : event.description}
                    </p>
                    {event.description && event.description.length > 30 && (
                      <p className="card-text d-none">{event.description}</p>
                    )}
                    <p className="card-text">
                      Desde: {event.start_at}, Hasta: {event.end_at}
                    </p>
                    <p className="card-text">Lugar: {event.city}</p>
                    <a href={event.event_url} className="btn">
                      Ver Tickets
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
