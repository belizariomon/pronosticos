import React, { useState, useEffect } from 'react'

export default React.memo(({lugar,agregarItemHistoLocal}) => {

    const [infoClima, setInfoClima] = useState()
    const {id, lat, lon, nombre} = lugar

    useEffect(() => {
        apiClima()
        setearHisto()
    }, [])

    const apiClima = () => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=00711a3758ab4344055644c98a782186&lang=es`)
            .then(res => res.json())
            .then(text => setInfoClima(text))
    }

    const setearHisto = () => {
        if (lugar) {
            const nuevoItem = {
                id: id,
                lat: lat,
                lon: lon,
                nombre: nombre
            }
            agregarItemHistoLocal(nuevoItem)
        }
    }

    return (
        <>
            <div>
                {
                    lugar ? (
                        <div className="Card">
                            <p>Lugar: { nombre}</p> 
                            <p>Latitud: { lat}</p>
                            <p>Longitud: { lon}</p>
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
                            <p> Viento: {(infoClima.wind.speed * 1.60934).toFixed(2)} k/h</p>
                            <img src={"http://openweathermap.org/img/wn/" + infoClima.weather[0].icon + ".png"}
                                alt=" Info clima icon"
                                style={{ backgroundColor: '#282c34', borderRadius: '50%' }}
                            />
                        </div>
                    ) : (<p> Sin datos del clima </p>)
                }

            </div>
        </>
    )
}
) 