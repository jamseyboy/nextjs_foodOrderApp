// components/OrderTable.js
import React from 'react';

const OrderTable = ({ orders, onButtonClick }) => {
  if (!Array.isArray(orders) || orders.length === 0) {
    return <p>No orders available.</p>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '8px' }}>Order ID</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Customer ID</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Username</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Order Status</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Timestamp</th>
          <th className="border border-gray-300">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td style={{ border: '1px solid black', padding: '8px' }}>{order.id}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{order.customer_id}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{order.username}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{order.order_status}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{new Date(order.timestamp).toLocaleString()}</td>
            <td className="border border-gray-300">
              <button className="bg-blue-500 text-white p-2 rounded" onClick={() => onButtonClick("Approved")}>
                Action
              </button>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
