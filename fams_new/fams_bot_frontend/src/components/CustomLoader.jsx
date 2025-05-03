import { useEffect, useState } from "react";

export function CustomLoader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    // Simulate loading, hide after 2 seconds (replace with real logic if needed)
    const timer = setTimeout(() => setHide(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (hide) return null;

  return (
    <div className="custom-loader">
      <div className="custom-loader-bg" />
      <div className="custom-loader-content">
        <div className="custom-loader-spinner" />
        <h2>Customization avatar will coming soon</h2>
      </div>
      <style>{`
        .custom-loader {
          position: fixed;
          z-index: 9999;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(16px);
          background: rgba(80, 70, 180, 0.25);
          transition: opacity 0.5s;
        }
        .custom-loader-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, #6dd5ed 0%, #a084ee 100%);
          opacity: 0.85;
          animation: loader-bg-anim 2s linear infinite alternate;
          z-index: 0;
        }
        @keyframes loader-bg-anim {
          0% { filter: blur(0px) brightness(1); }
          100% { filter: blur(8px) brightness(1.1); }
        }
        .custom-loader-content {
          position: relative;
          z-index: 1;
          text-align: center;
          color: #fff;
          font-family: 'Inter', sans-serif;
        }
        .custom-loader-spinner {
          margin: 0 auto 24px auto;
          width: 48px;
          height: 48px;
          border: 6px solid #a084ee;
          border-top: 6px solid #6dd5ed;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          background: transparent;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        .custom-loader-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-shadow: 0 2px 16px #6dd5ed88;
        }
      `}</style>
    </div>
  );
}