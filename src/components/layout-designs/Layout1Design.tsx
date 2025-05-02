
import React from 'react';

interface Layout1DesignProps {
  logoUrl: string | null;
  phoneNumber: string;
  location: string;
  backgroundColor: string;
  accentColor: string;
  layoutId: string;
  layoutImage: string;
  layoutSvgUrl: string;
  logoSize: number; // Added logo size prop
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
  layoutSvgUrl,
  logoSize,
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

  // Layout Option 1 - Updated with new SVG
  const renderLayout1 = () => {
    const svgUrl = layoutSvgUrl || "https://raw.githubusercontent.com/pkades/orangedogv2/main/option%201%20svg.svg";
    
    return (
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}>
        {/* SVG Background */}
        <img 
          src={svgUrl}
          alt="Service Label Template"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundColor: backgroundColor,
            filter: `drop-shadow(0 0 0 ${accentColor}) saturate(100%)` 
          }}
        />
        
        {/* Logo */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          width: `${logoSize}px`,
          height: 'auto',
          maxHeight: '40px',
          zIndex: 10,
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
          zIndex: 10,
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
      </div>
    );
  };
  
  // Layout Option 2 - Updated with new SVG
  const renderLayout2 = () => {
    const svgUrl = layoutSvgUrl || "https://raw.githubusercontent.com/pkades/orangedogv2/main/option%202%20svg%20fix.svg";
    
    return (
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}>
        {/* SVG Background */}
        <img 
          src={svgUrl}
          alt="Service Label Template"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundColor: backgroundColor,
            filter: `drop-shadow(0 0 0 ${accentColor}) saturate(100%)` 
          }}
        />
        
        {/* Logo - centered in white left panel */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          transform: 'translate(-50%, -50%)',
          width: `${logoSize}px`,
          maxWidth: '80px',
          height: 'auto',
          maxHeight: '50px',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
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
        
        {/* Contact Info - centered at bottom of white panel */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '25%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          fontFamily: phoneFont || "'Bebas Neue', sans-serif",
          fontSize: phoneFontSize || '16px',
          fontWeight: phoneFontWeight || 'bold',
          lineHeight: '1.2',
          zIndex: 10,
          width: '40%',
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
      </div>
    );
  };
  
  // Layout Option 3 - Updated with new SVG
  const renderLayout3 = () => {
    const svgUrl = layoutSvgUrl || "https://raw.githubusercontent.com/pkades/orangedogv2/main/option%203%20svg.svg";
    
    return (
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}>
        {/* SVG Background */}
        <img 
          src={svgUrl}
          alt="Service Label Template"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundColor: backgroundColor,
            filter: `drop-shadow(0 0 0 ${accentColor}) saturate(100%)` 
          }}
        />
        
        {/* Logo */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          width: `${logoSize}px`,
          height: 'auto',
          maxHeight: '40px',
          zIndex: 10,
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
          zIndex: 10,
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
      </div>
    );
  };

  return renderLayout();
};

export default Layout1Design;
