
import React from 'react';

interface Layout1DesignProps {
  logoUrl: string | null;
  phoneNumber: string;
  location: string;
  backgroundColor: string;
  accentColor: string;
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
  phoneFont,
  locationFont,
  phoneFontSize,
  locationFontSize,
  phoneFontWeight,
  locationFontWeight,
}) => {
  // Split location into lines if it contains newlines
  const locationLines = location ? location.split('\n') : ['123 STREET', 'CITY'];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
      backgroundColor
    }}>
      {/* Left side (Logo + Address) */}
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
          {phoneNumber ? `PH ${phoneNumber}` : 'PH 12 345 6789'}
        </div>
        <div style={{
          fontFamily: locationFont,
          fontSize: locationFontSize,
          fontWeight: locationFontWeight
        }}>
          {locationLines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </div>

      {/* Right side (Fields) */}
      <div style={{
        width: '50%',
        backgroundColor: '#999',
        padding: '2mm',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* DATE SERVICED */}
        <div style={{
          background: '#fff',
          width: '25.4mm',
          height: '10.8mm',
          position: 'relative'
        }}>
          <div style={{
            background: '#222',
            color: '#fff',
            fontSize: '2.2mm',
            fontWeight: 'bold',
            height: '3.6mm',
            width: '19.6mm',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '-2mm',
            left: 0
          }}>
            DATE SERVICED
          </div>
          <div style={{
            marginTop: '4mm',
            textAlign: 'center',
            fontSize: '3mm'
          }}>
            / &nbsp; /
          </div>
        </div>

        {/* NEXT DUE */}
        <div style={{
          background: '#fff',
          width: '25.4mm',
          height: '10.8mm',
          position: 'relative'
        }}>
          <div style={{
            background: '#222',
            color: '#fff',
            fontSize: '2.2mm',
            fontWeight: 'bold',
            height: '3.6mm',
            width: '19.6mm',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '-2mm',
            left: 0
          }}>
            NEXT DUE
          </div>
          <div style={{
            marginTop: '4mm',
            textAlign: 'center',
            fontSize: '3mm'
          }}>
            date / km
          </div>
        </div>

        {/* OIL TYPE */}
        <div style={{
          background: '#fff',
          width: '25.4mm',
          height: '10.8mm',
          position: 'relative'
        }}>
          <div style={{
            background: '#222',
            color: '#fff',
            fontSize: '2.2mm',
            fontWeight: 'bold',
            height: '3.6mm',
            width: '19.6mm',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '-2mm',
            left: 0
          }}>
            OIL TYPE
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout1Design;
