
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

// Import layout designs for preview
import Layout1Design from './layout-designs/Layout1Design';
import Layout2Design from './layout-designs/Layout2Design';
import Layout3Design from './layout-designs/Layout3Design';

export interface Layout {
  id: string;
  name: string;
  image?: string;
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
  // Render the layout preview based on layout ID
  const renderLayoutPreview = (layoutId: string) => {
    const dummyPhoneNumber = '123-456-7890';
    const dummyLocation = 'Wellington, NZ';
    const dummyLogo = null;
    const dummyAccentColor = layoutId === 'layout1' ? '#f58220' : '#dcdcdc';
    
    switch(layoutId) {
      case 'layout1':
        return (
          <div className="w-full h-32 overflow-hidden border border-gray-200 bg-white">
            <Layout1Design 
              logoUrl={dummyLogo}
              phoneNumber={dummyPhoneNumber}
              location={dummyLocation}
              accentColor={dummyAccentColor}
            />
          </div>
        );
      case 'layout2':
        return (
          <div className="w-full h-32 overflow-hidden border border-gray-200 bg-white">
            <Layout2Design 
              logoUrl={dummyLogo}
              phoneNumber={dummyPhoneNumber}
              location={dummyLocation}
            />
          </div>
        );
      case 'layout3':
        return (
          <div className="w-full h-32 overflow-hidden border border-gray-200 bg-white">
            <Layout3Design 
              logoUrl={dummyLogo}
              phoneNumber={dummyPhoneNumber}
              location={dummyLocation}
              accentColor={dummyAccentColor}
            />
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
