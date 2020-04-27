import React, { useState, useEffect } from 'react'

export default React.memo((props) => {

    const [infoClima, setInfoClima] = useState()

    useEffect(() => {
        apiClima()
        setearHisto()
    }, [])

    const apiClima = () => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${props.lugar.lat}&lon=${props.lugar.lon}&appid=00711a3758ab4344055644c98a782186&lang=es`)
            .then(res => res.json())
            .then(text => setInfoClima(text))
    }

    const setearHisto = () => {
        console.log(props)
        if (props.lugar) {
            const nuevoItem = {
                id: props.lugar.id,
                lat: props.lugar.lat,
                lon: props.lugar.lon,
                nombre: props.lugar.nombre
            }
            props.agregarItemHistoLocal(nuevoItem)
        }
    }

    return (
        <>
            <div>
                {
                    props.lugar ? (
                        <div className="Card">
                            <p>Lugar: {props.lugar.nombre}</p>
                            {/* <p>Id: {props.lugar.place_id}</p> */}
                            <p>Latitud: {props.lugar.lat}</p>
                            <p>Longitud: {props.lugar.lon}</p>
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