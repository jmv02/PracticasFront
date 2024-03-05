import { FunctionComponent } from "https://esm.sh/v128/preact@10.19.2/src/index.js";

type AirportProps = {
    icao: string,
    iata: string, 
    name: string,
    city: string, 
    region: string, 
    country: string, 
    elevation_ft: number,
    latitude: number,
    longitude: number,
    timezone: string,
}

const Airport:FunctionComponent<AirportProps> = (props) => {

    const {icao,iata,name,city,region,country,elevation_ft,latitude,longitude,timezone} = props; 

    return(
        <>
        <div className="airport-card">
            <h2>{name}</h2>
            <p>{city}</p>
            <p>{country}</p>
            <p>{region}</p>
            <p>{icao}</p>
            <p>{iata}</p>
            <p>{elevation_ft}</p>
            <p>{timezone}</p>
            <p>{latitude}</p>
            <p>{longitude}</p>
        </div>
     
       </>
    )

}; 

export default Airport; 