// app/order/page.js
"use client"

import OrderForm from "../../../components/OrderForm";
import FoodInfoTable from "@/components/FoodInfoTable";
import { useSearchParams } from "next/navigation";


export default function OrderPage() {

  
const searchParams = useSearchParams();
const generated_order_id = searchParams.get("order_id");
const username=searchParams.get("username");

  return (
    
    <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">ORDER PAGE</h1>
        <FoodInfoTable/>
        
      <h1 className="text-2xl font-bold mb-4"></h1>
      <OrderForm  generated_order_id={generated_order_id} username={username} />
    </div>
  );
}

