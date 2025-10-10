// setupDemoUser.js - สร้าง demo user สำหรับทดสอบ
export const setupDemoUser = () => {
  const demoUsers = [
    {
      id: 'demo-user-1',
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'demo123',
      avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=667eea&color=fff',
      createdAt: '2024-01-01T00:00:00.000Z',
      favoriteRestaurants: ['1', '3'],
      reviews: [
        {
          id: 'demo-review-1',
          restaurantId: '1',
          rating: 5,
          comment: 'อร่อยมากครับ แนะนำเลย!',
          createdAt: '2024-01-15T10:30:00.000Z'
        },
        {
          id: 'demo-review-2',
          restaurantId: '3',
          rating: 4,
          comment: 'พิซซ่าอร่อย บรรยากาศดี',
          createdAt: '2024-01-20T14:15:00.000Z'
        }
      ]
    }
  ];

  // ตรวจสอบว่ามี demo user อยู่แล้วหรือไม่
  const existingUsers = JSON.parse(localStorage.getItem('restaurant_app_users') || '[]');
  
  // ถ้าไม่มี demo user ให้สร้างใหม่
  if (!existingUsers.some(user => user.email === 'demo@example.com')) {
    const updatedUsers = [...existingUsers, ...demoUsers];
    localStorage.setItem('restaurant_app_users', JSON.stringify(updatedUsers));
    console.log('🎯 Demo user created! Email: demo@example.com, Password: demo123');
  }
};

// เรียกใช้เมื่อโหลดหน้าแรก
setupDemoUser();