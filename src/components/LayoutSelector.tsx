
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

export interface Layout {
  id: string;
  name: string;
  image: string;
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
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-medium text-lg">Select Label Layout</h3>
      
      <RadioGroup
        value={selectedLayoutId}
        onValueChange={onLayoutChange}
        className="grid grid-cols-1 md:grid-cols-1 gap-4"
      >
        {layouts.map((layout) => (
          <div key={layout.id} className="flex items-start space-x-2">
            <RadioGroupItem value={layout.id} id={`layout-${layout.id}`} className="mt-1" />
            <Label htmlFor={`layout-${layout.id}`} className="w-full cursor-pointer">
              <Card className={`overflow-hidden transition-all ${selectedLayoutId === layout.id ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className="p-2">
                  <img
                    src={layout.image}
                    alt={layout.name}
                    className="w-full h-32 object-contain"
                  />
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
