import React from "react"

//const foodURL=

export default function Page(){


    function handleSubmit (event){
        event.preventDefault()      
        console.log(event, event.target)
        const formData = new FormData(event.target)
        const objectFromForm = Object.fromEntries(formData)
        const jsonData = JSON.stringify(objectFromForm)
        const requestOptions = {
            method : "POST",
            header: {
                "Content-Type" : "application/json"
            },
            body : jsonData
        }
        //fetch(url, requestOptions)
    }

    return <div className="h-[95vh]">

        <div className="max-w-md mx-auto py-5">
        <form className="container">
            <h1>Food1</h1>
            <input type='text' name='food_name' required placeholder="Food name"/>
            <input type='number' name='price' required placeholder='Food Price'/> 
            <button type='submit'>Submit</button>
        </form>
        </div>
       

        </div>
}