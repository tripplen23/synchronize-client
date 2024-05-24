import React, { useState, useEffect } from "react";
import {
  UserCreateType,
  UserReadType,
  UserUpdateType,
} from "../../../misc/userType";
import { UserRole } from "../../../misc/enum";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { ImageCreateType } from "../../../misc/newProductType";
import imageCompression from "browser-image-compression";

interface UpdatingUserModalComponentProps {
  user: UserReadType | null;
  onClose: () => void;
  onSave: (userData: UserUpdateType | UserCreateType) => void;
}

const UpdatingUserModalComponent = ({
  user,
  onClose,
  onSave,
}: UpdatingUserModalComponentProps) => {
  const [userName, setUserName] = useState(user?.userName || "");
  const [userEmail, setUserEmail] = useState(user?.userEmail || "");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState<UserRole>(
    user?.userRole || UserRole.Customer
  );
  const [userAvatar, setUserAvatar] = useState<ImageCreateType[]>([]);

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      setUserEmail(user.userEmail);
      setUserRole(user.userRole);
    }
  }, [user]);

  const handleSave = () => {
    const userData: UserUpdateType | UserCreateType = {
      userName,
      userEmail,
      userPassword,
      userRole,
    };
    onSave(userData);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const convertedImages: ImageCreateType[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 500,
        });
        const base64Image = await imageCompression.getDataUrlFromFile(
          compressedFile
        );
        convertedImages.push({ imageData: base64Image });
      }
      setUserAvatar(convertedImages);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-4 rounded shadow-lg z-10 dark:text-dark">
        <h2 className="text-xl font-bold mb-4">
          {user ? "Update User" : "Create User"}
        </h2>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            className="w-full border px-2 py-1"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="w-full border px-2 py-1"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        {!user && (
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              className="w-full border px-2 py-1"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-2">Role</label>
          <select
            className="w-full border px-2 py-1"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as UserRole)}
          >
            {Object.values(UserRole).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Avatar</label>
          <input
            type="file"
            className="w-full border px-2 py-1"
            multiple
            onChange={handleImageUpload}
          />
        </div>
        <ButtonComponent onClick={handleSave}>
          {user ? "Update" : "Create"}
        </ButtonComponent>
      </div>
    </div>
  );
};

export default UpdatingUserModalComponent;
