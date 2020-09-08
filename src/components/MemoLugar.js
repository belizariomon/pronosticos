import React from 'react'
import { useFetch } from '../hooks/useFetch';

export const MemoLugar = React.memo(({ lugar }) => {

    const { lat, lon, nombre } = lugar

    const { loading, data } = useFetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=00711a3758ab4344055644c98a782186&lang=es`);

    const infoClima = !!data && data 

    return (
        <>
            {!loading
                ?
                (
                    <>
                        <div>
                            {
                                lugar ? (
                                    <div className="Card">
                                        <p>Lugar: {nombre}</p>
                                        <p>Latitud: {lat.toFixed(4)}</p>
                                        <p>Longitud: {lon.toFixed(4)}</p>
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
                :
                (
                    <><h1> Cargando...</h1></>
                )}

        </>
    )
}
) 