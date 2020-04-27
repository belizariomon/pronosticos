import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Autocomplete from 'react-google-autocomplete';
import RenderLugar from './MemoLugar';

const App = () => {

  const [lugarActual, setLugAct] = useState();
 
  // const renderBusqueda = () => {
  //   return (
  //     <div>
  //       <p>Lugar: {lugarActual.place.formatted_address}</p>
  //       <p>Id: {lugarActual.place.place_id}</p>
  //       <p>Latitud: {lugarActual.place.geometry.location.lat()}</p>
  //       <p>Longitud: {lugarActual.place.geometry.location.lng()}</p>
  //     </div>
  //   )
  // }

  // // Lugar: Goya, Corrientes, Argentina

  // // Id: ChIJ7ztSBZaETpQR4ZoyalQRCXw
  
  // // Latitud: -29.1442242
  
  // // Longitud: -59.2643242

  // const renderClima = ()=>{
  //   fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lugarActual.place.geometry.location.lat()}&lon=${lugarActual.place.geometry.location.lng()}&appid=00711a3758ab4344055644c98a782186`)
  //   .then(res => res.json())
  //   .then(text => console.log(text))
  // }
 
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
            <RenderLugar lugar={lugarActual.place}/>
          ) : (
              <p> Sin busqueda</p>
            )
        }
      </div>
    </div>
  )
}

export default App;


{/* <>
<div>
  {
    renderBusqueda()
  }
</div>
 
<div>

</div>
{
  renderClima()
}
</> */}


// <p> Lugar: {_clima.name}</p>

// <p> Temperatura: {(_clima.main.temp - 32) * 5/9} </p>
// <p> Estado: {_clima.weather[0].main}</p>
// <p> Descripcion: {_clima.weather[0].description}</p>
// <p> Viento: {_clima.wind.speed} k/h</p>