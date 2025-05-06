
import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Card, CardContent } from "@/components/ui/card";

// Define the inline SVG string for layout 1
const LAYOUT1_SVG = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Creator: CorelDRAW 2019 (64-Bit) -->
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="68mm" height="45mm" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
viewBox="0 0 7433.34 4919.12"
 xmlns:xlink="http://www.w3.org/1999/xlink"
 xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
 <defs>
  <style type="text/css">
   <![CDATA[
    .str0 {stroke:#373435;stroke-width:28.92;stroke-miterlimit:22.9256}
    .fil0 {fill:#FEFEFE}
    .fil2 {fill:#F58634}
    .fil3 {fill:#FEFEFE;fill-rule:nonzero}
    .fil1 {fill:#373435;fill-rule:nonzero}
   ]]>
  </style>
 </defs>
 <g id="Layer_x0020_1">
  <metadata id="CorelCorpID_0Corel-Layer"/>
  <rect class="fil0" x="0" y="-0" width="7433.34" height="4919.12" rx="344.56" ry="437.26"/>
  <path class="fil1" d="M446.88 0l6539.59 0c122.9,0 234.63,50.21 315.61,131.07 80.99,80.86 131.26,192.41 131.26,315.14l0 4026.71c0,122.73 -50.27,234.28 -131.26,315.14 -80.98,80.86 -192.71,131.07 -315.61,131.07l-6539.59 0c-122.9,0 -234.63,-50.21 -315.61,-131.07 -80.99,-80.86 -131.26,-192.41 -131.26,-315.14l0 -4026.71c0,-122.73 50.27,-234.28 131.26,-315.14 80.98,-80.86 192.71,-131.07 315.61,-131.07zm6539.59 21.76l-6539.59 0c-116.89,0 -223.16,47.77 -300.2,124.68 -77.04,76.92 -124.88,183.05 -124.88,299.76l0 4026.71c0,116.71 47.84,222.84 124.88,299.76 77.03,76.91 183.31,124.68 300.2,124.68l6539.59 0c116.89,0 223.16,-47.77 300.2,-124.68 77.04,-76.92 124.88,-183.05 124.88,-299.76l0 -4026.71c0,-116.71 -47.84,-222.84 -124.88,-299.76 -77.03,-76.91 -183.31,-124.68 -300.2,-124.68z"/>
  <g id="_3025737991952">
   <path class="fil0 str0" d="M622.01 2734.03l6189.34 0c86.59,0 157.42,70.84 157.42,157.43l0 792.86c0,86.58 -70.84,157.41 -157.42,157.41l-6189.34 0c-86.59,0 -157.42,-70.84 -157.42,-157.41l0 -792.86c0,-86.6 70.84,-157.43 157.42,-157.43z"/>
   <path class="fil1" d="M6630.59 3722.14l-33.02 0 0 -247.06 33.02 0 0 247.06zm76.05 0l-33.03 0 -41.29 -120.78 0 -2.07 34.41 -124.21 30.28 0 -34.76 122.84 44.39 124.22zm86.03 -101.85l30.62 -145.21 36.48 0 0 247.06 -33.03 0 3.44 -161.73 -24.78 117 -25.46 0 -24.77 -117 3.43 161.73 -33.02 0 0 -247.06 36.47 0 30.63 145.21z"/>
   <path class="fil2" d="M2105.1 3827.28l0 -1078.79 -1483.09 0c-39.31,0 -75.05,16.09 -100.96,42 -25.92,25.89 -42,61.64 -42,100.97l0 792.86c0,39.3 16.09,75.04 42,100.95 25.91,25.91 61.66,42 100.96,42l1483.09 0z"/>
   <path class="fil3" d="M835.04 2987.21l0 -31.09c0,-14.15 -6.91,-21.22 -20.73,-21.22l-7.4 0c-13.49,0 -20.23,7.07 -20.23,21.22l0 58.72c0,6.58 1.31,11.02 3.95,13.33 2.63,2.31 6.91,5.26 12.83,8.89l44.91 24.18c9.87,5.59 16.87,9.95 20.98,13.07 4.11,3.13 7.31,6.91 9.62,11.35 2.31,4.45 3.45,12.92 3.45,25.42l0 75.5c0,39.81 -19.08,59.72 -57.25,59.72l-29.11 0c-37.83,0 -56.76,-21.71 -56.76,-65.14l0 -17.76 47.38 0 0 19.24c0,13.82 7.07,20.73 21.22,20.73l8.4 0c12.49,0 18.75,-6.91 18.75,-20.73l0 -60.2c0,-6.58 -1.31,-11.03 -3.95,-13.33 -2.63,-2.31 -6.91,-5.27 -12.83,-8.89l-44.91 -25.16c-9.87,-5.27 -17.02,-9.71 -21.47,-13.33 -4.44,-3.62 -7.64,-8.31 -9.62,-14.07 -1.98,-5.76 -2.96,-13.24 -2.96,-22.45l0 -72.54c0,-40.47 18.92,-60.7 56.76,-60.7l29.6 0c37.84,0 56.76,20.23 56.76,60.7l0 34.54 -47.38 0zm86.86 259.08l0 -354.33 117.45 0 0 42.94 -70.08 0 0 107.58 62.19 0 0 42.94 -62.19 0 0 117.94 70.08 0 0 42.94 -117.45 0zm151.51 -354.33l92.77 0c36.18,0 54.29,20.23 54.29,60.7l0 87.34c0,30.92 -9.38,50.5 -28.14,58.73l33.07 147.55 -44.91 0 -31.09 -143.11 -28.63 0 0 143.11 -47.37 0 0 -354.33zm47.37 170.75l31.1 0c14.15,0 21.22,-8.55 21.22,-25.66l0 -76.5c0,-17.11 -7.07,-25.66 -21.22,-25.66l-31.1 0 0 127.81zm292.66 -170.75l-57.25 354.33 -56.26 0 -57.25 -354.33 46.88 0 38.5 270.43 38.49 -270.43 46.88 0zm27.14 354.33l0 -354.33 47.37 0 0 354.33 -47.37 0zm233.42 -82.9l0 22.69c0,40.14 -18.91,60.21 -56.76,60.21l-30.6 0c-37.83,0 -56.74,-20.07 -56.74,-60.21l0 -233.91c0,-40.14 18.91,-60.21 56.74,-60.21l30.6 0c37.84,0 56.76,20.07 56.76,60.21l0 39.97 -47.38 0 0 -36.51c0,-13.82 -7.07,-20.73 -21.22,-20.73l-9.38 0c-12.49,0 -18.75,6.91 -18.75,20.73l0 227c0,13.82 6.25,20.73 18.75,20.73l11.85 0c12.49,0 18.75,-6.91 18.75,-20.73l0 -19.24 47.38 0zm37.01 82.9l0 -354.33 117.45 0 0 42.94 -70.08 0 0 107.58 62.19 0 0 42.94 -62.19 0 0 117.94 70.08 0 0 42.94 -117.45 0zm-966.76 437.49l0 -354.33 82.41 0c44.41,0 66.62,22.7 66.62,68.1l0 234.9c0,34.22 -18.91,51.32 -56.74,51.32l-92.28 0zm47.37 -42.94l35.54 0c12.51,0 18.75,-5.26 18.75,-15.78l0 -227.01c0,-17.11 -7.07,-25.66 -21.22,-25.66l-33.07 0 0 268.45zm297.59 -311.39l0 287.21c0,44.74 -19.09,67.12 -57.25,67.12l-39.98 0c-37.83,0 -56.74,-22.54 -56.74,-67.61l0 -286.72 47.37 0 0 288.21c0,15.46 6.91,23.19 20.74,23.19l19.24 0c12.83,0 19.25,-7.73 19.25,-23.19l0 -288.21 47.38 0zm44.41 354.33l0 -354.33 117.45 0 0 42.94 -70.08 0 0 107.58 62.19 0 0 42.94 -62.19 0 0 117.94 70.08 0 0 42.94 -117.45 0zm275.37 0l-47.38 0 0 -293.63c0,-40.47 18.91,-60.7 56.74,-60.7l35.54 0c37.83,0 56.76,20.23 56.76,60.7l0 293.63 -47.38 0 0 -129.79 -54.29 0 0 129.79zm54.29 -172.73l0 -117.94c0,-13.82 -6.91,-20.73 -20.73,-20.73l-12.83 0c-13.82,0 -20.73,6.91 -20.73,20.73l0 117.94 54.29 0zm164.82 -138.66l0 311.39 -47.38 0 0 -311.39 -45.41 0 0 -42.94 138.18 0 0 42.94 -45.4 0zm75.01 251.18l0 60.21 -50.34 0 0 -60.21 50.34 0zm0 -193.94l0 60.21 -50.34 0 0 -60.21 50.34 0z"/>
  </g>
 </g>
</svg>`;

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
  facingOutLogoSize: number;
  facingInLogoSize: number;
  logoPositionX: number;
  logoPositionY: number;
  phonePositionX: number;
  phonePositionY: number;
  locationPositionX: number;
  locationPositionY: number;
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

const LabelPreview = forwardRef<HTMLDivElement, LabelPreviewProps>(({
  logoUrl,
  phoneNumber,
  location,
  backgroundColor,
  accentColor,
  selectedLayout,
  type,
  facingOutLogoSize,
  facingInLogoSize,
  logoPositionX,
  logoPositionY,
  phonePositionX,
  phonePositionY,
  locationPositionX,
  locationPositionY,
  fontFamily,
  phoneFont,
  locationFont,
  phoneFontSize,
  locationFontSize,
  fontWeight,
  phoneFontWeight,
  locationFontWeight,
}, ref) => {
  // Debug selected layout information
  console.log("Selected layout:", selectedLayout);
  
  // Debug font information
  console.log("Phone font:", phoneFont);
  console.log("Location font:", locationFont);
  
  // Reference to the actual label content for exporting
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Expose the content ref via the forwarded ref
  useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);
  
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
            style={{ width: `${facingOutLogoSize}%` }}
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

    // For layout1, we'll use the inline SVG
    if (selectedLayout.id === 'layout1') {
      try {
        // Replace the colors in the SVG
        const svgWithColors = LAYOUT1_SVG
          .replace(/fill="#FEFEFE"/g, `fill="${backgroundColor}"`)
          .replace(/fill:#FEFEFE/g, `fill:${backgroundColor}`)
          .replace(/fill="#F58634"/g, `fill="${accentColor}"`)
          .replace(/fill:#F58634/g, `fill:${accentColor}`);
          
        // Create a blob URL to display the modified SVG
        const blob = new Blob([svgWithColors], { type: 'image/svg+xml' });
        const svgUrl = URL.createObjectURL(blob);
        
        // Clean up blob URL when component unmounts
        useEffect(() => {
          return () => {
            URL.revokeObjectURL(svgUrl);
          };
        }, [svgUrl]);
        
        return (
          <div className="w-full h-full relative">
            {/* SVG background using the inline SVG with dynamic colors */}
            <div className="absolute inset-0 w-full h-full z-0">
              <img 
                src={svgUrl}
                alt="Service Label Template" 
                className="w-full h-full object-fill"
                onError={(e) => {
                  console.error(`Failed to load SVG from blob URL`);
                  e.currentTarget.style.display = 'none';
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
                <div 
                  className="absolute pointer-events-auto"
                  style={{
                    width: `${facingInLogoSize}px`,
                    height: 'auto',
                    maxHeight: '50px',
                    top: `${logoPositionY}%`,
                    left: `${logoPositionX}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <img 
                    src={logoUrl} 
                    alt="Business logo" 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      console.error(`Failed to load logo`);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              {/* Phone number placement - with nowrap for the text */}
              <div 
                className="absolute pointer-events-auto"
                style={{
                  top: `${phonePositionY}%`,
                  left: `${phonePositionX}%`,
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  fontFamily: phoneFont || "'Bebas Neue', sans-serif",
                  whiteSpace: 'nowrap', // Prevents wrapping
                }}
              >
                <div style={{ 
                  fontSize: phoneFontSize || '16px',
                  fontWeight: phoneFontWeight || 'bold',
                  fontFamily: phoneFont || "'Bebas Neue', sans-serif",
                }}>
                  {phoneNumber}
                </div>
              </div>

              {/* Location info placement - with nowrap */}
              <div 
                className="absolute pointer-events-auto"
                style={{
                  top: `${locationPositionY}%`,
                  left: `${locationPositionX}%`,
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  fontFamily: locationFont || "'Bebas Neue', sans-serif",
                  whiteSpace: 'nowrap', // Prevents text wrapping
                }}
              >
                <div style={{ 
                  fontSize: locationFontSize || '12px',
                  fontWeight: locationFontWeight || 'normal',
                  fontFamily: locationFont || "'Bebas Neue', sans-serif",
                }}>
                  {location}
                </div>
              </div>
            </div>
          </div>
        );
      } catch (error) {
        console.error("Error rendering layout1:", error);
        return (
          <div className="w-full h-full flex items-center justify-center bg-red-50 text-red-500">
            Failed to load template
          </div>
        );
      }
    }
    
    // For other layouts, use the original SVG URL
    const svgUrl = selectedLayout.svgUrl;
    
    // Special layout adjustments for Option 2 (layout2)
    const isLayout2 = selectedLayout.id === 'layout2';
    
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
          {/* Logo placement - adjusted for layout2 and adding position controls */}
          {logoUrl && (
            <div 
              className="absolute pointer-events-auto"
              style={{
                width: `${facingInLogoSize}px`,
                height: isLayout2 ? 'auto' : '40px',
                maxHeight: isLayout2 ? '50px' : 'auto',
                top: `${logoPositionY}%`,
                left: `${logoPositionX}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <img 
                src={logoUrl} 
                alt="Business logo" 
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  console.error(`Failed to load logo`);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          
          {/* Phone number placement - with nowrap for the text */}
          <div 
            className="absolute pointer-events-auto"
            style={{
              top: `${phonePositionY}%`,
              left: `${phonePositionX}%`,
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              fontFamily: phoneFont || "'Bebas Neue', sans-serif",
              whiteSpace: 'nowrap', // Prevents wrapping
            }}
          >
            <div style={{ 
              fontSize: phoneFontSize || '16px',
              fontWeight: phoneFontWeight || 'bold',
              fontFamily: phoneFont || "'Bebas Neue', sans-serif",
            }}>
              {phoneNumber}
            </div>
          </div>

          {/* Location info placement - with nowrap */}
          <div 
            className="absolute pointer-events-auto"
            style={{
              top: `${locationPositionY}%`,
              left: `${locationPositionX}%`,
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              fontFamily: locationFont || "'Bebas Neue', sans-serif",
              whiteSpace: 'nowrap', // Prevents text wrapping
            }}
          >
            <div style={{ 
              fontSize: locationFontSize || '12px',
              fontWeight: locationFontWeight || 'normal',
              fontFamily: locationFont || "'Bebas Neue', sans-serif",
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
        <div className="p-3 bg-orangedog text-white border-b text-center">
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
          className="mx-auto my-4"
        >
          {/* Actual label content first */}
          <div 
            ref={contentRef}
            style={{ 
              width: `${LABEL_WIDTH + BLEED * 2}px`,
              height: `${LABEL_HEIGHT + BLEED * 2}px`,
              position: 'absolute',
              top: 0,
              left: 0
            }}
          >
            {type === 'facingOut' ? renderFacingOut() : renderFacingIn()}
          </div>
          
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
});

LabelPreview.displayName = 'LabelPreview';

export default LabelPreview;
