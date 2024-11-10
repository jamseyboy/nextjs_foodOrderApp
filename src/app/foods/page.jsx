"use client"

import { useState } from "react";
import FoodForm from "@/components/FoodForm"
import FoodInfoTable from "@/components/FoodInfoTable";


export default function createFood(){

    return(
        <div className="min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-4">Food Info Table</h1>
            <FoodInfoTable/>
            <h1 className="text-2xl font-bold mb-4">Create food item</h1>
            <FoodForm />
        </div>
    )
}