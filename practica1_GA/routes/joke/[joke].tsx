import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { JokeData } from "../../types.ts";
import Axios from "npm:axios";

export const handler:Handlers = {
  GET:async(_req:Request, ctx:FreshContext<unknown,JokeData[]>)=>{
      
    const limit = 10; 
    const API_KEY = Deno.env.get("API_KEY");

    if(!API_KEY){
     
      return new Response("Missing API KEY", { status: 500 }); 
    }
    const url = `https://api.api-ninjas.com/v1/jokes?limit=`+ limit; 
    
    try{
      const response = await Axios.get<JokeData[]>(url, {
        headers: {
          "X-Api-Key": API_KEY,
        },
      });
    

      return(ctx.render(response.data));
   
    }catch(e){
      console.error(e); 
      return new Response("Error", { status: 500 });
    }
  }
}; 
const Page = (props:PageProps<JokeData[]>) => {
  const data = props.data; 
  return (
    <>
      <div>
      <h1 class ="heading">Jokes</h1>
      {data.map((element, id) => (
        <div key={id}>
          <li class ="list">{element.joke}</li>
        </div>
      ))}
       <a href="/">Volver a Home</a>
    </div>
    </>
  );
};

export default Page; 