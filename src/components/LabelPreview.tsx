
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface LabelPreviewProps {
  logoUrl: string | null;
  phoneNumber: string;
  location: string;
  backgroundColor: string;
  accentColor: string;
  selectedLayout: { id: string; name: string; image?: string; } | null;
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
    const svgUrl = "https://raw.githubusercontent.com/pkades/orangedog/main/service%20label%20option%201%20test.svg";
    
    return (
      <div className="w-full h-full">
        <img 
          src={svgUrl} 
          alt="Service Label Template" 
          className="w-full h-full object-contain"
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
          Label size: 68x45mm (with 4mm bleed)
        </div>
      </CardContent>
    </Card>
  );
};

export default LabelPreview;
