
import React from 'react';

interface Layout1DesignProps {
  logoUrl: string | null;
  phoneNumber: string;
  location: string;
  backgroundColor: string;
  accentColor: string;
  layoutId: string;
  layoutImage: string;
  phoneFont: string;
  locationFont: string;
  phoneFontSize: string;
  locationFontSize: string;
  phoneFontWeight: string;
  locationFontWeight: string;
}

const Layout1Design: React.FC<Layout1DesignProps> = ({
  logoUrl,
  phoneNumber,
  location,
  backgroundColor,
  accentColor,
  layoutId,
  phoneFont,
  locationFont,
  phoneFontSize,
  locationFontSize,
  phoneFontWeight,
  locationFontWeight,
}) => {
  // Split location into lines if it contains newlines
  const locationLines = location ? location.split('\n') : [];
  
  const renderLayout = () => {
    // Determine which layout to render based on layoutId
    switch(layoutId) {
      case 'layout1':
        return renderLayout1();
      case 'layout2':
        return renderLayout2();
      case 'layout3':
        return renderLayout3();
      default:
        return renderLayout1();
    }
  };

  // Layout Option 1 - Orange accent with circle icon
  const renderLayout1 = () => {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        overflow: 'hidden',
        fontFamily: "'Bebas Neue', sans-serif",
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
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
            />
          ) : (
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>LOGO</div>
          )}
        </div>
        
        {/* Contact Info */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          textAlign: 'right',
          fontFamily: phoneFont || "'Bebas Neue', sans-serif",
          fontSize: phoneFontSize || '16px',
          fontWeight: phoneFontWeight || 'bold',
          lineHeight: '1.2',
        }}>
          <div>{phoneNumber || ''}</div>
          {locationLines.map((line, index) => (
            <div 
              key={index} 
              style={{ 
                fontFamily: locationFont || "'Bebas Neue', sans-serif",
                fontSize: locationFontSize || '14px',
                fontWeight: locationFontWeight || 'normal',
              }}
            >
              {line}
            </div>
          ))}
        </div>
        
        {/* Grey Background Box */}
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '10px',
          right: '10px',
          height: '30px',
          backgroundColor: '#e6e6e6',
          borderRadius: '15px',
        }}></div>
        
        {/* Accent Circle */}
        <div style={{
          position: 'absolute',
          top: '59px',
          left: '12px',
          width: '25px',
          height: '25px',
          backgroundColor: accentColor || '#f58220',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
        }}>
          🔧
        </div>
        
        {/* Service Text */}
        <div style={{
          position: 'absolute',
          top: '63px',
          left: '45px',
          fontSize: '16px',
          color: '#000',
        }}>
          SERVICE<br/>NEXT DUE:
        </div>
        
        {/* Date Slashes */}
        <div style={{
          position: 'absolute',
          top: '80px',
          left: '45px',
          fontSize: '16px',
          letterSpacing: '10px',
          color: '#000',
        }}>
          /&nbsp;/
        </div>
      </div>
    );
  };
  
  // Layout Option 2 - Black label with write-on area
  const renderLayout2 = () => {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        overflow: 'hidden',
        fontFamily: "'Bebas Neue', sans-serif",
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
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
            />
          ) : (
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>LOGO</div>
          )}
        </div>
        
        {/* Contact Info */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          textAlign: 'right',
          fontFamily: phoneFont || "'Bebas Neue', sans-serif",
          fontSize: phoneFontSize || '16px',
          fontWeight: phoneFontWeight || 'bold',
          lineHeight: '1.2',
        }}>
          <div>{phoneNumber || ''}</div>
          {locationLines.map((line, index) => (
            <div 
              key={index} 
              style={{ 
                fontFamily: locationFont || "'Bebas Neue', sans-serif",
                fontSize: locationFontSize || '14px',
                fontWeight: locationFontWeight || 'normal',
              }}
            >
              {line}
            </div>
          ))}
        </div>
        
        {/* Write-on Box */}
        <div style={{
          position: 'absolute',
          width: 'calc(100% - 20px)',
          height: '25px',
          backgroundColor: '#f0f0f0',
          left: '10px',
          top: '60px',
          borderRadius: '5px',
        }}></div>
        
        {/* Black Label */}
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '10px',
          width: '70px',
          height: '12px',
          backgroundColor: '#000',
          color: '#fff',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          SERVICE
        </div>
      </div>
    );
  };
  
  // Layout Option 3 - Split design with accent area
  const renderLayout3 = () => {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        overflow: 'hidden',
        fontFamily: "'Bebas Neue', sans-serif",
        display: 'flex',
        flexDirection: 'row',
      }}>
        {/* Left Accent Panel */}
        <div style={{
          width: '40%',
          height: '100%',
          backgroundColor: backgroundColor || '#dcdcdc',
          padding: '10px',
          boxSizing: 'border-box',
          color: '#000',
        }}>
          {/* Logo */}
          <div style={{
            width: '100%',
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
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>LOGO</div>
            )}
          </div>
          
          {/* Contact Info */}
          <div style={{
            fontFamily: phoneFont || "'Bebas Neue', sans-serif",
            fontSize: phoneFontSize || '14px',
            fontWeight: phoneFontWeight || 'bold',
            textAlign: 'left',
          }}>
            <div>{phoneNumber || ''}</div>
            {locationLines.map((line, index) => (
              <div 
                key={index} 
                style={{ 
                  fontFamily: locationFont || "'Bebas Neue', sans-serif",
                  fontSize: locationFontSize || '12px',
                  fontWeight: locationFontWeight || 'normal',
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Fields */}
        <div style={{
          flex: 1,
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '15px',
        }}>
          {/* Date Field */}
          <div>
            <div style={{
              width: '80px',
              height: '15px',
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Arial Narrow, sans-serif',
            }}>
              DATE
            </div>
            <div style={{
              width: '100%',
              height: '25px',
              border: '1px solid #000',
            }}></div>
          </div>
          
          {/* KM Field */}
          <div>
            <div style={{
              width: '80px',
              height: '15px',
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Arial Narrow, sans-serif',
            }}>
              KM
            </div>
            <div style={{
              width: '100%',
              height: '25px',
              border: '1px solid #000',
            }}></div>
          </div>
        </div>
      </div>
    );
  };

  return renderLayout();
};

export default Layout1Design;
