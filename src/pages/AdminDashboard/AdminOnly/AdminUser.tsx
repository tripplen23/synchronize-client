import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/utils/hooks";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../../redux/features/user/userSlice";
import {
  UserReadType,
  UserCreateType,
  UserUpdateType,
} from "../../../misc/userType";
import UpdatingUserModalComponent from "../../../components/reusable/ModalComponents/UpdatingUserModalComponent";
import ButtonComponent from "../../../components/reusable/ButtonComponent/ButtonComponent";
import TransitionEffect from "../../../components/reusable/TransitionEffect/TransitionEffect";
import { toast } from "react-toastify";

const AdminUser = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);

  const [selectedUser, setSelectedUser] = useState<UserReadType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState<UserCreateType | null>(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleUserUpdate = async (updatedUser: UserUpdateType) => {
    try {
      if (selectedUser) {
        await dispatch(
          updateUser({ userId: selectedUser.id, userData: updatedUser })
        );
        await dispatch(getAllUsers());
        toast.success("User updated successfully");
        setShowModal(false);
      }
    } catch (error: any) {
      toast.error(`Failed to update user with message ${error.message}`);
    }
  };

  const handleCreateUser = async () => {
    try {
      if (newUser) {
        await dispatch(createUser(newUser));
        await dispatch(getAllUsers());
        toast.success("User created successfully");
        setShowModal(false);
      }
    } catch (error: any) {
      toast.error(`Failed to create user with message ${error.message}`);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await dispatch(deleteUser(userId));
      await dispatch(getAllUsers());
      toast.success("User deleted successfully");
    } catch (error: any) {
      toast.error(`Failed to delete user with message ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <TransitionEffect />
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <table className="min-w-full bg-white dark:bg-gray-800 mt-4">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.userName}</td>
              <td className="border px-4 py-2">{user.userEmail}</td>
              <td className="border px-4 py-2">{user.userRole}</td>
              <td className="border px-4 py-2">
                <ButtonComponent
                  onClick={() => {
                    setSelectedUser(user);
                    setShowModal(true);
                  }}
                  className="dark:bg-primary"
                >
                  Update
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => handleDeleteUser(user.id)}
                  className="ml-2 dark:bg-red-300"
                >
                  Delete
                </ButtonComponent>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <UpdatingUserModalComponent
          user={selectedUser}
          onClose={() => setShowModal(false)}
          onSave={selectedUser ? handleUserUpdate : handleCreateUser}
        />
      )}
    </div>
  );
};

export default AdminUser;
