/**
 * ฟังก์ชันช่วยตรวจสอบอักขระพิเศษที่อันตราย
 */
const hasDangerousCharacters = (str) => {
  const dangerousPatterns = /<script|<iframe|javascript:|onerror=|onclick=/i;
  return dangerousPatterns.test(str);
};

/**
 * Middleware สำหรับตรวจสอบข้อมูลรีวิวก่อนบันทึก
 */
const validateReview = (req, res, next) => {
  const { restaurantId, userName, rating, comment } = req.body;
  const errors = [];
  
  // ตรวจสอบ restaurantId
  if (!restaurantId) {
    errors.push('กรุณาระบุรหัสร้านอาหาร');
  } else if (isNaN(parseInt(restaurantId))) {
    errors.push('รหัสร้านต้องเป็นตัวเลข');
  } else if (parseInt(restaurantId) <= 0) {
    errors.push('รหัสร้านต้องมากกว่า 0');
  }
  
  // ตรวจสอบ userName
  if (!userName || !userName.trim()) {
    errors.push('กรุณากรอกชื่อ');
  } else if (userName.trim().length < 2) {
    errors.push('ชื่อต้องมีอย่างน้อย 2 ตัวอักษร');
  } else if (userName.trim().length > 50) {
    errors.push('ชื่อต้องไม่เกิน 50 ตัวอักษร');
  } else if (hasDangerousCharacters(userName)) {
    errors.push('ชื่อมีอักขระที่ไม่อนุญาต');
  }
  
  // ตรวจสอบ rating
  const ratingNum = parseInt(rating);
  if (!rating) {
    errors.push('กรุณาเลือกคะแนน');
  } else if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    errors.push('คะแนนต้องอยู่ระหว่าง 1-5');
  }
  
  // ตรวจสอบ comment
  if (!comment || !comment.trim()) {
    errors.push('กรุณากรอกความคิดเห็น');
  } else if (comment.trim().length < 10) {
    errors.push('ความคิดเห็นต้องมีอย่างน้อย 10 ตัวอักษร');
  } else if (comment.trim().length > 500) {
    errors.push('ความคิดเห็นต้องไม่เกิน 500 ตัวอักษร');
  } else if (hasDangerousCharacters(comment)) {
    errors.push('ความคิดเห็นมีอักขระที่ไม่อนุญาต');
  }
  
  // ตรวจสอบว่ามี error หรือไม่
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'ข้อมูลไม่ถูกต้อง',
      errors: errors
    });
  }
  
  next();
};

module.exports = {
  validateReview
};