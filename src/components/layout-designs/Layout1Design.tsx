
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
    <div className="w-full h-full flex" style={{ fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      {/* Left side - Logo and contact info */}
      <div 
        className="w-1/2 flex flex-col items-center p-2" 
        style={{ backgroundColor }}
      >
        {/* Logo area */}
        <div className="w-full h-[20mm] flex items-center justify-center mb-2">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
          ) : (
            <div className="text-2xl font-bold">LOGO</div>
          )}
        </div>
        
        {/* Contact info */}
        <div className="mt-2 flex flex-col items-center">
          <div 
            className="text-center font-bold"
            style={{ 
              fontFamily: phoneFont, 
              fontSize: phoneFontSize, 
              fontWeight: phoneFontWeight
            }}
          >
            {phoneNumber ? `PH ${phoneNumber}` : 'PH 12 345 6789'}
          </div>
          <div 
            className="text-center"
            style={{ 
              fontFamily: locationFont,
              fontSize: locationFontSize, 
              fontWeight: locationFontWeight
            }}
          >
            {locationLines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right side - Service boxes */}
      <div className="w-1/2 bg-gray-400 flex flex-col p-2 justify-between">
        {/* DATE SERVICED box */}
        <div className="relative">
          <div 
            className="bg-white" 
            style={{ width: '25.4mm', height: '10.8mm' }}
          >
            <div 
              className="absolute bg-gray-900 text-white flex items-center justify-center"
              style={{ 
                width: '19.6mm', 
                height: '3.6mm', 
                fontSize: '2.2mm',
                fontWeight: 'bold',
                top: '-2mm',
                left: 0
              }}
            >
              DATE SERVICED
            </div>
            <div className="flex justify-center items-center h-full text-sm">
              <span>/</span>
              <span className="w-6"></span>
              <span>/</span>
            </div>
          </div>
        </div>
        
        {/* NEXT DUE box */}
        <div className="relative">
          <div 
            className="bg-white" 
            style={{ width: '25.4mm', height: '10.8mm' }}
          >
            <div 
              className="absolute bg-gray-900 text-white flex items-center justify-center"
              style={{ 
                width: '19.6mm', 
                height: '3.6mm', 
                fontSize: '2.2mm',
                fontWeight: 'bold',
                top: '-2mm',
                left: 0
              }}
            >
              NEXT DUE
            </div>
            <div className="flex justify-center items-center h-full text-sm">
              date / km
            </div>
          </div>
        </div>
        
        {/* OIL TYPE box */}
        <div className="relative">
          <div 
            className="bg-white" 
            style={{ width: '25.4mm', height: '10.8mm' }}
          >
            <div 
              className="absolute bg-gray-900 text-white flex items-center justify-center"
              style={{ 
                width: '19.6mm', 
                height: '3.6mm', 
                fontSize: '2.2mm',
                fontWeight: 'bold',
                top: '-2mm',
                left: 0
              }}
            >
              OIL TYPE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout1Design;
