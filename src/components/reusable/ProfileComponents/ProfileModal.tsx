import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/utils/hooks";
import { updateUser } from "../../../redux/features/user/userSlice";
import { getAuthProfile } from "../../../redux/features/auth/authSlice";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [userName, setUserName] = useState(user?.userName || "");
  const [userEmail, setUserEmail] = useState(user?.userEmail || "");
  const [userAvatar, setUserAvatar] = useState(user?.userAvatar || "");

  const dispatch = useAppDispatch();

  const handleSave = async () => {
    if (user) {
      try {
        await dispatch(
          updateUser({
            userId: user.id,
            userData: {
              userName,
              userEmail,
              userAvatar,
            },
          })
        );
        await dispatch(getAuthProfile());
        onClose();
      } catch (err) {
        console.error(err);
        alert("Failed to update profile");
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-gray-800 p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Manage Profile
        </h2>
        <div className="mb-4">
          <label className="block text-gray-300">Name</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-700 text-white border border-gray-300 rounded mt-1"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Email</label>
          <input
            type="email"
            className="w-full p-2 bg-gray-700 text-white border border-gray-300 rounded mt-1"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Avatar URL</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-700 text-white border border-gray-300 rounded mt-1"
            value={userAvatar}
            onChange={(e) => setUserAvatar(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="btn btn-secondary mr-2 text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="btn btn-primary text-white" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
