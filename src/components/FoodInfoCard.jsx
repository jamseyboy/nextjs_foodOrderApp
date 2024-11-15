import { useState, useEffect } from "react";
import { fetchFoodInfo } from "@/lib/api";

export default function FoodInfoTable({ addToCart }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [foodInfo, setFoodInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState(true);
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

//   const foodInfo = [
//     { id: 1, food_name: "Burger", food_price: 50},
//     { id: 2, food_name: "Pizza", food_price: 80},
//     { id: 3, food_name: "Salad", food_price: 40}
//   ];

  // Handle card selection
  const selectItem = (foodId) => {
    setSelectedItem(foodId);
  };

  // Increase quantity
  const increaseQuantity = (foodId) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) + 1
    }));
  };

  // Decrease quantity
  const decreaseQuantity = (foodId) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [foodId]: Math.max((prev[foodId] || 0) - 1, 0)
    }));
  };

  // Add item to cart
  const handleAddToCart = (food) => {
    const quantity = selectedQuantities[food.id] || 0;
    if (quantity > 0) {
      addToCart(food.id, { ...food, quantity });
      setSelectedQuantities((prev) => ({ ...prev, [food.id]: 0 }));
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {foodInfo.map((food) => (
        <div
          key={food.id}
          onClick={() => selectItem(food.id)}
          className={`border p-4 rounded-lg shadow-lg flex flex-col items-center cursor-pointer ${
            selectedItem === food.id ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2">ID: {food.id}</h3>
          <h3 className="text-lg font-semibold mb-2">{food.food_name}</h3>
          <p className="text-gray-700 mb-2">Price: {food.food_price.toFixed(2)}</p>
          <div className="flex items-center space-x-2 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                decreaseQuantity(food.id);
              }}
              disabled={selectedItem !== food.id}
              className={`px-2 py-1 rounded ${
                selectedItem === food.id ? "bg-red-500 text-white" : "bg-gray-300 text-gray-500"
              }`}
            >
              -
            </button>
            <span className="font-semibold text-lg">
              {selectedQuantities[food.id] || 0}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                increaseQuantity(food.id);
              }}
              disabled={selectedItem !== food.id}
              className={`px-2 py-1 rounded ${
                selectedItem === food.id ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"
              }`}
            >
              +
            </button>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(food);
            }}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
