
import React, { useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface LabelPreviewProps {
  logoUrl: string | null;
  phoneNumber: string;
  location: string;
  backgroundColor: string;
  accentColor: string;
  selectedLayout: { 
    id: string; 
    name: string; 
    image?: string;
    svgUrl: string; 
  } | null;
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

// Label size constants (68x45mm)
const LABEL_WIDTH = 193; // ~68mm at 72 DPI
const LABEL_HEIGHT = 128; // ~45mm at 72 DPI
const BLEED = 8.5; // ~3mm at 72 DPI

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
  // Debug selected layout information
  console.log("Selected layout:", selectedLayout);
  
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
            onError={(e) => {
              console.error(`Failed to load logo: ${logoUrl}`);
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
      {!logoUrl && (
        <div className="text-3xl font-bold">LOGO</div>
      )}
    </div>
  );

  const renderFacingIn = () => {
    if (!selectedLayout) {
      return <div className="w-full h-full flex items-center justify-center">No layout selected</div>;
    }

    const svgUrl = selectedLayout.svgUrl;
    
    return (
      <div className="w-full h-full relative">
        {/* SVG background - positioned at the back with z-index 0 */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src={svgUrl} 
            alt="Service Label Template" 
            className="w-full h-full object-fill"
            style={{ 
              backgroundColor: backgroundColor,
              filter: `drop-shadow(0 0 0 ${accentColor}) saturate(100%)` 
            }}
            onError={(e) => {
              console.error(`Failed to load SVG: ${svgUrl}`);
              e.currentTarget.style.display = 'none';
              // Show fallback message
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const fallback = document.createElement('div');
                fallback.textContent = "Template Failed to Load";
                fallback.className = "w-full h-full flex items-center justify-center text-red-500";
                parent.appendChild(fallback);
              }
            }}
          />
        </div>
        
        {/* Logo and text overlay - positioned in front with z-index 10 */}
        <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
          {/* Logo placement */}
          {logoUrl && (
            <div className="absolute top-3 left-3 w-16 h-9 pointer-events-auto">
              <img 
                src={logoUrl} 
                alt="Business logo" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
          
          {/* Contact info placement */}
          <div 
            className="absolute top-3 right-3 text-right pointer-events-auto" 
            style={{ 
              fontFamily: phoneFont || "'Bebas Neue', sans-serif",
            }}
          >
            <div style={{ 
              fontSize: phoneFontSize || '16px',
              fontWeight: phoneFontWeight || 'bold' 
            }}>
              {phoneNumber}
            </div>
            <div style={{ 
              fontFamily: locationFont || "'Bebas Neue', sans-serif",
              fontSize: locationFontSize || '12px',
              fontWeight: locationFontWeight || 'normal'
            }}>
              {location}
            </div>
          </div>
        </div>
      </div>
    );
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
          {/* Actual label content first (background) */}
          {type === 'facingOut' ? (
            <div 
              style={{ 
                width: `${LABEL_WIDTH + BLEED * 2}px`,
                height: `${LABEL_HEIGHT + BLEED * 2}px`,
                backgroundColor: type === 'facingOut' ? backgroundColor : 'transparent'
              }}
              className="absolute inset-0"
            >
              {renderFacingOut()}
            </div>
          ) : (
            <div className="absolute inset-0">
              {renderFacingIn()}
            </div>
          )}
          
          {/* Bleed indicator - 3mm */}
          <div 
            className="absolute pointer-events-none z-20" 
            style={{
              top: `${BLEED}px`,
              left: `${BLEED}px`,
              width: `${LABEL_WIDTH}px`,
              height: `${LABEL_HEIGHT}px`,
              border: '1px dashed red',
            }}
          />
        </div>
        
        <div className="p-2 bg-gray-50 text-xs text-gray-500 text-center border-t">
          Label size: 68x45mm (with 3mm bleed)
        </div>
      </CardContent>
    </Card>
  );
};

export default LabelPreview;
