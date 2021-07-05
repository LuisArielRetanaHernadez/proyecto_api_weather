const Location = ({nameCountry,nameLocation,nameRegion}) =>{
    return(
        <div id="Location">
            <h2>{nameCountry}</h2>
            <h3>{nameLocation}/{nameRegion}</h3>
        </div>
    )
}
export default Location