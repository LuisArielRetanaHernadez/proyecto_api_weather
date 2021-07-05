import ButtonTransformTem from './Button_Transform_Temp'
import Location from './Location'
import ContainerIconoWeather from './ContainerIconoWeather'
import CharacteristicsWeather from './Characteristics_Weather'
import { useEffect, useState } from 'react';
const ContainerWeather = () =>{

    /*****ESTADOS DEL COMPONENTE*****/
    const [apiWeather, setApiWeather] = useState(null)//Aqui es donde se aloja los resultados de la Api Weather
    const [tempF, setTempF] = useState(0)//Aqui es donde alojamos la temperatura en Fahrenheit
    const [tempC, setTempC] = useState(0)//Aqui es donde alojamos la temperatura en Celsius
    const [nameLocation, setNameLocation] = useState('')//Aqui es donde alojamos el nombre de la localidad del usuario
    const [nameCountry, setNameCountry] = useState('')//Aqui es donde alojamos el nombre del pais del usuario
    const [nameRegion, setNameRegion] = useState('')//Aqui es donde alojamos el nombre de la region(estado) del usuario
    const [descriptionWeather, setDescriptionWeather] = useState('')//Aqui es donde alojamos la descripcion del clima
    const [temperatureWeather, setTemperatureWeather] = useState(0)//Aqui es donde alojamos la temperatura que se le mostrara al usuario
    const [iconoWeather, setIconoWeather] = useState('')//Aqui es donde alojamos el icono que describe el clima
    const [coordinatesLat, setCoordinatesLat] = useState(0)//Aqui es donde alojamos la latitud(cordenadas) del usuario
    const [coordinatesLon, setCoordinatesLon] = useState(0)//Aqui es donde alojamos la longitud(cordenadas) del usuario
    const [symbolTemp, setSymbolTemp] = useState('C')//Aqui es donde se aloja el simbolo de la temperatura del clima

    /*****OBTENIENDO LA UBICACION ACTUAL(POR MEDIO DE CORDENADAS) DEL USUARIO*****/
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

    /*****CONSULTA DE LA API WEATHER*****/
    useEffect(() =>{
        const consultationWeather = async () =>{
            const urlWeather = `https://api.weatherapi.com/v1/current.json?key=c7db0c19785644e9a26231420210307&q=${coordinatesLat}, ${coordinatesLon}&aqi=no`
            const response = await fetch(urlWeather).then(response => response.json()).catch(err => err)
            setApiWeather(response)
        }
        
        //lo que hacemos es cuando los dos estados coordinatesLat y coordinatesLon ya hayan recoletado la ubicacion actual se ejecute
        //la funcion consultationWeather para que se haga la consulta ya con las cordenadas
        if(coordinatesLat !== 0 && coordinatesLon !== 0){
            consultationWeather()
        }
    },[coordinatesLon,coordinatesLat])

    /*****VALIDAMOS SI EL ESTADO API WEATHER NO SEA NULL Y TAMBIEN INSETAMOS LOS DATOS DE LA API WEATHER EN LOS ESTADOS*****/
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

    /*****FUNCION QUE CONVIERTE LA TEMPERATURA DE CELSIUS A FAHRENHEIT O VICERVESA*****/
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