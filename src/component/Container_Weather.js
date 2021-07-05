import ButtonTransformTem from './Button_Transform_Temp'
import Location from './Location'
import ContainerIconoWeather from './ContainerIconoWeather'
import CharacteristicsWeather from './Characteristics_Weather'
import { useEffect, useState } from 'react';
const ContainerWeather = () =>{
    /*Estados del componente*/
    const [apiWeather, setApiWeather] = useState(null)
    const [tempF, setTempF] = useState(0)
    const [tempC, setTempC] = useState(0)
    const [nameLocation, setNameLocation] = useState('')
    const [nameCountry, setNameCountry] = useState('')
    const [nameRegion, setNameRegion] = useState('')
    const [descriptionWeather, setDescriptionWeather] = useState('')
    const [temperatureWeather, setTemperatureWeather] = useState(0)
    const [iconoWeather, setIconoWeather] = useState('')
    const [coordinatesLat, setCoordinatesLat] = useState(0)
    const [coordinatesLon, setCoordinatesLon] = useState(0)
    const [symbolTemp, setSymbolTemp] = useState('C')

    /*Obteniedo la ubicacion actual del usuario*/
    useEffect(() =>{
        const geoUser = () =>{

            const accessGeo = (position) =>{
                setCoordinatesLat(position.coords.latitude)
                setCoordinatesLon(position.coords.longitude)
            }

            const errGeo = () =>{
                alert('Lo sentimos, no pudimos acceder a tu abicacion actual')
            }

            if(!navigator.geolocation){
                alert('Lo sentimos, no pudimos acceder a tu abicacion actual')
                return
            }else{
                console.log("espera un momento")
                navigator.geolocation.getCurrentPosition(accessGeo, errGeo);
            }

        }
        geoUser()
    },[])

    /*Consulta a la Api Weather*/
    useEffect(() =>{
        const consultationWeather = async () =>{
            const urlWeather = `http://api.weatherapi.com/v1/current.json?key=c7db0c19785644e9a26231420210307&q=${coordinatesLat}, ${coordinatesLon}&aqi=no`
            const response = await fetch(urlWeather).then(response => response.json()).catch(err => err)
            setApiWeather(response)
        }

        if(coordinatesLat !== 0 && coordinatesLon !== 0){
            consultationWeather()
        }
    },[coordinatesLon,coordinatesLat])

    /*Aqui cuidamos que el estado de apiWeather no arroje un valor null y insetamos los datos 
    de la Api Weather a los estados*/
    useEffect(() =>{
        if(apiWeather){
            setTempC(apiWeather.current.temp_c)
            setTempF(apiWeather.current.temp_f)
            setDescriptionWeather(apiWeather.current.condition.text)
            setIconoWeather(apiWeather.current.condition.icon)
            setNameCountry(apiWeather.location.country)
            setNameLocation(apiWeather.location.name)
            setNameRegion(apiWeather.location.region)
            setTemperatureWeather(apiWeather.current.temp_c)
        }
    },[apiWeather])

    /*Funcion que convierte la temperatura a celsius a Fahrenheit o al contrario */
    const convert = () =>{
        if(tempF === temperatureWeather){
            setTemperatureWeather(tempC)
            setSymbolTemp('C')
        }else{
            setTemperatureWeather(tempF)
            setSymbolTemp('F')
        }

        //aqui convertia la temperatura celsius a fahrenheit por medio de formulas pero la Api Weather ya 
        //incluye las dos temperaturas convertidas 
        // if(tempF === temperatureWeather){
        //     setTemperatureWeather(prevent =>{
        //         return (prevent*9/5) + 32
        //     })
        // }else{
        //     setTemperatureWeather(prevent =>{
        //         return (prevent-32) * 5/9
        //     })
        // }
    }

    return(
        <section id="Container-Weather">
            <h2 className="title-weather">Clima</h2>
            <Location nameCountry={nameCountry} nameLocation={nameLocation} nameRegion={nameRegion} /> 
            <ContainerIconoWeather icono={iconoWeather} textIcono={descriptionWeather} />
            <CharacteristicsWeather description={descriptionWeather} temperature={temperatureWeather} symbolTemp={symbolTemp}/>
            <ButtonTransformTem functionConver={convert} symbolTemp={symbolTemp}/>
        </section>
    )
}

export default ContainerWeather