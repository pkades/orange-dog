
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
    <div className="w-full h-full flex flex-col">
      <div className="flex w-full" style={{ backgroundColor }}>
        {/* Logo area */}
        <div className="w-1/2 p-2 flex items-center justify-center" style={{ backgroundColor: '#9e9e9e' }}>
          {logoUrl && <img src={logoUrl} alt="Logo" className="max-w-full max-h-[80px] object-contain" />}
          {!logoUrl && <div className="text-white text-xl font-bold">LOGO</div>}
        </div>
        
        {/* Contact area */}
        <div className="w-1/2 p-2 flex flex-col items-end justify-center" style={{ backgroundColor: '#e0e0e0' }}>
          <div className="text-right font-bold">{phoneNumber || 'XX XXX XXXX'}</div>
          <div className="text-right">{location || 'CITY TOWN'}</div>
        </div>
      </div>
      
      {/* Service rows */}
      <div className="flex flex-col gap-1 p-1 flex-grow">
        {[
          { label: 'DATE SERVICED', dark: true },
          { label: 'NEXT SERVICE', dark: true },
          { label: 'OR AT (KM)', dark: true }
        ].map((row, i) => (
          <div key={i} className="flex h-[25px] rounded overflow-hidden">
            <div 
              className="w-1/3 flex items-center justify-center text-xs text-white font-bold"
              style={{ backgroundColor: '#333333' }}
            >
              {row.label}
            </div>
            <div className="w-2/3 bg-white border border-gray-200"></div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLayout2 = () => (
    <div className="w-full h-full flex flex-col">
      <div className="flex w-full" style={{ backgroundColor }}>
        {/* Logo area */}
        <div className="w-1/2 p-2 flex items-center justify-center" style={{ backgroundColor: '#9e9e9e' }}>
          {logoUrl && <img src={logoUrl} alt="Logo" className="max-w-full max-h-[80px] object-contain" />}
          {!logoUrl && <div className="text-white text-xl font-bold">LOGO</div>}
        </div>
        
        {/* Contact info */}
        <div className="w-1/2 p-2 flex flex-col items-center justify-center bg-gray-300">
          <div className="text-black text-sm font-bold mb-1">
            {phoneNumber ? `PH ${phoneNumber}` : 'PH 12 345 6789'}
          </div>
          <div className="text-black text-sm text-center">
            {location ? location : '123 STREET\nCITY'}
          </div>
        </div>
      </div>
      
      {/* Service panels */}
      <div className="flex-grow bg-gray-500 p-1 flex flex-col gap-1">
        {['DATE SERVICED', 'NEXT DUE', 'OIL TYPE'].map((label, i) => (
          <div key={i} className="relative bg-white rounded h-[22px] overflow-hidden">
            <div
              className="absolute top-0 left-0 px-2 py-0.5 text-xs text-white font-bold"
              style={{ backgroundColor: '#333' }}
            >
              {label}
            </div>
            {label === 'NEXT DUE' && (
              <div className="absolute bottom-1 right-2 text-xs">
                date / km
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderLayout3 = () => (
    <div className="w-full h-full flex flex-col">
      {/* Logo and contact area */}
      <div className="w-full flex">
        {/* Logo area */}
        <div className="w-1/2 p-2 flex items-center justify-center" style={{ backgroundColor: '#9e9e9e' }}>
          {logoUrl && <img src={logoUrl} alt="Logo" className="max-w-full max-h-[80px] object-contain" />}
          {!logoUrl && <div className="text-white text-xl font-bold">LOGO</div>}
        </div>
        
        {/* Right panel with date fields */}
        <div className="w-1/2 p-2 flex flex-col items-center justify-center" style={{ backgroundColor: '#e0e0e0' }}>
          <div className="text-right mb-1">
            <div className="font-bold text-base">{phoneNumber || 'XX XXX XXXX'}</div>
            <div className="text-sm">{location || 'STREET\nCITY TOWN'}</div>
          </div>
        </div>
      </div>
      
      {/* Service section */}
      <div className="flex-grow bg-gray-200 p-2">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="rounded-full p-1.5"
            style={{ backgroundColor: accentColor || '#f97316' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" stroke="white" strokeWidth="2" />
              <polyline points="9 22 9 12 15 12 15 22" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <div className="font-bold">
            SERVICE<br />NEXT DUE:
          </div>
          <div className="flex-grow" />
          <div className="text-xl">/</div>
          <div className="text-xl">/</div>
        </div>
        
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
          <div className="font-bold mr-2">OR AT:</div>
          <div className="flex-grow" />
          <div 
            className="rounded-full flex items-center justify-center w-8 h-8 text-white font-bold"
            style={{ backgroundColor: accentColor || '#f97316' }}
          >
            KM
          </div>
        </div>
      </div>
    </div>
  );

  const renderFacingIn = () => {
    if (!selectedLayout) return <div>Please select a layout</div>;
    
    switch (selectedLayout.id) {
      case 'layout1':
        return renderLayout1();
      case 'layout2':
        return renderLayout2();
      case 'layout3':
        return renderLayout3();
      default:
        return <div>Invalid layout selected</div>;
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
          <div className="absolute inset-0 border border-dashed border-red-400 m-[4px] pointer-events-none z-10" />
          
          {/* Actual label content */}
          <div className="absolute inset-0">
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
