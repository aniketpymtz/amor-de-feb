'use client';

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

  const handleYesClick = () => {
    setShowCelebration(true);
    createHearts();
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-200 via-red-200 to-pink-300">
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

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-8 text-center">
        {!showCelebration ? (
          <>
            <h1 className="mb-12 text-5xl md:text-6xl font-bold text-red-600 drop-shadow-lg animate-pulse">
              Will you be my valentine<br/>this year and ever after?
            </h1>
            
            <div className="relative w-full max-w-md h-32">
              {/* Yes Button - Fixed Position */}
              <button
                onClick={handleYesClick}
                className="absolute left-1/2 -translate-x-full -ml-4 px-12 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-2xl font-bold rounded-full shadow-lg hover:from-red-600 hover:to-pink-600 hover:scale-110 transition-all duration-300 hover:shadow-2xl"
              >
                Yes! 💕
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
          <div className="text-center animate-bounce">
            <h1 className="text-7xl mb-6">💖</h1>
            <h2 className="text-5xl font-bold text-red-600 mb-4">
              Yay! I knew it! 💕
            </h2>
            <p className="text-2xl text-red-500">
              You just made my Valentine&apos;s Day perfect! ❤️
            </p>
          </div>
        )}
      </main>

      {/* CSS Animations */}
      <style jsx>{`
        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
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
      `}</style>
    </div>
  );
}
