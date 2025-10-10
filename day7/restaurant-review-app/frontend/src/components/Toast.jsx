// Toast.jsx - Component สำหรับแสดงการแจ้งเตือน
import React from 'react';
import './Toast.css';

const Toast = ({ notifications, onClose }) => {
  if (!notifications || notifications.length === 0) {
    return null;
  }

  return (
    <div className="toast-container">
      {notifications.map((notification) => (
        <ToastItem 
          key={notification.id}
          notification={notification}
          onClose={onClose}
        />
      ))}
    </div>
  );
};

const ToastItem = ({ notification, onClose }) => {
  const handleClose = () => {
    onClose(notification.id);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return '💡';
    }
  };

  return (
    <div 
      className={`toast-item toast-${notification.type}`}
      onClick={handleClose}
    >
      <div className="toast-content">
        <div className="toast-icon">
          {getIcon()}
        </div>
        <div className="toast-text">
          {notification.title && (
            <div className="toast-title">{notification.title}</div>
          )}
          <div className="toast-message">{notification.message}</div>
        </div>
        <button 
          className="toast-close"
          onClick={handleClose}
          aria-label="ปิดการแจ้งเตือน"
        >
          ×
        </button>
      </div>
      <div className="toast-progress"></div>
    </div>
  );
};

export default Toast;