// AuthContext.js - การจัดการ Authentication
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // โหลดข้อมูลผู้ใช้จาก localStorage เมื่อเริ่มต้น
  useEffect(() => {
    const savedUser = localStorage.getItem('restaurant_app_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('restaurant_app_user');
      }
    }
    setIsLoading(false);
  }, []);

  // ฟังก์ชันสมัครสมาชิก
  const register = async (userData) => {
    try {
      // จำลองการเรียก API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // ตรวจสอบว่าอีเมลนี้มีอยู่แล้วหรือไม่
      const existingUsers = JSON.parse(localStorage.getItem('restaurant_app_users') || '[]');
      const emailExists = existingUsers.some(user => user.email === userData.email);
      
      if (emailExists) {
        throw new Error('อีเมลนี้ถูกใช้งานแล้ว');
      }

      // สร้างผู้ใช้ใหม่
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=667eea&color=fff`,
        createdAt: new Date().toISOString(),
        favoriteRestaurants: [],
        reviews: []
      };

      // บันทึกข้อมูลผู้ใช้ทั้งหมด
      existingUsers.push({ ...newUser, password: userData.password });
      localStorage.setItem('restaurant_app_users', JSON.stringify(existingUsers));

      // ตั้งค่าผู้ใช้ปัจจุบัน (ไม่รวม password)
      const userWithoutPassword = { ...newUser };
      setUser(userWithoutPassword);
      localStorage.setItem('restaurant_app_user', JSON.stringify(userWithoutPassword));

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      throw new Error(error.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
    }
  };

  // ฟังก์ชันเข้าสู่ระบบ
  const login = async (email, password) => {
    try {
      // จำลองการเรียก API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // ตรวจสอบข้อมูลผู้ใช้
      const existingUsers = JSON.parse(localStorage.getItem('restaurant_app_users') || '[]');
      const foundUser = existingUsers.find(user => user.email === email && user.password === password);
      
      if (!foundUser) {
        throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      }

      // ตั้งค่าผู้ใช้ปัจจุบัน (ไม่รวม password)
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      
      setUser(userWithoutPassword);
      localStorage.setItem('restaurant_app_user', JSON.stringify(userWithoutPassword));

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      throw new Error(error.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  // ฟังก์ชันออกจากระบบ
  const logout = () => {
    setUser(null);
    localStorage.removeItem('restaurant_app_user');
  };

  // ฟังก์ชันอัพเดทข้อมูลผู้ใช้
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('restaurant_app_user', JSON.stringify(updatedUser));
    
    // อัพเดทข้อมูลใน users list ด้วย
    const existingUsers = JSON.parse(localStorage.getItem('restaurant_app_users') || '[]');
    const userIndex = existingUsers.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      existingUsers[userIndex] = { ...existingUsers[userIndex], ...updatedData };
      localStorage.setItem('restaurant_app_users', JSON.stringify(existingUsers));
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};