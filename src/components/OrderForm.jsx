// components/OrderForm.js
"use client";
import { useState } from "react";
import { submitOrder } from "../lib/api"; // Import the API function

export default function OrderForm({generated_order_id,username}) {
  const [formData, setFormData] = useState({
    food_id: "",
    food_quantity: ""
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
 
  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    // Validate that inputs are integers
    // if (isNaN(formData.order_id) || isNaN(formData.food_id) || isNaN(formData.food_quantity)) {
    //   alert("Please enter valid integers for all fields.");
    //   return;
    // }

    setLoading(true);
    setResponseMessage(null);

    try {
      // Call the API function to submit the order
      await submitOrder({
        order_id: parseInt(generated_order_id),
        food_id: parseInt(formData.food_id),
        food_quantity: parseInt(formData.food_quantity),
        order_status: "Order Submitted, Not Paid"
      });

      setResponseMessage("Order submitted successfully!");
    } catch (error) {
      setResponseMessage("Error submitting order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Order Form</h2>
      <h1 className="text-xl font-bold mb-4">Hi {username || "N/A"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          {/* <label htmlFor="order_id" className="block mb-1 font-medium">Order ID:</label>
          <p id="order_id" name="order_id" className="border p-2 w-auto bg-gray-100 rounded">
            {generated_order_id || "N/A"}
          </p> */}
          <h1 className="text-xl font-bold mb-4">Order ID: {generated_order_id || "N/A"}</h1>
        </div>
        
        <div>
          <label htmlFor="food_id" className="block mb-1 font-medium">Food ID:</label>
          <input
            type="number"
            id="food_id"
            name="food_id"
            value={formData.food_id}
            onChange={handleChange}
            className="border p-2 w-full"
           min="0"
            required
          />
        </div>

        <div>
          <label htmlFor="food_quantity" className="block mb-1 font-medium">Food Quantity:</label>
          <input
            type="number"
            id="food_quantity"
            name="food_quantity"
            value={formData.food_quantity}
            onChange={handleChange}
            className="border p-2 w-full"
            min="0"
            max="20"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Submitting..." : "Submit Order"}
        </button>
      </form>

      {responseMessage && (
        <div className="mt-4">
          <p className="text-lg font-medium">{responseMessage}</p>
        </div>
      )}
    </div>
  );
}
