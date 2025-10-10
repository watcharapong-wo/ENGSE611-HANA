// ImageUploader.jsx - Component สำหรับอัพโหลดรูปภาพ
import React, { useState, useRef } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import './ImageUploader.css';

const ImageUploader = ({ images = [], onChange, disabled = false, maxImages = 3 }) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const { showSuccess, showError, showWarning } = useNotification();

  // ฟังก์ชันจัดการการเลือกไฟล์
  const handleFileSelect = (files) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const remainingSlots = maxImages - images.length;
    const filesToProcess = fileArray.slice(0, remainingSlots);

    Promise.all(
      filesToProcess.map(file => {
        return new Promise((resolve, reject) => {
          // ตรวจสอบประเภทไฟล์
          if (!file.type.startsWith('image/')) {
            reject(new Error(`${file.name} ไม่ใช่ไฟล์รูปภาพ`));
            return;
          }

          // ตรวจสอบขนาดไฟล์ (5MB)
          if (file.size > 5 * 1024 * 1024) {
            reject(new Error(`${file.name} มีขนาดใหญ่เกิน 5MB`));
            return;
          }

          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({
              id: Date.now() + Math.random(),
              file: file,
              dataUrl: e.target.result,
              name: file.name,
              size: file.size
            });
          };
          reader.onerror = () => reject(new Error(`ไม่สามารถอ่านไฟล์ ${file.name} ได้`));
          reader.readAsDataURL(file);
        });
      })
    ).then(newImages => {
      onChange([...images, ...newImages]);
      if (newImages.length > 0) {
        showSuccess(`เพิ่มรูปภาพ ${newImages.length} รูปเรียบร้อยแล้ว! 📸`);
      }
    }).catch(error => {
      showError(error.message);
    });
  };

  // จัดการการคลิกปุ่มเลือกไฟล์
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // จัดการการลากไฟล์
  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    if (disabled) return;
    
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  // ลบรูปภาพ
  const removeImage = (imageId) => {
    onChange(images.filter(img => img.id !== imageId));
  };

  return (
    <div className="image-uploader">
      {/* Preview Images */}
      {images.length > 0 && (
        <div className="image-preview-container">
          {images.map(image => (
            <div key={image.id} className="image-preview">
              <img src={image.dataUrl} alt={image.name} />
              <button
                type="button"
                className="remove-image-btn"
                onClick={() => removeImage(image.id)}
                disabled={disabled}
              >
                ×
              </button>
              <div className="image-info">
                <span className="image-name">{image.name}</span>
                <span className="image-size">{(image.size / 1024).toFixed(1)} KB</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          className={`upload-area ${dragOver ? 'drag-over' : ''} ${disabled ? 'disabled' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={!disabled ? handleButtonClick : undefined}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
            style={{ display: 'none' }}
            disabled={disabled}
          />
          
          <div className="upload-content">
            <div className="upload-icon">📸</div>
            <div className="upload-text">
              <p>คลิกหรือลากไฟล์รูปภาพมาที่นี่</p>
              <p className="upload-hint">
                รองรับ JPG, PNG, GIF (สูงสุด 5MB)
                <br />
                เหลืออีก {maxImages - images.length} รูป
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Info Text */}
      <div className="upload-info">
        <p>💡 <strong>เทิปการถ่ายรูป:</strong> ถ่ายรูปอาหารในแสงสว่าง แนะนำมุมที่สวยงาม</p>
      </div>
    </div>
  );
};

export default ImageUploader;