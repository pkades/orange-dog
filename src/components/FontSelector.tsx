
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FontOption {
  name: string;
  value: string;
}

interface FontSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: FontOption[];
}

const FontSelector: React.FC<FontSelectorProps> = ({ value, onChange, options }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select font" />
      </SelectTrigger>
      <SelectContent>
        {options.map((font) => (
          <SelectItem 
            key={font.value} 
            value={font.value}
            style={{ fontFamily: font.value }}
          >
            {font.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FontSelector;
