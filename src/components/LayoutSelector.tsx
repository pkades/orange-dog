import React, { useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

export interface Layout {
  id: string;
  name: string;
  image?: string; // Optional now as we'll render previews directly
}

interface LayoutSelectorProps {
  layouts: Layout[];
  selectedLayoutId: string;
  onLayoutChange: (layoutId: string) => void;
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({
  layouts,
  selectedLayoutId,
  onLayoutChange,
}) => {
  // Debug layouts on component mount
  useEffect(() => {
    console.log("Available layouts:", layouts);
  }, [layouts]);

  // Render the layout preview based on layout ID
  const renderLayoutPreview = (layoutId: string) => {
    switch(layoutId) {
      case 'layout1':
        return (
          <div className="w-full h-32 bg-white border border-gray-200 relative overflow-hidden">
            {/* New SVG Background */}
            <img 
              src="https://raw.githubusercontent.com/pkades/orangedog/main/service%20label%20option%201%20test.svg"
              alt="Label Design" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Demo elements for preview only */}
            <div className="absolute top-2 right-2 text-right text-xs z-10">
              <div className="font-bold">PHONE</div>
              <div>LOCATION</div>
            </div>
            {/* Demo logo */}
            <div className="absolute top-2 left-2 w-10 h-6 bg-gray-300 flex items-center justify-center z-10">
              <span className="text-[8px]">LOGO</span>
            </div>
          </div>
        );
      case 'layout2':
        return (
          <div className="w-full h-32 bg-white border border-gray-200 relative overflow-hidden">
            {/* Write Box */}
            <div className="absolute h-8 left-2 right-2 top-16 bg-gray-100 rounded-md"></div>
            {/* Black Label */}
            <div className="absolute h-6 w-16 top-16 left-2 bg-black text-white text-xs flex items-center justify-center font-bebas">
              SERVICE
            </div>
            {/* Demo contact info */}
            <div className="absolute top-2 right-2 text-right text-xs">
              <div className="font-bold">PHONE</div>
              <div>LOCATION</div>
            </div>
            {/* Demo logo */}
            <div className="absolute top-2 left-2 w-10 h-6 bg-gray-300 flex items-center justify-center">
              <span className="text-[8px]">LOGO</span>
            </div>
          </div>
        );
      case 'layout3':
        return (
          <div className="w-full h-32 bg-white border border-gray-200 relative overflow-hidden flex">
            {/* Left accent panel */}
            <div className="w-2/5 h-full bg-gray-200 p-2">
              {/* Demo logo */}
              <div className="w-full h-8 flex items-center justify-center mb-1">
                <div className="w-12 h-6 bg-white flex items-center justify-center">
                  <span className="text-[8px]">LOGO</span>
                </div>
              </div>
              {/* Demo contact */}
              <div className="text-xs">
                <div className="font-bold">PHONE</div>
                <div>LOCATION</div>
              </div>
            </div>
            {/* Right fields */}
            <div className="flex-1 p-2 flex flex-col justify-center space-y-3">
              <div>
                <div className="h-4 w-14 bg-black text-white text-[8px] flex items-center justify-center">
                  DATE
                </div>
                <div className="h-5 border border-black"></div>
              </div>
              <div>
                <div className="h-4 w-14 bg-black text-white text-[8px] flex items-center justify-center">
                  KM
                </div>
                <div className="h-5 border border-black"></div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
            Preview Not Available
          </div>
        );
    }
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
                  {renderLayoutPreview(layout.id)}
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
