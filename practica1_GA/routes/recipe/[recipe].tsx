import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { RecipeData } from "../../types.ts";


export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown,RecipeData[]>) => {
    const { query } = ctx.params;
    const API_KEY = Deno.env.get("API_KEY");

    if (!API_KEY) {
      return new Response("Falta API key", { status: 500 });
    }

    const url = `https://api.api-ninjas.com/v1/recipe?query${query}=`
    try {

      const response = await Axios.get<RecipeData[]>(url, {
        headers: {
         "X-Api-Key": API_KEY,
        },
      });
      
      console.log(response.data);

      if (response.data.length === 0) {
        return new Response("No se ha encontrado la receta introducido", {
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

const Page = (props:PageProps<RecipeData[]>) => {
  const data = props.data; 
  return (
    <>
      <div class ="card">
      {data.map((elem) => (
          <><h1>Title:{elem.title}</h1>
          <li>Ingredients:{elem.ingredients}</li>
          <li>Servings:{elem.servings}</li>
          <li>Instructions:{elem.instructions}</li></>
      ))}
       <a href="/">Volver a Home</a>
    </div>
    </>
  );
};

export default Page; 