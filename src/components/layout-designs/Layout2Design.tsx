
import React from 'react';

interface Layout2Props {
  logoUrl: string | null;
  phoneNumber: string;
  location: string;
}

const Layout2Design: React.FC<Layout2Props> = ({
  logoUrl,
  phoneNumber,
  location,
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
    }}>
      {/* Logo */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        width: '70px',
        height: '40px',
      }}>
        {logoUrl ? (
          <img 
            src={logoUrl} 
            alt="Logo" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              objectFit: 'contain' 
            }} 
          />
        ) : (
          <div style={{ 
            fontSize: '16px', 
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            border: '1px dashed #ccc'
          }}>LOGO</div>
        )}
      </div>
      
      {/* Contact Info */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        textAlign: 'right',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '12px',
        fontWeight: 'bold',
        lineHeight: '1.2',
      }}>
        <div>{phoneNumber || '123-456-7890'}</div>
        {locationLines.length > 0 ? (
          locationLines.map((line, index) => (
            <div key={index}>{line}</div>
          ))
        ) : (
          <div>Wellington, NZ</div>
        )}
      </div>
      
      {/* Write-on Box */}
      <div style={{
        position: 'absolute',
        width: '174px', // 674.43px scaled down
        height: '19px', // 74.59px scaled down 
        backgroundColor: '#f0f0f0',
        left: '10px',
        top: '70px',
        borderRadius: '3px',
      }}></div>
      
      {/* Black Label */}
      <div style={{
        position: 'absolute',
        top: '70px',
        left: '10px',
        width: '53px', // 204.12px scaled down
        height: '9px', // 34px scaled down
        backgroundColor: '#000',
        color: '#fff',
        fontSize: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Bebas Neue', sans-serif",
      }}>
        SERVICE
      </div>
    </div>
  );
};

export default Layout2Design;
