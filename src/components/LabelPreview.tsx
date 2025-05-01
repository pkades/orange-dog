
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from './LayoutSelector';
import Layout1Design from './layout-designs/Layout1Design';

interface LabelPreviewProps {
  logoUrl: string | null;
  phoneNumber: string;
  location: string;
  backgroundColor: string;
  accentColor: string;
  selectedLayout: Layout | null;
  type: 'facingOut' | 'facingIn';
  fontFamily: string;
  phoneFont: string;
  locationFont: string;
  phoneFontSize: string;
  locationFontSize: string;
  fontWeight: string;
  phoneFontWeight: string;
  locationFontWeight: string;
}

// Label size constants (60x40mm)
const LABEL_WIDTH = 170; // ~60mm at 72 DPI
const LABEL_HEIGHT = 113; // ~40mm at 72 DPI
const BLEED = 11; // ~4mm at 72 DPI

const LabelPreview: React.FC<LabelPreviewProps> = ({
  logoUrl,
  phoneNumber,
  location,
  backgroundColor,
  accentColor,
  selectedLayout,
  type,
  fontFamily,
  phoneFont,
  locationFont,
  phoneFontSize,
  locationFontSize,
  fontWeight,
  phoneFontWeight,
  locationFontWeight,
}) => {
  const renderFacingOut = () => (
    <div 
      className="w-full h-full flex items-center justify-center"
      style={{ backgroundColor }}
    >
      {logoUrl && (
        <div className="w-3/4 h-3/4 flex items-center justify-center">
          <img 
            src={logoUrl} 
            alt="Business logo" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
      {!logoUrl && (
        <div className="text-3xl font-bold">LOGO</div>
      )}
    </div>
  );

  const renderLayout2 = () => (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor }}>
      {/* Left side - logo and contact */}
      <div className="flex w-full h-full">
        <div className="w-1/2 flex flex-col">
          {/* Logo area */}
          <div className="flex-1 flex items-center justify-center p-1" style={{ backgroundColor }}>
            {logoUrl && <img src={logoUrl} alt="Logo" className="max-w-full max-h-[70px] object-contain" />}
            {!logoUrl && <div className="text-3xl font-bold">LOGO</div>}
          </div>
        </div>
        
        {/* Right side - service panels */}
        <div className="w-1/2" style={{ backgroundColor: '#f3f3f3' }}>
          <div className="h-full flex flex-col p-2 justify-between">
            {/* Contact info at the top */}
            <div className="flex flex-col space-y-0">
              <div 
                className="font-bold text-sm"
                style={{ 
                  fontFamily: phoneFont || fontFamily, 
                  fontSize: phoneFontSize, 
                  fontWeight: phoneFontWeight || fontWeight
                }}
              >
                {phoneNumber ? `PH ${phoneNumber}` : 'PH 12 345 6789'}
              </div>
              <div 
                className="whitespace-pre-line text-xs"
                style={{ 
                  fontFamily: locationFont || fontFamily, 
                  fontSize: locationFontSize, 
                  fontWeight: locationFontWeight || fontWeight
                }}
              >
                {location || '123 STREET\nCITY'}
              </div>
            </div>
            
            {/* Service panels */}
            <div className="space-y-2 mt-1">
              {/* Date serviced box - updated dimensions */}
              <div className="bg-white border border-gray-400 p-1 relative h-8">
                <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-1 text-[8px] font-bold">
                  DATE SERVICED
                </div>
                <div className="flex justify-center items-center h-full text-xs">
                  <span className="font-mono">/</span>
                  <span className="w-4"></span>
                  <span className="font-mono">/</span>
                </div>
              </div>
              
              {/* Next due box - updated dimensions */}
              <div className="bg-white border border-gray-400 p-1 relative h-8">
                <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-1 text-[8px] font-bold">
                  NEXT DUE
                </div>
                <div className="absolute bottom-0 right-1 text-[6px]">
                  date / km
                </div>
              </div>
              
              {/* Oil type box - updated dimensions */}
              <div className="bg-white border border-gray-400 p-1 relative h-8">
                <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-1 text-[8px] font-bold">
                  OIL TYPE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLayout3 = () => (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor }}>
      <div className="flex h-full">
        {/* Left side - Logo and contact info */}
        <div className="w-1/2 flex flex-col p-2">
          {/* Logo area - removed accent box */}
          <div className="flex-grow flex items-center justify-center p-1">
            {logoUrl && <img src={logoUrl} alt="Logo" className="max-w-full max-h-[70px] object-contain" />}
            {!logoUrl && <div className="text-2xl font-bold">LOGO</div>}
          </div>
          
          {/* Contact info */}
          <div className="flex flex-col items-start">
            <div 
              className="font-bold text-sm"
              style={{ 
                fontFamily: phoneFont || fontFamily, 
                fontSize: phoneFontSize, 
                fontWeight: phoneFontWeight || fontWeight
              }}
            >
              {phoneNumber ? `PH ${phoneNumber}` : 'PH 12 345 6789'}
            </div>
            <div 
              className="whitespace-pre-line text-xs"
              style={{ 
                fontFamily: locationFont || fontFamily, 
                fontSize: locationFontSize, 
                fontWeight: locationFontWeight || fontWeight
              }}
            >
              {location || '123 STREET\nCITY'}
            </div>
          </div>
        </div>
        
        {/* Right side - Date boxes */}
        <div className="w-1/2 bg-gray-100 p-1 flex flex-col justify-center space-y-2">
          {/* Date serviced box */}
          <div className="bg-white border border-gray-400 p-1 relative">
            <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-1 text-[8px] font-bold">
              DATE SERVICED
            </div>
            <div className="h-6 flex justify-center items-center text-xs">
              <span className="font-mono">/</span>
              <span className="w-4"></span>
              <span className="font-mono">/</span>
            </div>
          </div>
          
          {/* Next due box */}
          <div className="bg-white border border-gray-400 p-1 relative">
            <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-1 text-[8px] font-bold">
              NEXT DUE
            </div>
            <div className="h-6"></div>
          </div>
          
          {/* Oil type box */}
          <div className="bg-white border border-gray-400 p-1 relative">
            <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-1 text-[8px] font-bold">
              OIL TYPE
            </div>
            <div className="h-6"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFacingIn = () => {
    if (!selectedLayout) return <div className="w-full h-full flex items-center justify-center">Please select a layout</div>;
    
    switch (selectedLayout.id) {
      case 'layout1':
        return (
          <Layout1Design
            logoUrl={logoUrl}
            phoneNumber={phoneNumber}
            location={location}
            backgroundColor={backgroundColor}
            accentColor={accentColor}
            phoneFont={phoneFont || fontFamily}
            locationFont={locationFont || fontFamily}
            phoneFontSize={phoneFontSize}
            locationFontSize={locationFontSize}
            phoneFontWeight={phoneFontWeight || fontWeight}
            locationFontWeight={locationFontWeight || fontWeight}
          />
        );
      case 'layout2':
        return renderLayout2();
      case 'layout3':
        return renderLayout3();
      default:
        return <div className="w-full h-full flex items-center justify-center">Invalid layout selected</div>;
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-3 bg-gray-100 border-b">
          <h3 className="font-bold text-lg">
            {type === 'facingOut' ? 'Facing Out' : 'Facing In'}
          </h3>
        </div>
        
        <div
          style={{
            width: `${LABEL_WIDTH + BLEED * 2}px`,
            height: `${LABEL_HEIGHT + BLEED * 2}px`,
            position: 'relative',
          }}
          className="mx-auto my-4 border border-gray-300"
        >
          {/* Background color for entire label area */}
          <div 
            className="absolute inset-0" 
            style={{ backgroundColor }} 
          />
          
          {/* Bleed indicator */}
          <div className="absolute inset-0 border border-dashed border-red-400 m-[11px] pointer-events-none z-10" />
          
          {/* Actual label content */}
          <div 
            className="absolute inset-0 p-[11px]"
            style={{ 
              width: `${LABEL_WIDTH}px`,
              height: `${LABEL_HEIGHT}px`,
              margin: `${BLEED}px`
            }}
          >
            {type === 'facingOut' ? renderFacingOut() : renderFacingIn()}
          </div>
        </div>
        
        <div className="p-2 bg-gray-50 text-xs text-gray-500 text-center border-t">
          Label size: 60x40mm (with 4mm bleed)
        </div>
      </CardContent>
    </Card>
  );
};

export default LabelPreview;
