// lib/api.js

import { DJANGO_API_ENDPOINT } from "@/config/defaults";



export async function getOrderList() {
    try {
      const response = await fetch(`${DJANGO_API_ENDPOINT}/customer/orderslist`);
      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.statusText}`);
      }
      const data = await response.json();
      return data.order || []; // Return just the orders array
    } catch (error) {
      console.error("Error fetching order list:", error);
      throw error; // Propagate the error to handle it in the calling component
    }
  }
  

  export async function getTodayOrderDetailList() {
    try {
      const response = await fetch(`${DJANGO_API_ENDPOINT}/customer/todays_detail_order_list`);                              
      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.statusText}`);
      }
      const data = await response.json();
      return data.todayOrderDetails || []; // Return just the orders array
    } catch (error) {
      console.error("Error fetching order list:", error);
      throw error; // Propagate the error to handle it in the calling component
    }
  }
  


export async function submitOrder(data) {
  try {
    const response = await fetch(`${DJANGO_API_ENDPOINT}/customer/create_order_item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Failed to submit order");
    }

    return await response.json(); // Return the response data if needed
  } catch (error) {
    console.error("Error submitting order:", error);
    throw error;
  }
}


export async function updateOrderStatus(data) {

  console.log(data)
  try {
    const response = await fetch(`${DJANGO_API_ENDPOINT}/customer/update_order_status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Failed to Update order Status");
    }

    return await response.json(); // Return the response data if needed
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
  
}

export async function fetchFoodInfo() {
  try {
    const response = await fetch(`${DJANGO_API_ENDPOINT}/food/food_info_all`);
    if (!response.ok) {
      throw new Error("Failed to fetch food information");
    }
    return await response.json(); // Return the food info data
  } catch (error) {
    console.error("Error fetching food info:", error);
    throw error;
  }
}

export async function submitUsername(data) {

  try{
    const response = await fetch(`${DJANGO_API_ENDPOINT}/customer/create_customer`,{
      method: "POST",
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify(data)
    });
    if(!response.ok){
      
      throw new Error("Failed to create username");
    }
    return await response.json();
  }catch(error){
    console.log("error submitting username", error);
    throw error;
  }
  
}

export async function initiateOrder(data){

  try{

    const response = await fetch(`${DJANGO_API_ENDPOINT}/customer/create_orders`, {

      method: "POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
    });
    if(!response.ok){
      throw new Error("Failed to initiate Order");
    }
    return await response.json();

  }catch(error){
    console.log("Error caught while initiating orders", error)
    throw error;
  }
}
