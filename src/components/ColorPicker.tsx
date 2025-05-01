
import React from 'react';
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Palette } from "lucide-react"; // Replacing ColorPicker with Palette

const PREDEFINED_COLORS = [
  "#222222", // black
  "#ffffff", // white
  "#F97316", // orange
  "#0EA5E9", // blue
  "#8B5CF6", // purple
  "#22C55E", // green
  "#EF4444", // red
  "#F59E0B", // amber
];

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

const CustomColorPicker: React.FC<ColorPickerProps> = ({ label, color, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={`color-${label}`}>{label}</Label>
      
      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <button
              id={`color-${label}`}
              className="w-10 h-10 rounded border border-gray-200 flex items-center justify-center"
              style={{ 
                backgroundColor: color,
                color: isLightColor(color) ? "#000000" : "#ffffff" 
              }}
            >
              <Palette className="h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3">
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-4 gap-2">
                {PREDEFINED_COLORS.map((presetColor) => (
                  <button
                    key={presetColor}
                    className="w-10 h-10 rounded border border-gray-200 cursor-pointer transition-transform hover:scale-110"
                    style={{ backgroundColor: presetColor }}
                    onClick={() => onChange(presetColor)}
                  />
                ))}
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="custom-color">Custom Color</Label>
                <input
                  id="custom-color"
                  type="color"
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full h-10"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <span className="text-sm font-mono">{color.toUpperCase()}</span>
      </div>
    </div>
  );
};

// Helper function to determine if a color is light or dark
const isLightColor = (color: string): boolean => {
  // Convert hex to RGB
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};

export default CustomColorPicker;
