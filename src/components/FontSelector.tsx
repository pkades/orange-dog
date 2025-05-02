
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
  // First, ensure the necessary Google Fonts are loaded
  React.useEffect(() => {
    // Add Google Fonts links for all font options
    const fontFamilies = options
      .filter(font => !['Arial', 'Impact'].includes(font.name)) // Skip system fonts
      .map(font => font.name.replace(/\s+/g, '+'))
      .join('|');
    
    if (fontFamilies) {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      
      return () => {
        // Clean up if component unmounts
        document.head.removeChild(link);
      };
    }
  }, [options]);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue 
          placeholder="Select font" 
          style={{ fontFamily: value || 'inherit' }}
        />
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
