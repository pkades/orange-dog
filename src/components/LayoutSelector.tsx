
import React, { useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

export interface Layout {
  id: string;
  name: string;
  image?: string;
  svgUrl: string;
}

interface LayoutSelectorProps {
  layouts: Layout[];
  selectedLayoutId: string;
  onLayoutChange: (layoutId: string) => void;
  backgroundColor: string;
  accentColor: string;
  hideTextPlaceholders?: boolean; // Added new prop
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({
  layouts,
  selectedLayoutId,
  onLayoutChange,
  backgroundColor,
  accentColor,
  hideTextPlaceholders = false, // Default to false to maintain backward compatibility
}) => {
  // Debug layouts on component mount
  useEffect(() => {
    console.log("Available layouts:", layouts);
  }, [layouts]);

  // Render the layout preview based on layout ID
  const renderLayoutPreview = (layout: Layout) => {
    return (
      <div className="w-full h-32 bg-white border border-gray-200 relative overflow-hidden">
        {/* SVG Background */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={layout.svgUrl}
            alt={`${layout.name} Preview`} 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              backgroundColor: layout.id === selectedLayoutId ? backgroundColor : undefined,
              filter: layout.id === selectedLayoutId ? 
                `drop-shadow(0 0 0 ${accentColor}) saturate(100%)` : undefined 
            }}
            onError={(e) => {
              console.error(`Failed to load SVG: ${layout.svgUrl}`);
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        
        {/* Demo logo for preview */}
        <div className="absolute top-2 left-2 w-10 h-6 bg-gray-300 flex items-center justify-center z-10">
          <span className="text-[8px]">LOGO</span>
        </div>
        
        {/* Demo elements for preview only - conditionally rendered based on hideTextPlaceholders */}
        {!hideTextPlaceholders && (
          <div className="absolute top-2 right-2 text-right text-xs z-10">
            <div className="font-bold">PHONE</div>
            <div>LOCATION</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-medium text-lg">Select Label Layout</h3>
      
      <RadioGroup
        value={selectedLayoutId}
        onValueChange={onLayoutChange}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {layouts.map((layout) => (
          <div key={layout.id} className="flex items-start space-x-2">
            <RadioGroupItem value={layout.id} id={`layout-${layout.id}`} className="mt-1" />
            <Label htmlFor={`layout-${layout.id}`} className="w-full cursor-pointer">
              <Card className={`overflow-hidden transition-all ${selectedLayoutId === layout.id ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className="p-2">
                  {renderLayoutPreview(layout)}
                  <p className="text-center text-sm mt-2">{layout.name}</p>
                </CardContent>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default LayoutSelector;
