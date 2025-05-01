
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Layout1Design from './layout-designs/Layout1Design';

interface LabelPreviewProps {
  logoUrl: string | null;
  phoneNumber: string;
  location: string;
  backgroundColor: string;
  accentColor: string;
  selectedLayout: { id: string; name: string; image: string; } | null;
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

  const renderFacingIn = () => (
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
          <div 
            className="absolute inset-0 m-[11px]"
            style={{ 
              width: `${LABEL_WIDTH}px`,
              height: `${LABEL_HEIGHT}px`,
              backgroundColor: type === 'facingOut' ? backgroundColor : 'transparent'
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
