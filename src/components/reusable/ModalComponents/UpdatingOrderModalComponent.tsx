import React, { ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const UpdatingProductModalComponent = ({ onClose, children }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-4 rounded shadow-lg z-10">
        {children}
      </div>
    </div>
  );
};

export default UpdatingProductModalComponent;
