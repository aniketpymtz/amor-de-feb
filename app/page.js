'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

export default function Home() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [countdown, setCountdown] = useState(5);
  const [showContent, setShowContent] = useState(false);

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

  useEffect(() => {
    // Countdown timer
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowContent(true);
    }
  }, [countdown]);

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
    navigator.clipboard.writeText('6002940049167666');
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-pink-300 via-red-300 to-pink-500/70">
      {/* Countdown Screen */}
      {!showContent && (
        <div className="countdown-screen">
          <div className="countdown-number">
            {countdown > 0 ? countdown : '💖'}
          </div>
          {countdown === 0 && <p className="countdown-text">Get Ready!</p>}
        </div>
      )}

      {/* Main Content */}
      {showContent && (
        <>
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
        <Image 
          src="/pic1.jpg" 
          alt="Mountain landscape"
          width={150}
          height={150}
        />
        <span className="photo-caption">Our first date, date?😌</span>
      </div>
      
      <div className="instax-photo" style={{ position: 'absolute', top: '5%', right: '8%', transform: 'rotate(6deg)' }}>
        <Image
          src="/pic2.jpg" 
          alt="Forest path"
          width={180}
          height={180}
        />
        <span className="photo-caption">Please always look at me<br/>the same way🥹</span>
      </div>
      
      <div className="instax-photo" style={{ position: 'absolute', bottom: '5%', left: '8%', transform: 'rotate(-20deg)' }}>
        <Image 
          src="/pic3.jpg" 
          alt="Sunset nature"
          width={180}
          height={180}
          className=''
        />
        <span className="photo-caption">That&apos;s how every new year<br/>should look like🫂</span>
      </div>
      
      <div className="instax-photo" style={{ position: 'absolute', bottom: '10%', right: '6%', transform: 'rotate(-7deg)' }}>
        <Image
          src="/pic4.jpg" 
          alt="Lake and mountains"
          width={180}
          height={180}
        />
        <span className="photo-caption">I love you noo 👽🥰</span>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-8 text-center">
        {!showCelebration ? (
          <>
            <h1 className="mb-12 text-5xl md:text-6xl font-bold text-red-600 drop-shadow-lg animate-pulse">
              Will you be my valentine<br/>this year and ever after?
            </h1>
             
            <div className="relative w-full max-w-md h-32">
              {/* Yes Button - Fixed Position */}
              
              <div className='relative flex flex-col gap-1'>  
              <button
                onClick={handleYesClick}
                className="absolute left-1/2 -translate-x-full -ml-4 px-12 py-4 bg-linear-to-r from-red-500 to-blue-500 text-white text-2xl font-bold rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 hover:scale-110 transition-all duration-300 hover:shadow-2xl"
              >
                Yes! 💕
              </button>
              <span className='absolute left-3 text-black'>Try clicking on No, and you&apos;ll see what happens!</span>
              </div>
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
               Anyways you had no other option 😛😘 
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
                        value="6002940049167666" 
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
                    <p>PIN: 266885</p>
                  </div>
                  
                  <div className="gift-card-footer">
                    <p className="text-xs text-gray-500">*Please check its validity</p>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
        </>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        .countdown-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #ff1493 0%, #ff69b4 50%, #ff1493 100%);
          z-index: 9999;
        }
        
        .countdown-number {
          font-size: 10rem;
          font-weight: bold;
          color: white;
          text-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          animation: countdownPulse 1s ease-in-out;
        }
        
        .countdown-text {
          font-size: 2rem;
          color: white;
          margin-top: 2rem;
          animation: fadeIn 0.5s ease-in;
        }
        
        @keyframes countdownPulse {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .gift-card-container {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
          perspective: 1000px;
        }
        
        .gift-card {
          background: linear-gradient(135deg, 
            #ff1493 0%, 
            #ff69b4 15%, 
            #ff1493 30%, 
            #c71585 50%, 
            #ff1493 70%, 
            #ff69b4 85%, 
            #ff1493 100%);
          border-radius: 20px;
          padding: 0;
          max-width: 450px;
          width: 100%;
          box-shadow: 
            0 10px 40px rgba(255, 20, 147, 0.5),
            0 0 60px rgba(255, 105, 180, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2);
          animation: cardShine 3s ease-in-out infinite alternate, float 3s ease-in-out infinite;
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
        }
        
        .gift-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 70%
          );
          animation: shine 3s ease-in-out infinite;
        }
        
        @keyframes cardShine {
          from {
            box-shadow: 
              0 10px 40px rgba(255, 20, 147, 0.5),
              0 0 60px rgba(255, 105, 180, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.4),
              inset 0 -1px 0 rgba(0, 0, 0, 0.2);
          }
          to {
            box-shadow: 
              0 15px 50px rgba(255, 20, 147, 0.7),
              0 0 80px rgba(255, 105, 180, 0.4),
              inset 0 2px 0 rgba(255, 255, 255, 0.5),
              inset 0 -2px 0 rgba(0, 0, 0, 0.3);
          }
        }
        
        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotateX(0deg);
          }
          50% {
            transform: translateY(-10px) rotateX(2deg);
          }
        }
        
        .gift-card-header {
          background: linear-gradient(135deg, 
            rgba(199, 21, 133, 0.9) 0%, 
            rgba(255, 20, 147, 0.9) 50%,
            rgba(199, 21, 133, 0.9) 100%);
          padding: 1.5rem;
          border-radius: 18px 18px 0 0;
          text-align: center;
          position: relative;
          backdrop-filter: blur(10px);
          border-bottom: 2px solid rgba(255, 255, 255, 0.3);
        }
        
        .gift-card-header h3 {
          text-shadow: 
            0 2px 4px rgba(0, 0, 0, 0.3),
            0 0 10px rgba(255, 255, 255, 0.2);
        }
        
        .gift-card-body {
          background: linear-gradient(135deg, 
            #2c2c2c 0%, 
            #3a3a3a 50%, 
            #2c2c2c 100%);
          padding: 2rem;
          border-radius: 0 0 18px 18px;
          flex-direction: column;
          display: flex;
          align-items: center;
          position: relative;
          box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        .gift-card-body::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(255, 20, 147, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 105, 180, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .coupon-value {
          text-align: center;
          margin-bottom: 1.5rem;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, 
            rgba(255, 20, 147, 0.2) 0%, 
            rgba(255, 105, 180, 0.1) 50%,
            rgba(255, 20, 147, 0.2) 100%);
          border-radius: 12px;
          border: 2px solid rgba(255, 20, 147, 0.5);
          box-shadow: 
            0 4px 15px rgba(255, 20, 147, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        
        .coupon-value::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 40%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 60%
          );
          animation: valueShine 2s ease-in-out infinite;
        }
        
        @keyframes valueShine {
          0% {
            transform: translateX(-100%) translateY(-100%);
          }
          100% {
            transform: translateX(100%) translateY(100%);
          }
        }
        
        .coupon-value span {
          position: relative;
          z-index: 1;
          background: linear-gradient(135deg, #ff1493 0%, #ff69b4 50%, #ff1493 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }
        
        .coupon-code-section {
          margin-bottom: 1.5rem;
          text-align: center;
          width: 100%;
        }
        
        .coupon-code-section p {
          color: #ff1493;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.85rem;
        }
        
        .coupon-code-container {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          align-items: center;
        }
        
        .coupon-code-input {
          padding: 0.75rem 1rem;
          border: 2px solid rgba(255, 20, 147, 0.6);
          border-radius: 8px;
          font-family: 'Courier New', monospace;
          font-weight: bold;
          font-size: 1rem;
          color: #ff1493;
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          text-align: center;
          letter-spacing: 3px;
          box-shadow: 
            inset 0 2px 8px rgba(0, 0, 0, 0.5),
            0 0 15px rgba(255, 20, 147, 0.2);
        }
        
        .copy-button {
          padding: 0.75rem 1.25rem;
          background: linear-gradient(135deg, 
            #ff1493 0%, 
            #ff69b4 50%, 
            #ff1493 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
          box-shadow: 
            0 4px 15px rgba(255, 20, 147, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .copy-button:hover {
          transform: scale(1.05);
          box-shadow: 
            0 6px 20px rgba(255, 20, 147, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }
        
        .copy-button:active {
          transform: scale(0.98);
        }
        
        .gift-card-footer {
          text-align: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 20, 147, 0.3);
          width: 100%;
        }
        
        .gift-card-footer p {
          color: #ff69b4;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
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
            padding: 8px 8px 35px 8px;
          }
          
          .instax-photo img {
            width: 120px;
            height: 120px;
          }
          
          .photo-caption {
            font-size: 10px;
            bottom: 5px;
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
