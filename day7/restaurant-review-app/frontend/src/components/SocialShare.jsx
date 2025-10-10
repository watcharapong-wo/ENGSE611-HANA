// SocialShare.jsx - Component สำหรับแชร์รีวิวใน Social Media
import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import './SocialShare.css';

const SocialShare = ({ restaurant, review }) => {
  const { showSuccess, showInfo } = useNotification();
  const [isOpen, setIsOpen] = useState(false);

  // สร้าง URL และข้อความสำหรับการแชร์
  const generateShareContent = () => {
    const baseUrl = window.location.origin;
    const restaurantUrl = `${baseUrl}?restaurant=${restaurant.id}`;
    
    const shareText = review 
      ? `🍽️ เพิ่งไปกิน "${restaurant.name}" มา ให้ ${review.rating} ดาว! ${review.comment.slice(0, 100)}${review.comment.length > 100 ? '...' : ''}`
      : `🍽️ แนะนำร้าน "${restaurant.name}" - ${restaurant.description}`;
    
    const hashtags = ['RestaurantReview', 'อาหารอร่อย', restaurant.cuisine.replace('อาหาร', '').replace(' ', '')];
    
    return {
      url: restaurantUrl,
      text: shareText,
      hashtags: hashtags.join(',')
    };
  };

  // ฟังก์ชันแชร์ไปยัง Facebook
  const shareToFacebook = () => {
    const { url, text } = generateShareContent();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    showSuccess('กำลังเปิดหน้าแชร์ Facebook! 📘');
    setIsOpen(false);
  };

  // ฟังก์ชันแชร์ไปยัง Twitter
  const shareToTwitter = () => {
    const { url, text, hashtags } = generateShareContent();
    const twitterText = `${text}\n\n${url}\n\n#${hashtags.replace(/,/g, ' #')}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
    
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    showSuccess('กำลังเปิดหน้าแชร์ Twitter! 🐦');
    setIsOpen(false);
  };

  // ฟังก์ชันแชร์ไปยัง LINE
  const shareToLine = () => {
    const { url, text } = generateShareContent();
    const lineText = `${text}\n\n${url}`;
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    
    window.open(lineUrl, '_blank', 'width=600,height=400');
    showSuccess('กำลังเปิดหน้าแชร์ LINE! 💚');
    setIsOpen(false);
  };

  // คัดลอก URL
  const copyToClipboard = async () => {
    const { url, text } = generateShareContent();
    const fullText = `${text}\n\n${url}`;
    
    try {
      await navigator.clipboard.writeText(fullText);
      showSuccess('คัดลอกลิงก์เรียบร้อยแล้ว! 📋 พร้อมแชร์ได้เลย');
    } catch (err) {
      // Fallback สำหรับ browser ที่ไม่รองรับ clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = fullText;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        showSuccess('คัดลอกลิงก์เรียบร้อยแล้ว! 📋 พร้อมแชร์ได้เลย');
      } catch (fallbackErr) {
        showInfo('กรุณาคัดลอกลิงก์ด้วยตนเอง: ' + fullText);
      }
      
      document.body.removeChild(textArea);
    }
    setIsOpen(false);
  };

  // แชร์ผ่าน Web Share API (สำหรับมือถือ)
  const shareNative = async () => {
    const { url, text } = generateShareContent();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `รีวิวร้าน ${restaurant.name}`,
          text: text,
          url: url,
        });
        showSuccess('แชร์เรียบร้อยแล้ว! 🎉');
      } catch (err) {
        if (err.name !== 'AbortError') {
          showInfo('การแชร์ถูกยกเลิก');
        }
      }
    } else {
      showInfo('เบราว์เซอร์ไม่รองรับการแชร์โดยตรง กรุณาเลือกแพลตฟอร์มด้านล่าง');
    }
    setIsOpen(false);
  };

  return (
    <div className="social-share">
      <button 
        className="share-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="แชร์รีวิว"
      >
        🔗 แชร์
      </button>

      {isOpen && (
        <>
          <div className="share-overlay" onClick={() => setIsOpen(false)} />
          <div className="share-popup">
            <div className="share-header">
              <h3>📤 แชร์รีวิว</h3>
              <button 
                className="share-close"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="share-preview">
              <div className="share-restaurant">
                <img src={restaurant.image} alt={restaurant.name} />
                <div>
                  <h4>{restaurant.name}</h4>
                  <p>{restaurant.cuisine}</p>
                  {review && (
                    <div className="share-rating">
                      {'⭐'.repeat(review.rating)} ({review.rating}/5)
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="share-options">
              {/* Web Share API (สำหรับมือถือ) */}
              {navigator.share && (
                <button 
                  className="share-btn share-native"
                  onClick={shareNative}
                >
                  📱 แชร์
                </button>
              )}

              {/* Facebook */}
              <button 
                className="share-btn share-facebook"
                onClick={shareToFacebook}
              >
                📘 Facebook
              </button>

              {/* Twitter */}
              <button 
                className="share-btn share-twitter"
                onClick={shareToTwitter}
              >
                🐦 Twitter
              </button>

              {/* LINE */}
              <button 
                className="share-btn share-line"
                onClick={shareToLine}
              >
                💚 LINE
              </button>

              {/* Copy Link */}
              <button 
                className="share-btn share-copy"
                onClick={copyToClipboard}
              >
                📋 คัดลอกลิงก์
              </button>
            </div>

            <div className="share-tip">
              💡 <strong>เทิป:</strong> แชร์รีวิวเพื่อช่วยเพื่อน ๆ ค้นหาร้านอาหารดี ๆ
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SocialShare;