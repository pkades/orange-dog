
import React from 'react';

interface Layout3Props {
  logoUrl: string | null;
  phoneNumber: string;
  location: string;
  accentColor: string;
}

const Layout3Design: React.FC<Layout3Props> = ({
  logoUrl,
  phoneNumber,
  location,
  accentColor,
}) => {
  // Convert location string to array of lines
  const locationLines = location ? location.split('\n') : [];
  
  return (
    <div style={{
      width: '193px', // 68mm at ~72 DPI
      height: '128px', // 45mm at ~72 DPI
      position: 'relative',
      background: '#FFFFFF',
      overflow: 'hidden',
      display: 'flex',
    }}>
      {/* Left Accent Panel */}
      <div style={{
        width: '98px', // 33.5mm scaled down (~379.89px → 98px)
        height: '128px',
        backgroundColor: accentColor || '#dcdcdc',
        padding: '10px',
        boxSizing: 'border-box',
        color: '#000',
      }}>
        {/* Logo */}
        <div style={{
          width: '78px', // full width less padding
          height: '30px',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
        }}>
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt="Logo" 
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
            />
          ) : (
            <div style={{ 
              fontSize: '14px', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              border: '1px dashed #ccc',
              backgroundColor: 'white',
            }}>LOGO</div>
          )}
        </div>
        
        {/* Contact Info */}
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '10px',
          fontWeight: 'bold',
          textAlign: 'left',
          lineHeight: '1.1',
        }}>
          <div>{phoneNumber || '123-456-7890'}</div>
          {locationLines.length > 0 ? (
            locationLines.map((line, index) => (
              <div key={index} style={{ fontSize: '9px' }}>{line}</div>
            ))
          ) : (
            <div style={{ fontSize: '9px' }}>Wellington, NZ</div>
          )}
        </div>
      </div>
      
      {/* Right Fields */}
      <div style={{
        flex: 1,
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '12px',
      }}>
        {/* Date Field */}
        <div>
          <div style={{
            width: '57px', // 222.26px scaled down
            height: '11px', // 42px scaled down
            backgroundColor: '#000',
            color: '#fff',
            fontSize: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Arial Narrow', sans-serif",
          }}>
            DATE
          </div>
          <div style={{
            width: '74px', // 288px scaled down
            height: '32px', // 123px scaled down
            border: '1px solid #000',
          }}></div>
        </div>
        
        {/* KM Field */}
        <div>
          <div style={{
            width: '57px', // 222.26px scaled down
            height: '11px', // 42px scaled down
            backgroundColor: '#000',
            color: '#fff',
            fontSize: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Arial Narrow', sans-serif",
          }}>
            KM
          </div>
          <div style={{
            width: '74px', // 288px scaled down
            height: '32px', // 123px scaled down
            border: '1px solid #000',
          }}></div>
        </div>
      </div>
    </div>
  );
};

export default Layout3Design;
