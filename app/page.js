'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

export default function Home() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set window size on mount and update on resize
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const handleNoHover = () => {
    // Get viewport dimensions
    const maxX = window.innerWidth - 200; // button width buffer
    const maxY = window.innerHeight - 100; // button height buffer
    
    // Generate random position
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    setNoButtonPosition({ x: newX, y: newY });
  };

  const [copied, setCopied] = useState(false);

  const handleYesClick = () => {
    setShowCelebration(true);
    createHearts();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('NYKAA2026LOVE');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const createHearts = () => {
    const newHearts = [];
    for (let i = 0; i < 30; i++) {
      newHearts.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 2,
        size: Math.random() * 20 + 20,
        translateX: Math.random() * 100 - 50
      });
    }
    setHearts(newHearts);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-blue-200 via-red-200 to-blue-300">
      {/* React Confetti */}
      {showCelebration && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          colors={['#ff0080', '#ff4d94', '#ff66a3', '#ff1493', '#dc143c', '#ff69b4', '#ffb6c1']}
          numberOfPieces={200}
          recycle={true}
        />
      )}

      {/* Instax Style Photos */}
      <div className="instax-photo" style={{ position: 'absolute', top: '5%', left: '5%', transform: 'rotate(8deg)' }}>
        <img 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop" 
          alt="Mountain landscape"
          // width={180}
          // height={180}
        />
        <span className="photo-caption">Adventure awaits! 🏔️</span>
      </div>
      
      <div className="instax-photo" style={{ position: 'absolute', top: '15%', right: '8%', transform: 'rotate(6deg)' }}>
        <img 
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop" 
          alt="Forest path"
          // width={180}
          // height={180}
        />
        <span className="photo-caption">Into the woods 🌲</span>
      </div>
      
      <div className="instax-photo" style={{ position: 'absolute', bottom: '5%', left: '8%', transform: 'rotate(-20deg)' }}>
        <img 
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop" 
          alt="Sunset nature"
          // width={180}
          // height={180}
        />
        <span className="photo-caption">Golden hour ✨</span>
      </div>
      
      <div className="instax-photo" style={{ position: 'absolute', bottom: '10%', right: '6%', transform: 'rotate(-7deg)' }}>
        <img 
          src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop" 
          alt="Lake and mountains"
          // width={180}
          // height={180}
        />
        <span className="photo-caption">Peace & quiet 🌅</span>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-8 text-center">
        {!showCelebration ? (
          <>
            {/* <h1 className="mb-12 text-5xl md:text-6xl font-bold text-red-600 drop-shadow-lg animate-pulse">
              Will you be my valentine<br/>this year and ever after?
            </h1> */}
             <h1 className="mb-12 text-5xl md:text-6xl font-bold text-red-600 drop-shadow-lg animate-pulse">
             some random project that i made for fun and to test my skills in web development and design, 
             
            </h1>
            <div className="relative w-full max-w-md h-32">
              {/* Yes Button - Fixed Position */}
              {/* <button
                onClick={handleYesClick}
                className="absolute left-1/2 -translate-x-full -ml-4 px-12 py-4 bg-linear-to-r from-red-500 to-blue-500 text-white text-2xl font-bold rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 hover:scale-110 transition-all duration-300 hover:shadow-2xl"
              >
                Yes! 💕
              </button> */}
               <button
                onClick={handleYesClick}
                className="absolute left-1/2 -translate-x-full -ml-4 px-12 py-4 bg-linear-to-r from-red-500 to-pink-500 text-white text-2xl font-bold rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 hover:scale-110 transition-all duration-300 hover:shadow-2xl"
              >
                Yes! 
              </button>
              {/* No Button - Dynamic Position */}
              <button
                onMouseEnter={handleNoHover}
                style={{
                  position: 'fixed',
                  left: noButtonPosition.x || 'calc(50% + 1rem)',
                  top: noButtonPosition.y || 'auto',
                  transition: 'all 0.3s ease'
                }}
                className="px-12 py-4 bg-gray-400 text-white text-2xl font-bold rounded-full shadow-lg hover:scale-110"
              >
                No
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="animate-bounce mb-8">
              <h1 className="text-7xl mb-6">💖</h1>
              <h2 className="text-5xl font-bold text-red-600 mb-4">
                Yay! I knew it! 💕
              </h2>
              <p className="text-2xl text-red-500 mb-8">
                You just made my Valentine&apos;s Day perfect! ❤️
              </p>
            </div>
            
            {/* Nykaa Gift Card Coupon */}
            <div className="gift-card-container">
              <div className="gift-card">
                <div className="gift-card-header">
                  <h3 className="text-2xl font-bold text-white mb-2">🎁 Special Gift for You!</h3>
                  
                </div>
                
                <div className="gift-card-body">
                   
                  <Image src="/nykaa.png" alt="Nykaa Gift Card" width={200} height={50} className='mb-2' />
                  <div className="coupon-value">
                    <span className="text-4xl font-bold text-pink-600">₹2000</span>
                    
                  </div>
                  
                  <div className="coupon-code-section">
                    <p className="text-sm text-gray-600 mb-2">Use Coupon Code:</p>
                    <div className="coupon-code-container">
                      <input 
                        type="text" 
                        value="NYKAA2026LOVE" 
                        readOnly 
                        className="coupon-code-input"
                      />
                      <button 
                        onClick={handleCopyCode}
                        className="copy-button"
                      >
                        {copied ? '✓ Copied!' : '📋 Copy'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="gift-card-footer">
                    <p className="text-xs text-gray-500">Valid till March 14, 2026</p>
                    <p className="text-xs text-gray-500">Minimum purchase: ₹999</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* CSS Animations */}
      <style jsx>{`
        .gift-card-container {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }
        
        .gift-card {
          background: linear-gradient(135deg, #ff1493 0%, #ff69b4 100%);
          border-radius: 20px;
          padding: 3px;
          max-width: 450px;
          width: 100%;
          box-shadow: 0 10px 40px rgba(255, 20, 147, 0.3);
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from {
            box-shadow: 0 10px 40px rgba(255, 20, 147, 0.3);
          }
          to {
            box-shadow: 0 15px 50px rgba(255, 20, 147, 0.5);
          }
        }
        
        .gift-card-header {
          background: linear-gradient(135deg, #ff1493 0%, #ff69b4 100%);
          padding: 1.5rem;
          border-radius: 18px 18px 0 0;
          text-align: center;
        }
        
        .gift-card-body {
          background: white;
          padding: 2rem;
          border-radius: 0 0 18px 18px;
          flex-direction: column;
          display: flex;
          align-items: center;
        }
        
        .coupon-value {
          text-align: center;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: linear-gradient(135deg, #fff0f5 0%, #ffe4e9 100%);
          border-radius: 12px;
        }
        
        .coupon-code-section {
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .coupon-code-container {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          align-items: center;
        }
        
        .coupon-code-input {
          padding: 0.75rem 1rem;
          border: 2px dashed #ff69b4;
          border-radius: 8px;
          font-family: 'Courier New', monospace;
          font-weight: bold;
          font-size: 1rem;
          color: #ff1493;
          background: #fff0f5;
          text-align: center;
          letter-spacing: 2px;
        }
        
        .copy-button {
          padding: 0.75rem 1.25rem;
          background: linear-gradient(135deg, #ff1493 0%, #ff69b4 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        
        .copy-button:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(255, 20, 147, 0.4);
        }
        
        .copy-button:active {
          transform: scale(0.98);
        }
        
        .gift-card-footer {
          text-align: center;
          padding-top: 1rem;
          border-top: 1px dashed #ffb6c1;
        }
        
        .instax-photo {
          background: white;
          padding: 12px 12px 45px 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          z-index: 5;
        }
        
        .instax-photo:hover {
          transform: scale(1.05) !important;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(0, 0, 0, 0.2);
          z-index: 20;
        }
        
        .instax-photo img {
          width: 180px;
          height: 180px;
          object-fit: cover;
          display: block;
        }
        
        .photo-caption {
          display: block;
          position: absolute;
          bottom: 8px;
          left: 0;
          right: 0;
          text-align: center;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          color: #333;
          font-weight: 500;
        }
        
        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
        }
        
        .heart-float {
          position: fixed;
          bottom: -50px;
          animation: float-up 4s ease-in forwards;
          z-index: 100;
        }
        
        @keyframes float-up {
          to {
            bottom: 100vh;
            opacity: 0;
            transform: translateX(var(--translate-x));
          }
        }
        
        @media (max-width: 768px) {
          .instax-photo {
            display: none;
          }
          
          .gift-card {
            max-width: 90%;
          }
          
          .coupon-code-container {
            flex-direction: column;
          }
          
          .coupon-code-input {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
