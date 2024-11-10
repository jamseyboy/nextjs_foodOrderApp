import { DJANGO_API_ENDPOINT } from "@/config/defaults";




export async function createFood(data) {

    try{

        const response= await fetch(`${DJANGO_API_ENDPOINT}api/food/create_food`,{
            method:"POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(data)
    });
    if (!response.ok){
        throw new Error("Failed to create food or communnicate to backend")
    }
    return await response.json()
    }catch(error){

        console.log("Error making a request", error)
        throw error

    }
    
}

export async function fetchFoodInfo() {
    try {
      const response = await fetch(`${DJANGO_API_ENDPOINT}api/food/food_info_all`);
      if (!response.ok) {
        throw new Error("Failed to fetch food information");
      }
      return await response.json(); // Return the food info data
    } catch (error) {
      console.error("Error fetching food info:", error);
      throw error;
    }
  }