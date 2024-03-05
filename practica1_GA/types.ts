
export type AirportData = {
    icao: string,
    iata: string, 
    name: string,
    city: string, 
    region: string, 
    country: string, 
    elevation_ft: number,
    latitude: number,
    longitude: number,
    timezone: string
}

export type JokeData = {
    joke:string; 
    limit:number; 
}

export type RecipeData = {
    query:string;  
    title:string;
    ingredients:string;
    servings:string;
    instructions:string;
}
