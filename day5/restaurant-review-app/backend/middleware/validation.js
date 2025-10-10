const validateReview = (req, res, next) => {
  const { restaurantId, userName, rating, comment } = req.body;
  const errors = [];

  // TODO: ตรวจสอบ restaurantId
  // - ต้องมีค่า
  // - ต้องเป็นตัวเลข
  if (!restaurantId) {
    errors.push("restaurantId is required");
  } else if (isNaN(parseInt(restaurantId))) {
    errors.push("restaurantId must be a number");
  }

  // TODO: ตรวจสอบ userName
  // - ต้องมีค่า
  // - ความยาว 2-50 ตัวอักษร
  // - ไม่มีอักขระพิเศษที่อันตราย (<script, etc.)
  if (!userName || typeof userName !== "string") {
    errors.push("userName is required and must be a string");
  } else if (userName.trim().length < 2) {
    errors.push("userName must be at least 2 characters long");
  } else if (userName.trim().length > 50) {
    errors.push("userName must not exceed 50 characters");
  } else if (/[<>{}]/.test(userName)) {
    errors.push("userName contains invalid characters");
  }

  // TODO: ตรวจสอบ rating
  // - ต้องมีค่า
  // - ต้องเป็นตัวเลข 1-5
  if (rating === undefined || rating === null) {
    errors.push("rating is required");
  } else {
    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      errors.push("rating must be a number between 1 and 5");
    }
  }

  // TODO: ตรวจสอบ comment
  // - ต้องมีค่า
  // - ความยาว 10-500 ตัวอักษร
  // - ไม่มีอักขระพิเศษที่อันตราย
  if (!comment || typeof comment !== "string") {
    errors.push("comment is required and must be a string");
  } else if (comment.trim().length < 10) {
    errors.push("comment must be at least 10 characters long");
  } else if (comment.trim().length > 500) {
    errors.push("comment must not exceed 500 characters");
  } else if (/[<>{}]/.test(comment)) {
    errors.push("comment contains invalid characters");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};

module.exports = {
  validateReview,
};