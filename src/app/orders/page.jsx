// app/orders/page.jsx
"use client";
import { useState } from "react";
import OrderTable from "../../components/OrderTable"; // Adjusted path for OrderTable
import { getOrderList } from "../../lib/api"; // Adjusted path for getOrderList
import FoodInfoTable from "@/components/FoodInfoTable";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleLoadOrders() {
    setLoading(true);
    try {
      const ordersData = await getOrderList(); // Call the imported function
      setOrders(ordersData); // Set the orders data
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleActionClick = (orderId) =>{

    console.log(`Action clicked for order ID: ${orderId}`)
  }

  return (
    <div className="min-h-screen p-8">
      <h1>Order List</h1>
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleLoadOrders}>Load Order List</button>
      {loading && <p>Loading...</p>}
      <OrderTable orders={orders} onButtonClick={handleActionClick} />
    </div>
  );
}
