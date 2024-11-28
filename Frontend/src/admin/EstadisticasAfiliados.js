import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import './EstadisticasAfiliados.css';

const EstadisticasAfiliados = () => {
  const [data, setData] = useState({
    ninos: { sexo: [], edad: [], estado: [], nivel_estudios: [] },
    adultosMayores: { sexo: [], edad: [], estado: [], nivel_estudios: [] },
    discapacidad: { sexo: [], edad: [], estado: [], nivel_estudios: [] }
  });

  useEffect(() => {
    // Obtener estadísticas para niños en etapa terminal
    fetch('http://localhost:5000/api/estadisticas/ninos')
      .then(response => response.json())
      .then(data => {
        setData(prevState => ({
          ...prevState,
          ninos: {
            sexo: [["Sexo", "Cantidad"], ...data.sexo.map(item => [item.sexo, item.count])],
            edad: [["Edad", "Cantidad"], ...data.edad.map(item => [item.edad, item.count])],
            estado: [["Estado", "Cantidad"], ...data.estado.map(item => [item.estado, item.count])],
            nivel_estudios: [["Nivel de Estudios", "Cantidad"], ...data.nivel_estudios.map(item => [item.nivel_estudios, item.count])],
          }
        }));
      });

    // Obtener estadísticas para adultos mayores
    fetch('http://localhost:5000/api/estadisticas/adultos-mayores')
      .then(response => response.json())
      .then(data => {
        setData(prevState => ({
          ...prevState,
          adultosMayores: {
            sexo: [["Sexo", "Cantidad"], ...data.sexo.map(item => [item.sexo, item.count])],
            edad: [["Edad", "Cantidad"], ...data.edad.map(item => [item.edad, item.count])],
            estado: [["Estado", "Cantidad"], ...data.estado.map(item => [item.estado, item.count])],
            nivel_estudios: [["Nivel de Estudios", "Cantidad"], ...data.nivel_estudios.map(item => [item.nivel_estudios, item.count])],
          }
        }));
      });

    // Obtener estadísticas para personas con discapacidad
    fetch('http://localhost:5000/api/estadisticas/personas-discapacidad')
      .then(response => response.json())
      .then(data => {
        setData(prevState => ({
          ...prevState,
          discapacidad: {
            sexo: [["Sexo", "Cantidad"], ...data.sexo.map(item => [item.sexo, item.count])],
            edad: [["Edad", "Cantidad"], ...data.edad.map(item => [item.edad, item.count])],
            estado: [["Estado", "Cantidad"], ...data.estado.map(item => [item.estado, item.count])],
            nivel_estudios: [["Nivel de Estudios", "Cantidad"], ...data.nivel_estudios.map(item => [item.nivel_estudios, item.count])],
          }
        }));
      });
  }, []);
  
 // Función para calcular el total
 const calcularTotal = (datos) => {
  // Validar si datos contiene al menos un encabezado antes de calcular
  if (datos.length < 2) return 0;
  return datos.slice(1).reduce((total, item) => total + item[1], 0);
};
  const opciones = {
    is3D: true,
    legend: { position: "bottom" },
    tooltip: { text: 'percentage' },
    chartArea: {
      width: '80%',
      height: '70%'
    },
    // Configuración para barras verticales
    bars: 'vertical',  // Especificamos que queremos barras verticales
    vAxis: {
      format: '0',
      title: 'Cantidad',
      gridlines: {
        color: '#E0E0E0'
      },
      minValue: 0
    },
    hAxis: {
      title: '',
      textStyle: {
        fontSize: 12
      }
    },
    
    // Para gráficos de barras (Edad, Estado, Nivel de Estudios) se puede asignar colores
    colors: [
      '#FF6F00', 
      '#0C1844', 
      '#FFB07C', 
      '#FFDBA4'
    ], // Colores diferentes para cada barra
  };

  return (
    
    <div className="container">
      <h1>Estadísticas de Beneficiarios</h1>

      {/* Gráficas de Distribución por Sexo */}
<div className="chart-container">
  <h2 className="chart-title">Distribución por Sexo</h2>
  <div className="chart">
    <h3>Niños en Etapa Terminal</h3>
    <div className="chart-summary">
      <span className="total-count">
        Total: {calcularTotal(data.ninos.sexo).toLocaleString()} personas
      </span>
    </div>
    <Chart chartType="PieChart" data={data.ninos.sexo} options={opciones} width={"100%"} height={"300px"} />
  </div>
  <div className="chart">
    <h3>Adultos Mayores</h3>
    <div className="chart-summary">
      <span className="total-count">
        Total: {calcularTotal(data.adultosMayores.sexo).toLocaleString()} personas
      </span>
    </div>
    <Chart chartType="PieChart" data={data.adultosMayores.sexo} options={opciones} width={"100%"} height={"300px"} />
  </div>
  <div className="chart">
    <h3>Personas con Discapacidad</h3>
    <div className="chart-summary">
      <span className="total-count">
        Total: {calcularTotal(data.discapacidad.sexo).toLocaleString()} personas
      </span>
    </div>
    <Chart chartType="PieChart" data={data.discapacidad.sexo} options={opciones} width={"100%"} height={"300px"} />
  </div>
</div>


      {/* Gráficas de Distribución por Edad */}
      <div className="chart-container">
        <h2 className="chart-title">Distribución por Edad</h2>
        <div className="chart">
          <h3>Niños en Etapa Terminal</h3>
          <Chart chartType="ColumnChart" data={data.ninos.edad} options={opciones} width={"100%"} height={"300px"} />
        </div>
        <div className="chart">
          <h3>Adultos Mayores</h3>
          <Chart chartType="ColumnChart" data={data.adultosMayores.edad} options={opciones} width={"100%"} height={"300px"} />
        </div>
        <div className="chart">
          <h3>Personas con Discapacidad</h3>
          <Chart chartType="ColumnChart" data={data.discapacidad.edad} options={opciones} width={"100%"} height={"300px"} />
        </div>
      </div>

      {/* Gráficas de Distribución por Estado */}
      <div className="chart-container">
        <h2 className="chart-title">Distribución por Estado</h2>
        <div className="chart">
          <h3>Niños en Etapa Terminal</h3>
          <Chart chartType="ColumnChart" data={data.ninos.estado} options={opciones} width={"100%"} height={"300px"} />
        </div>
        <div className="chart">
          <h3>Adultos Mayores</h3>
          <Chart chartType="ColumnChart" data={data.adultosMayores.estado} options={opciones} width={"100%"} height={"300px"} />
        </div>
        <div className="chart">
          <h3>Personas con Discapacidad</h3>
          <Chart chartType="ColumnChart" data={data.discapacidad.estado} options={opciones} width={"100%"} height={"300px"} />
        </div>
      </div>

      {/* Gráficas de Distribución por Nivel de Estudios */}
      <div className="chart-container">
        <h2 className="chart-title">Distribución por Nivel de Estudios</h2>
        <div className="chart">
          <h3>Niños en Etapa Terminal</h3>
          <Chart chartType="ColumnChart" data={data.ninos.nivel_estudios} options={opciones} width={"100%"} height={"300px"} />
        </div>
        <div className="chart">
          <h3>Adultos Mayores</h3>
          <Chart chartType="ColumnChart" data={data.adultosMayores.nivel_estudios} options={opciones} width={"100%"} height={"300px"} />
        </div>
        <div className="chart">
          <h3>Personas con Discapacidad</h3>
          <Chart chartType="ColumnChart" data={data.discapacidad.nivel_estudios} options={opciones} width={"100%"} height={"300px"} />
        </div>
      </div>
    </div>

  );
};

export default EstadisticasAfiliados;