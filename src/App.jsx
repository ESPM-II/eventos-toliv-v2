import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CarouselComponent from './components/CarouselComponent';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

function App() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEventMenu, setShowEventMenu] = useState(false);

  useEffect(() => {
    fetch('http://20.241.208.105/api/events')
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error('Error al cargar los eventos desde la API', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Menú superior */}
      <Navbar expand="lg" bg="light" variant='light' className="fixed-top">
        {/* LOGO */}
        <Navbar.Brand href="/">
          <span style={{ color: 'orange', fontSize: '24px'}}>Tv</span>
        </Navbar.Brand>

        {/* Cuadro de búsqueda */}
        <div className="container text-center">
          <input
            type="text"
            placeholder='buscar por nombre de evento'
            value={searchTerm}
            onChange={handleSearch}
            className='form-control mb-4'
          />
        </div>

        {/* BOTONES A LA DERECHA */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ marginLeft: 'auto' }}>
            <Nav.Link href="/">Inicio</Nav.Link>
            {/* BOTON DESPLEGABLE DE EVENTOS */}
            <NavDropdown 
              title="Eventos"
              id="basic-nav-dropdown"
              show={showEventMenu}
              onMouseEnter={() => setShowEventMenu(true)}
              onMouseLeave={() => setShowEventMenu(false)}
            >
              {/* Opciones del menú de eventos */}
              <NavDropdown.Item href="#chile">
                Chile
              </NavDropdown.Item>
              <NavDropdown.Item href="#peru">
                Perú
              </NavDropdown.Item>
              <NavDropdown.Item href="#global">
                Online
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/ingresa">Ingresa</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Contenido principal */}
      <div className="main-content">
        <CarouselComponent events={events} />
        <br />
        <div className="container">
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
      </div>
    </>
  );
}

export default App;
