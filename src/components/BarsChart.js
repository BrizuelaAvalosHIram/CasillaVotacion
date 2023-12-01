import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);
let votos = [];
const BarsChart = () => 
{
  setTimeout(() => {
    console.log(votos);
  }, 20000); 

  data = votos; 
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Votos',
        data: [],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Configuración de la conexión WebSocket
     const wss = new WebSocket('wss://sistemavotacion.onrender.com/api');
    wss.addEventListener('open', () => {
      console.log('Conexión WebSocket establecida correctamente.');
      wss.addEventListener('message', (event) => {
        try {
          const messageObj = JSON.parse(event.data);
          votos.push(messageObj);
          console.log('Datos recibidos desde la API (BarsChart):', messageObj);
          setData((prevData) => ({
            ...prevData,
            labels: messageObj.labels,
            datasets: [
              {
                ...prevData.datasets[0],
                data: messageObj.data,
              },
            ],
          }));
        } catch (error) {
          console.error('Error al procesar el mensaje WebSocket:', error);
        }
      });

      wss.addEventListener('error', (error) => {
        console.error('Error en la conexión WebSocket:', error);
      });

      wss.addEventListener('close', (event) => {
        console.warn('Conexión WebSocket cerrada:', event);
      });
    });

    // Cierra la conexión WebSocket cuando el componente se desmonta
    return () => {
      wss.close();
    };
  }, []); // El array de dependencias vacío asegura que este efecto se ejecute solo una vez al montar el componente

  const options = {
    responsive: true,
    animation: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 500,
        title: {
          display: true,
          text: 'Votos',
        },
      },
      x: {
        ticks: { color: 'red' },
        title: {
          display: true,
          text: 'Candidatos',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarsChart;
