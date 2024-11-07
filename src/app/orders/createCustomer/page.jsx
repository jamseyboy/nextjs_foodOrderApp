"use client"

import Userform from "@/components/Userform";
import FoodInfoTable from "@/components/FoodInfoTable";


export default function UserPage() {
  return (
    
    <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">Enter your Name</h1>
        <Userform/>
      
    </div>
  );
}
