// import React from 'react';

// const TodayOrderDetailTable = ({ orders, onButtonClick }) => {
//   return (
//     <table className="min-w-full border-collapse border border-gray-200">
//       <thead>
//         <tr>
//           <th className="border border-gray-300">Order ID</th>
//           <th className="border border-gray-300">Customer Name</th>
//           <th className="border border-gray-300">Food Name</th>
//           <th className="border border-gray-300">Food Price</th>
//           <th className="border border-gray-300">Quantity</th>
//           <th className="border border-gray-300">Total Amount (Price X Quantity)</th>
//           <th className="border border-gray-300">Status</th>
//           <th className="border border-gray-300">Timestamp</th>
//           <th className="border border-gray-300">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {orders.map((order) => (
//           <tr key={order.id}>
//             <td className="border border-gray-300">{order.id}</td>
//             <td className="border border-gray-300">{order.customer_name}</td>
//             <td className="border border-gray-300">{order.food_name}</td>
//             <td className="border border-gray-300">{order.food_price}</td>
//             <td className="border border-gray-300">{order.food_quantity}</td>
//             <td className="border border-gray-300">{order.total_amount}</td>
//             <td className="border border-gray-300">{order.order_status}</td>
//             <td className="border border-gray-300">{new Date(order.timestamp).toLocaleString()}</td>
//             <td className="border border-gray-300">
//               <button onClick={() => onButtonClick(order.id)}>Action</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default TodayOrderDetailTable;

import React from 'react';

const TodayOrderDetailTable = ({ todayOrderDetails = {}, onButtonClick }) => {
  // Check if there is any data in todayOrderDetails
  if (Object.keys(todayOrderDetails).length === 0) {
    return <p>No orders for today.</p>;
  }

  return (
    <div className="space-y-8">
      {Object.entries(todayOrderDetails).map(([customerName, orders]) => {
        // Calculate grand total for each customer
        const grandTotal = orders.reduce((total, order) => total + order.total_amount, 0);

        const orderStatus = orders[0].order_status;
        const orderID=orders[0].order_id;

        return (
          <div key={customerName} className="p-6 border border-gray-300 rounded-lg shadow-md bg-gray-50">
            <h2 className="text-2xl font-bold mb-2 text-gray-700">{customerName}</h2>
            <p className="text-lg font-semibold text-gray-600 mb-4">
              Grand Total: <span className="font-bold">{grandTotal}</span>
            </p>
            <p className="text-lg text-gray-500 mb-4">
              Status: <span className="font-medium">{orderStatus}</span>
            </p>
            <p className="mb-4">
            <button
                    onClick={() => onButtonClick(orderID, "Paid")}
                    className="mt-3 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Change Status to Paid
            </button>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-300 p-4 rounded shadow-sm bg-white">
                  <p className="text-sm font-semibold">Order ID: {order.id}</p>
                  <p className="text-sm">Food Name: <span className="font-medium">{order.food_name}</span></p>
                  <p className="text-sm">Price: <span className="font-medium">{order.food_price}</span></p>
                  <p className="text-sm">Quantity: <span className="font-medium">{order.food_quantity}</span></p>
                  <p className="text-sm">Total Amount: <span className="font-medium">{order.total_amount}</span></p>
                  <p className="text-sm">Timestamp: <span className="font-medium">{new Date(order.timestamp).toLocaleString()}</span></p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodayOrderDetailTable;
