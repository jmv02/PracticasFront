import { FreshContext, Handlers } from "$fresh/server.ts";



export const handler:Handlers = {
    GET: async(req:Request,ctx:FreshContext) => {
        
        const url = new URL(req.url); 
        const airport = url.searchParams.get("airport"); 
        const joke = url.searchParams.get("joke");
        const recipe = url.searchParams.get("recipe"); 

        if(airport){
            return new Response("", {status:307,
            headers:{Location:`/airport/${airport}`}
            }); 
        }
        if(joke){
            return new Response ("", {status:307,
            headers:{Location:`/joke/${joke}`}
            }); 
        }

        if(recipe){
            return new Response("", {status:307,
            headers:{Location:`/recipe/${recipe}`}
            });
        }
        
        return ctx.render(); 
        
    }
}
const Home = () => {
   
    return(
        <>
            <div>
           <form class="card" method="get">
            Introduce un aeropuerto:<input type = "text" name="airport"/>
            <button type = "submit">Buscar aeropuerto</button>
        </form>
        </div>

        <div>
        <button class ="a">
         <a href="/joke/10">Generar chistes</a> 
         </button>
         </div>
     
        <div>
        <form class="card" method="get">
            Introduce una receta:<input type = "text" name="recipe"/>
            <button type = "submit">Buscar recipe</button>
            </form>
        </div>
       </>
    )

}

export default Home;  