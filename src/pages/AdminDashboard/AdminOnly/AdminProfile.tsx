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

      <div className="bg-light dark:bg-dark p-8 rounded shadow ipadMini:hidden">
        {isLoading ? (
          <div>
            <SpinnerComponent />
          </div>
        ) : (
          <div>
            <div className="profileInfo flex flex-col">
              <span className="name">Admin Name: {user?.userName}</span>
              <span className="email">
                Email: <strong>{user?.userEmail}</strong>
              </span>
              {/* Additional profile information can be displayed here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
