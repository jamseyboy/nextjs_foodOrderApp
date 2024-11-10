"uses client";

import { useState } from "react";
import { createFood } from "@/lib/foods/api";
import { useRouter } from "next/navigation";


export default function CreateFood(data){

    const router =useRouter();

    const [formData, setFormData] = useState({

        food_name:"",
        food_price:""
    });

    const [loading,setLoading] = useState(false);
    const[responseMessage,setResponseMessage] = useState(null);


    function handleChange(e) {

        const {name, value} = e.target;
        setFormData((prevData)=>({

            ...prevData,
            [name]:value
        }));
        
    }
    async function handleSubmit(e) {

        e.preventDefault();
        setLoading(true);
        setResponseMessage(null);
        try{

            await createFood({
                food_name: formData.food_name,
                food_price: formData.food_price
            })
            setResponseMessage("Food Created Successfully");
            window.location.reload()
        }catch(error){
            setResponseMessage("failed to Create food. Please try again");
        }finally{
            setLoading(false);
        }
        
    }

    return(

        <div>
            <h2 className="text-xl font-bold mb-4">Food Form</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                <label htmlFor="food_name" className="block mb-1 font-medium">Food Name:</label>
                <input
                    type="text"
                    id="food_name"
                    name="food_name"
                    value={formData.food_name}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    min="0"
                    required
                />
                </div>

                <div>
                <label htmlFor="food_price" className="block mb-1 font-medium">Food Price:</label>
                <input
                    type="number"
                    id="food_price"
                    name="food_price"
                    value={formData.food_price}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    min="0"
                    max="200"
                    required
                />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
                {loading ? "Submitting..." : "Submit Food"}
                </button>

            </form>

        </div>

    )

}