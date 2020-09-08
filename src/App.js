import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Autocomplete from 'react-google-autocomplete';
import { MemoLugar } from './components/MemoLugar';
import { Historial } from './components/Historial';

const App = () => {

  const [lugarActual, setLugAct] = useState();
  const [historialBus, setHistoBus] = useState();

  useEffect(() => {
    leerHistoLocal()
  }, []);

  const ajustoLugar = (item) => {
    const { place_id, geometry, formatted_address } = item.place
    const lugar = {
      id: place_id,
      lat: geometry.location.lat(),
      lon: geometry.location.lng(),
      nombre: formatted_address
    }
    setLugAct(lugar) 
    agregarItemHistoLocal(lugar)
  }

  const leerHistoLocal = () => {
    var listaHisto = JSON.parse(localStorage.getItem('dataFromReactApp')) || [];
    setHistoBus(listaHisto)
  }

  const agregarItemHistoLocal = (item) => {
    if (historialBus.find(x => x.id === item.id) === undefined) historialBus.push(item)
    if (historialBus.length > 5) historialBus.shift()
    localStorage.setItem('dataFromReactApp', JSON.stringify(historialBus));
    leerHistoLocal()
  }

  return (
    <div className="App">
      <header className="App-header Columna">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Forecast app by Belimon.
        </p>

        {/* Sección del buscador: react-google-autocomplete me pareció ideal para lo que necesitaba y ya estaba empaquetado */}
        <Autocomplete
          style={{ width: '90%', fontSize: 'inherit' }}
          onPlaceSelected={(place) => { ajustoLugar({ place }) }}
          types={['(regions)']}
        />

      </header>

      <div className="App-body Columna" >

        {/* Sección para el lugar buscado */}
        {
          lugarActual ? (
            <MemoLugar lugar={lugarActual} agregarItemHistoLocal={agregarItemHistoLocal} />
          ) : (
              <p></p>
            )
        }

        {/* Sección para el historial */}
        <div >
          {
            <Historial historialBus={historialBus} setLugAct={setLugAct}/>
          }
        </div>

      </div>
    </div>
  )
}

export default App;  