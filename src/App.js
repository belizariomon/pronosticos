import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Autocomplete from 'react-google-autocomplete';
import RenderLugar from './MemoLugar';

const App = () => {
  const [lugarActual, setLugAct] = useState();
  const [historialBus, setHistoBus] = useState();
  
  useEffect(() => {
    leerHistoLocal()
  }, []);

  const ajustoLugar = (_item) => {
    console.log(_item)
    var lugar = {
      id: _item.place.place_id,
      lat: _item.place.geometry.location.lat(),
      lon: _item.place.geometry.location.lng(),
      nombre: _item.place.formatted_address
    } 
    setLugAct(lugar)
  }

  const leerHistoLocal = () => {
    var listaHisto = JSON.parse(localStorage.getItem('dataFromReactApp')) || [];
    setHistoBus(listaHisto)  
  }

  const agregarItemHistoLocal = (_item) => {
    if (historialBus.find(x => x.id ===_item.id) === undefined) historialBus.push(_item)
    if (historialBus.lenght > 5) historialBus.pop()
    localStorage.setItem('dataFromReactApp', JSON.stringify(historialBus));
  }

  const visualiarBusquedaH = (_item) => {
    var lugar = {
      id: _item.id,
      lat: _item.lat,
      lon: _item.lon,
      nombre: _item.nombre
    } 
    setLugAct(lugar)
  }
 
  const renderHistorial = () => {
    if (historialBus) {
      return (
        <div style={{display:"flex", flexDirection:"row", width:"90%", marginLeft: "auto"}}>
          {
            historialBus.map((item, key) => (
              <div key={key} className="Card" style={{cursor:'pointer', padding:20, margin:20}} onClick={()=>visualiarBusquedaH(item)}>
                <p >{item.nombre}</p>
                <p>{item.lat}</p>
                <p>{item.lon}</p>
              </div>
            ))
          }
        </div>
      )
    }
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
          style={{ width: '90%',fontSize:'inherit' }}
          onPlaceSelected={(place) => {ajustoLugar({place})}}
          types={['(regions)']}
        />

      </header>

      <div className="App-body Columna" >

        {/* Sección para el lugar buscado */}
        {
          lugarActual ? (
            <RenderLugar lugar={lugarActual} agregarItemHistoLocal={agregarItemHistoLocal}/>
          ) : (
              <p></p>
            )
        }

        {/* Sección para el historial */}
        <p>Busquedas recientes </p>
        <div >
          {renderHistorial()}
        </div>

      </div>
    </div>
  )
}

export default App;  