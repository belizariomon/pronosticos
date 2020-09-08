import React from 'react'

export const Historial = ({ historialBus }) => {
    const visualiarBusquedaH = (item) => {
        const lugar = {
            id: item.id,
            lat: item.lat,
            lon: item.lon,
            nombre: item.nombre
        }
        setLugAct(lugar)
    }

    return (
        <>
            { !!historialBus && historialBus.length > 0 ?
                (
                    <>
                        <p>Busquedas recientes </p>
                        <div style={{ display: "flex", flexDirection: "row", width: "90%", marginLeft: "auto" }}>
                            {
                                historialBus.map((item, key) => (
                                    <div key={key}
                                        className="Card" 
                                        style={{ cursor: 'pointer', padding: 20, margin: 20 }} 
                                        onClick={() => visualiarBusquedaH(item)}>
                                        <p >{item.nombre}</p>
                                        <p>{item.lat}</p>
                                        <p>{item.lon}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                ) : (
                    <p> Sin Contenido</p>
                )
            }
        </>
    )
} 