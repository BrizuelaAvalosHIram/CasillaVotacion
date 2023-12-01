// MapView.js
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import Markers from './Markers';

const MapView = () => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const wss = new WebSocket('wss://sistemavotacion.onrender.com/api');

    wss.addEventListener('open', () => {
      console.log('Conexión WebSocket establecida correctamente.');
    });

    wss.addEventListener('message', (event) => {
      try {
        let messageObj = JSON.parse(event.data);
        console.log('Datos recibidos desde la API:', messageObj);
        setApiData(messageObj); // Actualiza el estado con los datos recibidos
      } catch (error) {
        console.error('Error al analizar los datos de la API:', error);
      }
    });

    wss.addEventListener('close', (event) => {
      console.log('Conexión WebSocket cerrada:', event);
    });

    wss.addEventListener('error', (error) => {
      console.error('Error en la conexión WebSocket:', error);
    });

    // Limpiar el WebSocket al desmontar el componente
    return () => {
      wss.close();
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ flex: '0' }}>
        <h1>Mapa</h1>
      </div>
      <div style={{ flex: '1', width: '70vw', height: '50vh', margin: '20px' }}>
        <MapContainer center={{ lat: '19.2459', lng: '-103.7529' }} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Markers />
        </MapContainer>
      </div>
      {apiData && (
        <div>
          <h2>Datos de la API</h2>
          <div className="api-data-container">
            <p><strong>ID Casilla:</strong> {apiData.id_casilla}</p>
            <p><strong>Ciudad:</strong> {apiData.ciudad}</p>
            <p><strong>ID Votante:</strong> {apiData.idVotante}</p>
            <p><strong>Voto:</strong> {apiData.voto}</p>
            <p><strong>Fecha:</strong> {apiData.fecha}</p>
            <p><strong>Hora:</strong> {apiData.hora}</p>
          </div>
        </div>
      )} 
      <h1>Gráfica</h1>
      {/* Agregar el iframe de MongoDB Charts */}
      <iframe
        style={{
          background: '#FFFFFF',
          border: 'none',
          borderRadius: '2px',
          boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
        }}
        width="640"
        height="480"
        src="https://charts.mongodb.com/charts-project-0-cserj/embed/charts?id=65678a54-12c2-41d8-8711-2ce07b5c034d&maxDataAge=60&theme=light&autoRefresh=true"
      ></iframe>
    </div>
  );
};

export default MapView;
