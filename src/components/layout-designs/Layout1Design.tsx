
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
  phoneFont,
  locationFont,
  phoneFontSize,
  locationFontSize,
  phoneFontWeight,
  locationFontWeight,
}) => {
  // Convert mm to pixels (at 72dpi)
  // 1mm ≈ 2.83 pixels
  const mmToPx = (mm: number) => Math.round(mm * 2.83);

  // Dimensions from the specification
  const whiteBoxHeight = mmToPx(10.8);
  const whiteBoxWidth = mmToPx(25.4);
  const blackLabelHeight = mmToPx(3.6);
  const blackLabelWidth = mmToPx(19.6);
  const textHeight = mmToPx(2.2);

  return (
    <div className="w-full h-full flex" style={{ backgroundColor }}>
      {/* Left side - Logo and contact info */}
      <div className="w-1/2 flex flex-col p-2">
        {/* Logo area - no background color */}
        <div className="flex-1 flex items-center justify-center">
          {logoUrl && <img src={logoUrl} alt="Logo" className="max-w-full max-h-[80px] object-contain" />}
          {!logoUrl && <div className="text-5xl font-bold text-gray-400">LOGO</div>}
        </div>
        
        {/* Contact info */}
        <div className="mt-2">
          <div 
            className="text-left font-bold"
            style={{ 
              fontFamily: phoneFont, 
              fontSize: phoneFontSize, 
              fontWeight: phoneFontWeight
            }}
          >
            {phoneNumber ? `PH ${phoneNumber}` : 'PH 12 345 6789'}
          </div>
          <div 
            className="text-left whitespace-pre-line"
            style={{ 
              fontFamily: locationFont,
              fontSize: locationFontSize, 
              fontWeight: locationFontWeight
            }}
          >
            {location || '123 STREET\nCITY'}
          </div>
        </div>
      </div>
      
      {/* Right side - Service boxes */}
      <div className="w-1/2 bg-gray-400 flex flex-col p-3 justify-center space-y-3">
        {/* Date serviced box */}
        <div className="relative">
          <div 
            className="bg-white rounded border border-gray-300" 
            style={{ height: `${whiteBoxHeight}px`, width: `${whiteBoxWidth}px` }}
          >
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-2 rounded"
              style={{ height: `${blackLabelHeight}px`, width: `${blackLabelWidth}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span style={{ fontSize: `${textHeight}px` }} className="font-bold">DATE SERVICED</span>
            </div>
            <div className="flex justify-center items-center h-full">
              <span className="font-mono text-lg">/</span>
              <span className="w-6"></span>
              <span className="font-mono text-lg">/</span>
            </div>
          </div>
        </div>
        
        {/* Next due box */}
        <div className="relative">
          <div 
            className="bg-white rounded border border-gray-300" 
            style={{ height: `${whiteBoxHeight}px`, width: `${whiteBoxWidth}px` }}
          >
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-2 rounded"
              style={{ height: `${blackLabelHeight}px`, width: `${blackLabelWidth}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span style={{ fontSize: `${textHeight}px` }} className="font-bold">NEXT DUE</span>
            </div>
            <div className="flex justify-end items-end h-full p-1">
              <span className="text-xs">date / km</span>
            </div>
          </div>
        </div>
        
        {/* Oil type box */}
        <div className="relative">
          <div 
            className="bg-white rounded border border-gray-300" 
            style={{ height: `${whiteBoxHeight}px`, width: `${whiteBoxWidth}px` }}
          >
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-2 rounded"
              style={{ height: `${blackLabelHeight}px`, width: `${blackLabelWidth}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span style={{ fontSize: `${textHeight}px` }} className="font-bold">OIL TYPE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout1Design;
