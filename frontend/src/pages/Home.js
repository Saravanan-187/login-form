import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f0f, #1c1c1c)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'Segoe UI, Arial, sans-serif',
      }}
    >
      {userName ? (
        <>
          <div
            style={{
              fontSize: '2rem',
              marginBottom: '1.5rem',
              fontWeight: 'bold',
              letterSpacing: '1px',
              textShadow: '1px 1px 8px #3333',
            }}
          >
            Welcome, {userName}!
          </div>
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <div
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            letterSpacing: '1px',
            textShadow: '1px 1px 8px #3333',
          }}
        >
          LOGIN SUCCESS
        </div>
      )}
    </div>
  )
}

export default Home