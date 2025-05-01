
import React, { useRef, useEffect } from 'react';
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
const BLEED = 8.5; // ~3mm at 72 DPI (changed from 4mm to 3mm)

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
  
  const svgRef = useRef<HTMLImageElement>(null);
  
  // Effect to modify SVG colors when it loads or when colors change
  useEffect(() => {
    if (type === 'facingIn' && svgRef.current) {
      const img = svgRef.current;
      
      // When the SVG is loaded, add it to a hidden iframe to modify its content
      img.onload = () => {
        try {
          // Create a helper function to fetch and modify the SVG
          const updateSvgColors = async () => {
            const response = await fetch(img.src);
            const svgText = await response.text();
            
            // Create a DOM parser
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            
            // Find background elements (assuming they're white)
            const backgroundElements = svgDoc.querySelectorAll('[fill="#FFFFFF"], [fill="#ffffff"], [fill="white"]');
            backgroundElements.forEach(element => {
              element.setAttribute('fill', backgroundColor);
            });
            
            // Find accent elements (assuming they're orange)
            const accentElements = svgDoc.querySelectorAll('[fill="#F97316"], [fill="#f97316"], [fill="#FF7A00"], [fill="#ff7a00"]');
            accentElements.forEach(element => {
              element.setAttribute('fill', accentColor);
            });
            
            // Convert the modified SVG back to text
            const serializer = new XMLSerializer();
            const modifiedSvgText = serializer.serializeToString(svgDoc);
            
            // Create a blob URL for the modified SVG
            const blob = new Blob([modifiedSvgText], {type: 'image/svg+xml'});
            const url = URL.createObjectURL(blob);
            
            // Update the image source
            img.src = url;
            
            // Clean up the blob URL when the image is loaded
            img.onload = () => {
              URL.revokeObjectURL(url);
            };
          };
          
          updateSvgColors();
        } catch (error) {
          console.error('Error modifying SVG:', error);
        }
      };
    }
  }, [backgroundColor, accentColor, type]);

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
      <div className="w-full h-full relative">
        {/* SVG background - positioned at the back */}
        <img 
          ref={svgRef}
          src={svgUrl} 
          alt="Service Label Template" 
          className="w-full h-full object-contain absolute top-0 left-0 z-0"
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
        
        {/* Logo and text overlay - positioned in front */}
        <div className="absolute top-0 left-0 w-full h-full z-10">
          {/* Logo placement */}
          {logoUrl && (
            <div className="absolute top-2 left-2 w-16 h-9">
              <img 
                src={logoUrl} 
                alt="Business logo" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
          
          {/* Contact info placement */}
          <div 
            className="absolute top-2 right-2 text-right" 
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
          {/* Bleed indicator - now 3mm instead of 4mm */}
          <div className="absolute inset-0 border border-dashed border-red-400 m-[8.5px] pointer-events-none z-20" />
          
          {/* Actual label content */}
          <div 
            className="absolute inset-0 m-[8.5px]"
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
          Label size: 68x45mm (with 3mm bleed)
        </div>
      </CardContent>
    </Card>
  );
};

export default LabelPreview;
