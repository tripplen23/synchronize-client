import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/utils/hooks";
import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../../redux/features/order/orderSlice";
import { OrderReadType, OrderUpdateStatusType } from "../../../misc/orderType";
import { orderStatus } from "../../../misc/enum";
import UpdatingProductModalComponent from "../../../components/reusable/ModalComponents/UpdatingOrderModalComponent";
import ButtonComponent from "../../../components/reusable/ButtonComponent/ButtonComponent";
import TransitionEffect from "../../../components/reusable/TransitionEffect/TransitionEffect";

const AdminOrder = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);

  const [selectedOrder, setSelectedOrder] = useState<OrderReadType | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState<orderStatus | null>(null);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleStatusUpdate = () => {
    if (selectedOrder && newStatus) {
      const updateData: OrderUpdateStatusType = {
        orderId: selectedOrder.id,
        shippingInfo: {
          shippingInfoId: selectedOrder.shippingInfo.id,
          shippingAddress: selectedOrder.shippingInfo.shippingAddress,
          shippingCity: selectedOrder.shippingInfo.shippingCity,
          shippingCountry: selectedOrder.shippingInfo.shippingCountry,
          shippingPostCode: selectedOrder.shippingInfo.shippingPostCode,
          shippingPhone: selectedOrder.shippingInfo.shippingPhone,
        },
        orderStatus: newStatus,
      };
      dispatch(
        updateOrderStatus({ orderId: selectedOrder.id, orderData: updateData })
      );
      setShowModal(false);
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    dispatch(deleteOrder(orderId));
  };

  return (
    <div className="container mx-auto p-4">
      <TransitionEffect />
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Total Price</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">${order.totalPrice}</td>
              <td className="border px-4 py-2">{order.orderStatus}</td>
              <td className="border px-4 py-2">
                <ButtonComponent
                  className="dark:bg-primary"
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowModal(true);
                  }}
                >
                  Update Status
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => handleDeleteOrder(order.id)}
                  className="ml-2 dark:bg-red-300"
                >
                  Delete
                </ButtonComponent>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedOrder && (
        <UpdatingProductModalComponent onClose={() => setShowModal(false)}>
          <h2 className="text-xl font-bold mb-4">Update Order Status</h2>
          <div className="mb-4">
            <label className="block mb-2">New Status</label>
            <select
              className="w-full border px-2 py-1"
              onChange={(e) => setNewStatus(e.target.value as orderStatus)}
            >
              {Object.values(orderStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <ButtonComponent onClick={handleStatusUpdate}>Update</ButtonComponent>
        </UpdatingProductModalComponent>
      )}
    </div>
  );
};

export default AdminOrder;
