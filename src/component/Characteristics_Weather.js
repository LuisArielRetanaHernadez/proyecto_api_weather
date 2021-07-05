const CharacteristicsWeather = ({description,temperature,symbolTemp}) =>{
    return(
        <div id="Characteristics-Weather">
            <p>Descripcion del clima: <strong>{description}</strong></p>
            <p>Temperatura: <strong>{`${temperature}°${symbolTemp}`}</strong></p>
        </div>
    )
}
export default CharacteristicsWeather

