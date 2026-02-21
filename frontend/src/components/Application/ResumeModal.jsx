import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="resume-modal" onClick={onClose}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>

        <img
          src={imageUrl}
          alt="resume"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export default ResumeModal;