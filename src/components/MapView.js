// MapView.js
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import Markers from './Markers';
import BarsChart from './BarsChart';

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

         // Almacena los datos en localStorage para recuperarlos al recargar la página
         localStorage.setItem('lastVote', JSON.stringify(messageObj));
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
    // Recupera los datos almacenados localmente al cargar el componente
    const storedVote = localStorage.getItem('lastVote');
    if (storedVote) {
      setApiData(JSON.parse(storedVote));
    }
    // Limpiar el WebSocket al desmontar el componente
    return () => {
      wss.close();
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ flex: '0' }}>
        <h1>Casilla de votación</h1>
      </div>
      
      <div style={{ flex: '1', width: '70vw', height: '50vh', margin: '20px' }}>
        <MapContainer center={{ lat: '19.2491977030456', lng: '-103.69737828607505' }} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Markers />
        </MapContainer>
      </div>
      {apiData && (
        <div>
          {console.log('Datos de la API:', apiData)}
        </div>
      )} 


      <h1>Gráfica de mongo DB charts</h1>
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
