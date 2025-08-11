import React from 'react';

interface ModalProps {
  show: boolean;
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  onSave?: () => void;
  showSave?: boolean;
  saveLabel?: string;
  cancelLabel?: string;
}

const Modal: React.FC<ModalProps> = ({ show, title, children, onCancel, onSave, showSave = true, saveLabel = 'Save', cancelLabel = 'Cancel' }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        {children}
        <div className="modal-actions">
          <button onClick={onCancel}>{cancelLabel}</button>
          {showSave && onSave && <button onClick={onSave}>{saveLabel}</button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
