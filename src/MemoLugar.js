import React, { useState, useEffect } from 'react'

export default React.memo((lugar) => {

    const [infoClima, setInfoClima] = useState()
  
    useEffect(()=>{
        apiClima()
    },[])

    const apiClima = () => {
        console.log(' apiClima')
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lugar.lugar.geometry.location.lat()}&lon=${lugar.lugar.geometry.location.lng()}&appid=00711a3758ab4344055644c98a782186&lang=es`)
        .then(res => res.json())
        .then(text => setInfoClima(text))
    } 
    
    return (
        <>
            <div>
                {
                    lugar.lugar ? (
                        <div className="Card">
                            <p>Lugar: {lugar.lugar.formatted_address}</p>
                            {/* <p>Id: {lugar.lugar.place_id}</p> */}
                            <p>Latitud: {lugar.lugar.geometry.location.lat()}</p>
                            <p>Longitud: {lugar.lugar.geometry.location.lng()}</p>
                        </div>
                    ) : (<p> Sin datos de la Ciudad</p>)
                }
            </div>

            <div>
                {
                    infoClima ? (
                        <div className="Card">
                            <p> Lugar: {infoClima.name}</p>

                            <p> Temperatura: {(infoClima.main.temp - 273.15).toFixed(2)}° C</p>
                            <p> Descripcion: {infoClima.weather[0].description}</p>
                            <p> Viento: {infoClima.wind.speed} k/h</p>
                            <img src={"http://openweathermap.org/img/wn/" + infoClima.weather[0].icon + ".png"} 
                            alt=" Info clima icon"
                            style={{backgroundColor:'#282c34', borderRadius:'50%'}}
                            />
                        </div>
                    ) : (<p> Sin datos del clima </p>)
                }

            </div> 
        </>
    )
}
)


    // Lugar: Goya, Corrientes, Argentina

    // Id: ChIJ7ztSBZaETpQR4ZoyalQRCXw

    // Latitud: -29.1442242

    // Longitud: -59.2643242

