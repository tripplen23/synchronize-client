import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/utils/hooks";
import { getAuthProfile } from "../../../redux/features/auth/authSlice";
import SpinnerComponent from "../../../components/reusable/SpinnerComponent/SpinnerComponent";
import TransitionEffect from "../../../components/reusable/TransitionEffect/TransitionEffect";

const AdminProfile = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  // Fetch auth information on component mount
  useEffect(() => {
    dispatch(getAuthProfile());
  }, [dispatch]);

  return (
    <div className="container mx-auto mt-8 mb-8 ipadMini:my-20">
      <TransitionEffect />
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold">Admin Profile</h1>
      </div>

      <div className="flex flex-col space-y-4 bg-light dark:bg-dark p-8 rounded shadow ipadMini:hidden">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <SpinnerComponent />
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-4">
              <img
                src={user?.userAvatar}
                alt="User Avatar"
                className="rounded-full w-20 h-20 object-cover"
              />
              <div className="flex flex-col">
                <span className="name text-xl font-semibold">
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
              <button className="btn btn-primary">Manage Profile</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
