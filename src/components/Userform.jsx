// components/OrderForm.js
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { submitUsername } from "@/lib/api"; // Import the API function
import { initiateOrder } from "@/lib/api";

export default function OrderForm() {
    const router = useRouter();
  const [formData, setFormData] = useState({
    username: ""
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
    setLoading(true);
    setResponseMessage(null);

    try {
      // Call the API function to submit the order
     const responsedata = await submitUsername({
        username: formData.username
      });

      if(isNaN(responsedata.user_id)){
        alert("Order initiate failed")
        return;
      }
      else{

        const orderResponsedata = await initiateOrder({
            customer_id:responsedata.user_id,
            order_status: "Initiated"
      });
      router.push(`/orders/createOrders?order_id=${orderResponsedata.order_id}&username=${responsedata.username}`)
        }
    } catch (error) {
      setResponseMessage("Error submitting username. Please try again.");
    } finally {
      setLoading(false);
      setFormData({
        username: ""
      });
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Order Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 font-medium">Username :</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Submitting..." : "Submit Username"}
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
