import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Airport from "../../components/airport.tsx";
import { AirportData } from "../../types.ts";
import Axios from "npm:axios";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, AirportData[]>) => {
    const { airport } = ctx.params;
    const API_KEY = Deno.env.get("API_KEY");

    if (!API_KEY) {
      return new Response("Falta API key", { status: 500 });
    }

    const url = `https://api.api-ninjas.com/v1/airports?name=` + airport;
    try {

      const response = await Axios.get<AirportData[]>(url, {
        headers: {
         "X-Api-Key": API_KEY,
        },
      });
      

      if (response.data.length === 0) {
        return new Response("No se ha encontrado el aeropuerto introducido", {
          status: 400,
        });
      }
      return ctx.render(response.data);
    
    } catch (e) {
      console.error(e);
      return new Response("Error", { status: 500 });
    }
  },
};


const Page = (props: PageProps<AirportData[]>) => {
    const data = props.data;
    return (
      <>
      
     
 
       {data.map((airport)=>(
        <Airport name = {airport.name} country = {airport.country} city= {airport.city} region = {airport.region}
        iata ={airport.iata} icao = {airport.icao} elevation_ft ={airport.elevation_ft} timezone={airport.timezone}
        latitude = {airport.latitude} longitude = {airport.longitude}/>
       ))},
        
       
       <a href="/">Volver al formulario de búsqueda</a>
      </>
    );
  };
  
  export default Page;