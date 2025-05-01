
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Palette } from "lucide-react";
import { Input } from "@/components/ui/input";

// CMYK conversion utilities
const rgbToCmyk = (r: number, g: number, b: number): [number, number, number, number] => {
  r = r / 255;
  g = g / 255;
  b = b / 255;
  
  const k = 1 - Math.max(r, g, b);
  
  if (k === 1) {
    return [0, 0, 0, 1];
  }
  
  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);
  
  return [
    Math.round(c * 100),
    Math.round(m * 100),
    Math.round(y * 100),
    Math.round(k * 100)
  ];
};

const cmykToRgb = (c: number, m: number, y: number, k: number): [number, number, number] => {
  c = c / 100;
  m = m / 100;
  y = y / 100;
  k = k / 100;
  
  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);
  
  return [Math.round(r), Math.round(g), Math.round(b)];
};

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ];
  }
  return [0, 0, 0];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// Brand colors palette
const PREDEFINED_COLORS = [
  "#222222", // black
  "#ffffff", // white
  "#FF7A00", // Orange Dog orange
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
  useCmyk?: boolean;
}

const CustomColorPicker: React.FC<ColorPickerProps> = ({ 
  label, 
  color, 
  onChange
}) => {
  const [cmykValues, setCmykValues] = useState<[number, number, number, number]>([0, 0, 0, 0]);
  
  // Initialize CMYK values from the current color
  useEffect(() => {
    const [r, g, b] = hexToRgb(color);
    setCmykValues(rgbToCmyk(r, g, b));
  }, [color]);
  
  // Handle CMYK input changes with fixed bug for C value
  const handleCmykChange = (component: 'c' | 'm' | 'y' | 'k', value: number) => {
    // Ensure value is a valid number
    let newValue = isNaN(value) ? 0 : Math.max(0, Math.min(100, value));
    
    const newCmyk = [...cmykValues] as [number, number, number, number];
    
    switch (component) {
      case 'c': newCmyk[0] = newValue; break;
      case 'm': newCmyk[1] = newValue; break;
      case 'y': newCmyk[2] = newValue; break;
      case 'k': newCmyk[3] = newValue; break;
    }
    
    setCmykValues(newCmyk);
    
    const [r, g, b] = cmykToRgb(...newCmyk);
    onChange(rgbToHex(r, g, b));
  };

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
          <PopoverContent className="w-72 p-3">
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
              
              <div className="mt-2">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="cmyk-c" className="w-10">C:</Label>
                    <Input
                      id="cmyk-c"
                      type="number"
                      min="0"
                      max="100"
                      value={cmykValues[0]}
                      onChange={(e) => handleCmykChange('c', parseInt(e.target.value || '0', 10))}
                    />
                    <span>%</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Label htmlFor="cmyk-m" className="w-10">M:</Label>
                    <Input
                      id="cmyk-m"
                      type="number"
                      min="0"
                      max="100"
                      value={cmykValues[1]}
                      onChange={(e) => handleCmykChange('m', parseInt(e.target.value || '0', 10))}
                    />
                    <span>%</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Label htmlFor="cmyk-y" className="w-10">Y:</Label>
                    <Input
                      id="cmyk-y"
                      type="number"
                      min="0"
                      max="100"
                      value={cmykValues[2]}
                      onChange={(e) => handleCmykChange('y', parseInt(e.target.value || '0', 10))}
                    />
                    <span>%</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Label htmlFor="cmyk-k" className="w-10">K:</Label>
                    <Input
                      id="cmyk-k"
                      type="number"
                      min="0"
                      max="100"
                      value={cmykValues[3]}
                      onChange={(e) => handleCmykChange('k', parseInt(e.target.value || '0', 10))}
                    />
                    <span>%</span>
                  </div>
                </div>
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
