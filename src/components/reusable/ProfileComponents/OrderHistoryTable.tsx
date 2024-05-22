import React from "react";
import { OrderReadType } from "../../../misc/orderType";

interface OrderHistoryTableProps {
  orders: OrderReadType[];
}

const OrderHistoryTable: React.FC<OrderHistoryTableProps> = ({ orders }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 dark:bg-gray-800">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-100 dark:bg-gray-700 border-b">
              Order ID
            </th>
            <th className="py-2 px-4 bg-gray-100 dark:bg-gray-700 border-b">
              Date
            </th>
            <th className="py-2 px-4 bg-gray-100 dark:bg-gray-700 border-b">
              Total
            </th>
            <th className="py-2 px-4 bg-gray-100 dark:bg-gray-700 border-b">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map(({ id, createdDate, totalPrice, orderStatus }) => (
            <tr key={id}>
              <td className="py-2 px-4 border-b">{id}</td>
              <td className="py-2 px-4 border-b">
                {createdDate ? new Date(createdDate).toLocaleDateString() : ""}
              </td>
              <td className="py-2 px-4 border-b">${totalPrice.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">{orderStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;
