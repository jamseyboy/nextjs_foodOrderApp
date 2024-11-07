// app/orders/page.jsx
"use client";
import { useState } from "react";
import TodayOrderTable from "../../components/TodayOrderDetails"; // Adjusted path for OrderTable
import { getTodayOrderDetailList, updateOrderStatus } from "../../lib/api"; // Adjusted path for getOrderList

export default function TodayOrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleLoadOrders() {
    setLoading(true);
    try {
      const ordersData = await getTodayOrderDetailList(); // Call the imported function
      setOrders(ordersData); // Set the orders data
      console.log(ordersData)
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  }

  const  handleActionClick = (orderId, orderStatus) =>{

    
    updateOrderStatus({
      id:orderId,
      order_status:orderStatus
    })
    handleLoadOrders();
    console.log(`Action clicked for order ID: ${orderId}`)

  }

 

  return (
    <div className="min-h-screen p-8">
      <p className="mb-4">
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleLoadOrders}>Refresh Order List</button>
      </p>
      
      {loading && <p>Loading...</p>}
      <TodayOrderTable todayOrderDetails={orders} onButtonClick={handleActionClick} />
    </div>
  );
}
