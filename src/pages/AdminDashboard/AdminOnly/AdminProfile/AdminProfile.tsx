import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/utils/hooks";
import { getAuthProfile } from "../../../../redux/features/auth/authSlice";
import { getOrdersByUserId } from "../../../../redux/features/order/orderSlice";
import SpinnerComponent from "../../../../components/reusable/SpinnerComponent/SpinnerComponent";
import TransitionEffect from "../../../../components/reusable/TransitionEffect/TransitionEffect";
import ProfileModal from "../../../../components/reusable/ProfileComponents/ProfileModal";
import OrderHistoryTable from "../../../../components/reusable/ProfileComponents/OrderHistoryTable";
import ButtonComponent from "../../../../components/reusable/ButtonComponent/ButtonComponent";
const AdminProfile = () => {
  const { user, isLoading: authLoading } = useAppSelector(
    (state) => state.auth
  );
  const { orders, isLoading: ordersLoading } = useAppSelector(
    (state) => state.order
  );
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAuthProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getOrdersByUserId(user.id));
    }
  }, [dispatch, user]);

  const handleProfileModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="container mx-auto mt-8 mb-8 ipadMini:my-20">
      <TransitionEffect />
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold">Admin Profile</h1>
      </div>

      <div className="flex flex-col space-y-4 bg-light dark:bg-gradient-to-r from-purple-300 to-primary p-8 rounded shadow ipadMini:hidden">
        {authLoading ? (
          <div className="flex justify-center items-center">
            <SpinnerComponent />
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-4 ">
              <img
                src={
                  user?.userAvatar || "https://picsum.photos/200/?random=365"
                }
                alt="User Avatar"
                className="rounded-full w-20 h-20 object-cover"
              />
              <div className="flex flex-col">
                <span className="name text-xl font-semibold text-dark dark:text-gray-300">
                  Admin Name: {user?.userName}
                </span>
                <span className="email text-sm text-gray-500 dark:text-gray-300">
                  Email: <strong>{user?.userEmail}</strong>
                </span>
                <span className="role text-sm text-gray-500 dark:text-gray-300">
                  Role: <strong>{user?.userRole}</strong>
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              <ButtonComponent
                className="btn btn-primary-dark"
                onClick={handleProfileModal}
              >
                Manage Profile
              </ButtonComponent>
            </div>
          </>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Order History</h2>
        {ordersLoading ? (
          <SpinnerComponent />
        ) : (
          <OrderHistoryTable orders={orders} />
        )}
      </div>

      {isModalOpen && (
        <ProfileModal isOpen={isModalOpen} onClose={handleProfileModal} />
      )}
    </div>
  );
};

export default AdminProfile;
