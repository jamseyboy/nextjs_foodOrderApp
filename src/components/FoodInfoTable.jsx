// components/FoodInfoTable.js
import { useEffect, useState } from "react";
import { fetchFoodInfo } from "../lib/foods/api";

export default function FoodInfoTable() {
  const [foodInfo, setFoodInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFoodInfo() {
      try {
        const data = await fetchFoodInfo();
        setFoodInfo(data);
      } catch (error) {
        setError("Failed to load food information");
      } finally {
        setLoading(false);
      }
    }
    loadFoodInfo();
  }, []);

  if (loading) return <p>Loading food information...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Food Information</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Food ID</th>
            <th className="border px-4 py-2">Food Name</th>
            <th className="border px-4 py-2">Food Price</th>
            <th className="border px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {foodInfo.map((food) => (
            <tr key={food.id}>
              <td className="border px-4 py-2">{food.id}</td>
              <td className="border px-4 py-2">{food.food_name}</td>
              <td className="border px-4 py-2">{food.food_price}</td>
              <td className="border px-4 py-2">{new Date(food.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
