import { useState } from "react"

export const WheatherApp = () => {

    const API_KEY = '5dd0e810da62bad01b4c9e54500a4ac4'
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const difKelvin = 273.15

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCiudad = (event) => {
        setCiudad(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (ciudad.length > 0) {
            fetchClima()
        }
    }

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)
        } catch (error) {
            console.error('Ocurrió el siguiente problema: ', error)
        }
    }

    return (
        <div className="container custom-container bg-info rounded mt-3 p-3">
            < h1 className="text-center mb-3" > Aplicación del Clima con React</h1 >

            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese la Ciudad"
                        value={ciudad}
                        onChange={handleCiudad}
                    />
                    <button type="submit" className="btn btn-primary">Buscar</button>
                </div>

                {
                    dataClima && (
                        <div className="text-center">
                            <h2 className="">{dataClima.name}</h2>
                            <p>La temperatura es de: {Math.floor(dataClima?.main?.temp - difKelvin)}°C</p>
                            <p>La humedad es de: {dataClima?.main?.humidity}%</p>
                            <img className="w-25" src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}></img>
                            <p>La condición meteorológica es: {dataClima.weather[0].description}</p>
                        </div>
                    )
                }

            </form>
        </div >
    )
}
