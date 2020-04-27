import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Autocomplete from 'react-google-autocomplete';

const App = () => {

  const [lugarActual, setLugAct] = useState();

  useEffect(() => {
    console.log(lugarActual);
  }, [lugarActual])

  const renderBusqueda = ()=>{

    return (
      <div>
        <p>Lugar: {lugarActual.place.formatted_address}</p>
        <p>Id: {lugarActual.place.place_id}</p>
        <p>Latitud: {lugarActual.place.geometry.location.lat()}</p>
        <p>Longitud: {lugarActual.place.geometry.location.lng()}</p>
      </div>
    )
  }
  // Lugar: Goya, Corrientes, Argentina

  // Id: ChIJ7ztSBZaETpQR4ZoyalQRCXw
  
  // Latitud: -29.1442242
  
  // Longitud: -59.2643242
  return (
    <div className="App">
      <header className="App-header Columna">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Forecast app by Belimon.
        </p>

        <Autocomplete
          style={{ width: '90%' }}
          onPlaceSelected={(place) => {setLugAct({place})}}
          types={['(regions)']}
        />

      </header>
      <div className="App-body Columna">
        {
          lugarActual ? (
            renderBusqueda()
          ) : (
              <p> Sin busqueda</p>
            )
        }
      </div>
    </div>
  );
}

export default App;
