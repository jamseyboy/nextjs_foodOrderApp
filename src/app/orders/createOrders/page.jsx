// app/order/page.js
"use client"
import { useState } from "react";
import OrderForm from "../../../components/OrderForm";
import FoodInfoTable from "@/components/FoodInfoTable";
import FoodInfoCard from "@/components/FoodInfoCard";
import { useSearchParams } from "next/navigation";
import { submitOrder } from "@/lib/api";


export default function OrderPage() {

  
const searchParams = useSearchParams();
const generated_order_id = searchParams.get("order_id");
const username=searchParams.get("username");
const [cartItems, setCartItems] = useState({});
const [loading, setLoading] = useState(false);
const [responseMessage, setResponseMessage] = useState(true);

  // Add or update item in the cart
  const addToCart = (foodId, foodItem) => {
    setCartItems((prev) => ({
      ...prev,
      [foodId]: {
        ...foodItem,
        quantity: (prev[foodId]?.quantity || 0) + foodItem.quantity
      }
    }));
  };

  // Remove an item from the cart
  const removeFromCart = (foodId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[foodId];
      return updatedCart;
    });
  };

  const handleSubmit = async (items) =>{

    try{

      await submitOrder({
          order_id: parseInt(generated_order_id),
          order_status: "Order Submitted, Not Paid",
          items: items.map((item) => ({
            food_id: parseInt(item.id),
            food_quantity: parseInt(item.quantity)
          }))
      });
      setResponseMessage("Order submitted successfully!");
    } catch (error) {
    setResponseMessage("Error submitting order. Please try again.");
    } finally {
    setLoading(false);
    }
    console.log("Submitting Order", items);
    // Optionally: send items to an API, clear cart, etc.
    alert("Order submitted successfully!");
    setCartItems([]); // Clear the cart after submission if needed

  }

  return (
    
    <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">ORDER PAGE</h1>
        <FoodInfoCard addToCart={addToCart}/>
        
      <h1 className="text-2xl font-bold mb-4"></h1>
      <OrderForm  cartItems={Object.values(cartItems)} 
                  removeFromCart={removeFromCart} 
                  handleSubmit={handleSubmit} 
                  generated_order_id={generated_order_id} username={username} />
    </div>
  );
}

