'use client';

import React from 'react';
import Link from 'next/link';

export default function MyLearningButton() {
  const label = "My Enrollments";
  
  return (
    <>
      <style jsx>{`
        .my-learning-btn {
          --primary: #6366f1;
          --neutral-1: #f7f8f7;
          --neutral-2: #e7e7e7;
          --radius: 14px;

          cursor: pointer;
          border-radius: var(--radius);
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
          border: none;
          box-shadow: 0 0.5px 0.5px 1px rgba(255, 255, 255, 0.2),
            0 10px 20px rgba(0, 0, 0, 0.1), 0 4px 5px 0px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.3s ease;
          min-width: 120px;
          padding: 0 12px;
          height: 38px;
          font-family: inherit;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: white;
          color: #1a1a1a;
        }

        .my-learning-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 0 1px 2px rgba(255, 255, 255, 0.3),
            0 15px 30px rgba(0, 0, 0, 0.15), 0 10px 3px -3px rgba(0, 0, 0, 0.04);
        }

        .my-learning-btn:active {
          transform: scale(0.98);
        }

        .my-learning-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: var(--radius);
          border: 2px solid transparent;
          background: linear-gradient(var(--neutral-1), var(--neutral-2)) padding-box,
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.2)) border-box;
          z-index: 0;
          transition: all 0.4s ease;
        }

        .my-learning-btn:hover::after {
          transform: scale(1.02, 1.05);
          box-shadow: inset 0 -1px 3px 0 rgba(255, 255, 255, 1);
        }

        .my-learning-btn::before {
          content: "";
          inset: 3px;
          position: absolute;
          background: linear-gradient(to top, var(--neutral-1), var(--neutral-2));
          border-radius: 12px;
          filter: blur(0.5px);
          z-index: 2;
        }

        .state {
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .state p {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
        }

        .state p span {
          display: block;
          opacity: 0;
          animation: slideDown 0.6s ease forwards calc(var(--i) * 0.02s);
        }

        .my-learning-btn:hover p span {
          opacity: 1;
          animation: wave 0.4s ease forwards calc(var(--i) * 0.01s);
        }

        @keyframes wave {
          30% { opacity: 1; transform: translateY(2px); }
          50% { opacity: 1; transform: translateY(-2px); color: var(--primary); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-10px); filter: blur(2px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .icon {
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .my-learning-btn:hover .icon {
          transform: scale(1.2) rotate(10deg);
        }
      `}</style>
      
      <Link href="/my-learning">
        <button className="my-learning-btn group">
          <div className="state">
            <div className="icon">
              <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6.00019L12 18.0002M6 12.0002L18 12.0002" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p>
              {label.split('').map((char, index) => (
                <span key={index} style={{ '--i': index } as any}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </p>
          </div>
        </button>
      </Link>
    </>
  );
}
