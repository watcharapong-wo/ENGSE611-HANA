// NotificationContext.jsx - Context สำหรับจัดการการแจ้งเตือน
import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // เพิ่มการแจ้งเตือนใหม่
  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info', // 'success', 'error', 'warning', 'info'
      title: '',
      message: '',
      duration: 4000,
      ...notification
    };

    setNotifications(prev => [...prev, newNotification]);

    // ลบการแจ้งเตือนอัตโนมัติหลังจากเวลาที่กำหนด
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  };

  // ลบการแจ้งเตือน
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // ลบการแจ้งเตือนทั้งหมด
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // ฟังก์ชันช่วยสำหรับการแจ้งเตือนแต่ละประเภท
  const showSuccess = (message, options = {}) => {
    return addNotification({
      type: 'success',
      title: '✅ สำเร็จ!',
      message,
      ...options
    });
  };

  const showError = (message, options = {}) => {
    return addNotification({
      type: 'error',
      title: '❌ เกิดข้อผิดพลาด!',
      message,
      duration: 6000, // Error messages stay longer
      ...options
    });
  };

  const showWarning = (message, options = {}) => {
    return addNotification({
      type: 'warning',
      title: '⚠️ คำเตือน!',
      message,
      ...options
    });
  };

  const showInfo = (message, options = {}) => {
    return addNotification({
      type: 'info',
      title: '💡 ข้อมูล',
      message,
      ...options
    });
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Toast 
        notifications={notifications}
        onClose={removeNotification}
      />
    </NotificationContext.Provider>
  );
};