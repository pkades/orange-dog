
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
  layoutImage,
  phoneFont,
  locationFont,
  phoneFontSize,
  locationFontSize,
  phoneFontWeight,
  locationFontWeight,
}) => {
  // Split location into lines if it contains newlines
  const locationLines = location ? location.split('\n') : [];
  
  // Debug the image URL
  console.log("Layout1Design - layoutImage:", layoutImage);
  
  const renderContentBasedOnLayout = () => {
    // For layouts that use the uploaded image templates
    if (layoutImage) {
      // Background with layout image
      return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {/* Layout template image */}
          <img 
            src={layoutImage} 
            alt={`Layout ${layoutId}`} 
            style={{ 
              width: '100%', 
              height: '100%', 
              position: 'absolute',
              top: 0,
              left: 0,
              objectFit: 'cover'
            }}
            onError={(e) => {
              console.error(`Failed to load layout image: ${layoutImage}`);
              e.currentTarget.style.backgroundColor = "#f0f0f0";
              e.currentTarget.style.border = "1px dashed #ccc";
            }}
          />
          
          {/* Content overlay for the left side of the layout */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50%',
            height: '100%',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box'
          }}>
            {/* Logo area */}
            <div style={{
              width: '80%',
              height: '40%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px'
            }}>
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              ) : (
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>LOGO</div>
              )}
            </div>
            
            {/* Phone number */}
            <div style={{
              fontFamily: phoneFont,
              fontSize: phoneFontSize,
              fontWeight: phoneFontWeight,
              textAlign: 'center',
              width: '100%',
              marginBottom: '4px'
            }}>
              {phoneNumber ? phoneNumber : ''}
            </div>
            
            {/* Location */}
            <div style={{
              fontFamily: locationFont,
              fontSize: locationFontSize,
              fontWeight: locationFontWeight,
              textAlign: 'center',
              width: '100%'
            }}>
              {locationLines.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    // Fallback if no layout image is provided
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        fontFamily: 'sans-serif',
        boxSizing: 'border-box',
        backgroundColor
      }}>
        <div style={{
          width: '50%',
          padding: '2mm',
          boxSizing: 'border-box',
          textAlign: 'center',
          backgroundColor
        }}>
          <div style={{
            width: '100%',
            height: '20mm',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            ) : (
              <div style={{ fontSize: '6mm', fontWeight: 'bold' }}>LOGO</div>
            )}
          </div>
          <div style={{
            marginTop: '2mm',
            fontFamily: phoneFont,
            fontSize: phoneFontSize,
            fontWeight: phoneFontWeight
          }}>
            {phoneNumber || ''}
          </div>
          <div style={{
            fontFamily: locationFont,
            fontSize: locationFontSize,
            fontWeight: locationFontWeight
          }}>
            {locationLines.length > 0 ? 
              locationLines.map((line, index) => <div key={index}>{line}</div>) : 
              'Location'
            }
          </div>
        </div>
        <div style={{
          width: '50%',
          backgroundColor: '#999',
          padding: '2mm',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>Date Serviced</div>
          <div>Next Due</div>
          <div>Oil Type</div>
        </div>
      </div>
    );
  };

  return renderContentBasedOnLayout();
};

export default Layout1Design;
