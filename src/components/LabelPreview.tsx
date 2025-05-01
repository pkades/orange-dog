
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from './LayoutSelector';

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

// Label size constants (60x40mm converted to pixels at 72 DPI)
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
      className="w-full h-full flex items-center justify-center relative"
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
    </div>
  );

  const renderLayout1 = () => (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor }}>
      {/* Top section with logo and contact info */}
      <div className="flex w-full">
        {/* Logo area */}
        <div className="w-1/2 p-2 flex items-center justify-center" style={{ backgroundColor: accentColor }}>
          {logoUrl && <img src={logoUrl} alt="Logo" className="max-w-full max-h-[50px] object-contain" />}
          {!logoUrl && <div className="text-white text-2xl font-bold">LOGO</div>}
        </div>
        
        {/* Contact info */}
        <div className="w-1/2 p-2 flex flex-col justify-between">
          <div 
            className="text-right font-bold" 
            style={{ 
              fontFamily: phoneFont || fontFamily, 
              fontSize: phoneFontSize, 
              fontWeight: phoneFontWeight || fontWeight
            }}
          >
            {phoneNumber || 'XX XXX XXXX'}
          </div>
          <div 
            className="text-right" 
            style={{ 
              fontFamily: locationFont || fontFamily, 
              fontSize: locationFontSize, 
              fontWeight: locationFontWeight || fontWeight
            }}
          >
            {location || 'STREET\nCITY TOWN'}
          </div>
        </div>
      </div>
      
      {/* Service section */}
      <div className="flex-grow p-2">
        {/* Service next due section */}
        <div className="bg-gray-200 rounded-full mb-2 flex items-center">
          <div className="rounded-full p-1 flex items-center" style={{ backgroundColor: accentColor }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 7h-1V4H6v3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" stroke="white" strokeWidth="2" />
              <path d="M9 14v-5h3m0 0h-3m3 0 3 5" stroke="white" strokeWidth="2" />
            </svg>
            <span className="ml-1 text-white text-xs font-bold">SERVICE NEXT DUE:</span>
          </div>
          <div className="flex-grow flex justify-end items-center pr-4">
            <span className="font-mono">/</span>
            <span className="w-6"></span>
            <span className="font-mono">/</span>
          </div>
        </div>
        
        {/* OR AT km section */}
        <div className="bg-gray-200 rounded-full flex items-center">
          <div className="px-2 py-1 font-bold text-xs">
            OR AT:
          </div>
          <div className="flex-grow"></div>
          <div className="text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold" style={{ backgroundColor: accentColor }}>
            KM
          </div>
        </div>
      </div>
    </div>
  );

  const renderLayout2 = () => (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor }}>
      {/* Left side - logo and contact */}
      <div className="flex w-full h-full">
        <div className="w-1/2 flex flex-col">
          {/* Logo area */}
          <div className="flex-1 flex items-center justify-center p-1" style={{ backgroundColor: accentColor }}>
            {logoUrl && <img src={logoUrl} alt="Logo" className="max-w-full max-h-[70px] object-contain" />}
            {!logoUrl && <div className="text-white text-3xl font-bold">LOGO</div>}
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
              <div className="bg-white border border-gray-400 p-1 relative h-8">
                <div className="absolute -top-1 left-1 bg-gray-800 text-white px-1 text-[8px] font-bold">
                  DATE SERVICED
                </div>
                <div className="flex justify-end items-center h-full pr-2 text-xs">
                  <span className="font-mono">/</span>
                  <span className="w-4"></span>
                  <span className="font-mono">/</span>
                </div>
              </div>
              
              <div className="bg-white border border-gray-400 p-1 relative h-8">
                <div className="absolute -top-1 left-1 bg-gray-800 text-white px-1 text-[8px] font-bold">
                  NEXT DUE
                </div>
                <div className="absolute bottom-0 right-1 text-[6px]">
                  date / km
                </div>
              </div>
              
              <div className="bg-white border border-gray-400 p-1 relative h-8">
                <div className="absolute -top-1 left-1 bg-gray-800 text-white px-1 text-[8px] font-bold">
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
        <div className="w-1/2 flex flex-col p-1 space-y-1">
          {/* Logo area */}
          <div className="flex-grow flex items-center justify-center p-1" style={{ backgroundColor: accentColor }}>
            {logoUrl && <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />}
            {!logoUrl && <div className="text-white text-2xl font-bold">LOGO</div>}
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
        return renderLayout1();
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
          {/* Bleed indicator */}
          <div className="absolute inset-0 border border-dashed border-red-400 m-[11px] pointer-events-none z-10" />
          
          {/* Actual label content */}
          <div className="absolute inset-0 p-[11px]">
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
