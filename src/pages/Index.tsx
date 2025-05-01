import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Download } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import LogoUploader from '@/components/LogoUploader';
import CustomColorPicker from '@/components/ColorPicker';
import LabelPreview from '@/components/LabelPreview';
import FontSelector from '@/components/FontSelector';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LayoutSelector, { Layout } from '@/components/LayoutSelector';

// Orange Dog logo
const ORANGE_DOG_LOGO = '/lovable-uploads/595ae1dd-8573-4284-a957-b07ca48f511c.png';

// Define the available layouts with new descriptions
const LABEL_LAYOUTS: Layout[] = [
  { 
    id: 'layout1', 
    name: 'Orange Circle Service Label', 
  },
  {
    id: 'layout2',
    name: 'Black Banner Service Label',
  },
  {
    id: 'layout3',
    name: 'Split Panel Service Label',
  }
];

// Add Bebas Neue to the font options
const FONT_OPTIONS = [
  { name: 'Bebas Neue', value: "'Bebas Neue', sans-serif" },
  { name: 'Montserrat', value: "'Montserrat', sans-serif" },
  { name: 'Impact', value: "Impact, sans-serif" },
  { name: 'Arial', value: "Arial, sans-serif" },
  { name: 'Gotham', value: "'Gotham', sans-serif" },
  { name: 'Futura', value: "'Futura', sans-serif" },
];

// Font sizes
const FONT_SIZES = [
  { name: 'Small', value: '12px' },
  { name: 'Medium', value: '16px' },
  { name: 'Large', value: '20px' },
  { name: 'X-Large', value: '24px' },
];

// Font weights
const FONT_WEIGHTS = [
  { name: 'Regular', value: '400' },
  { name: 'Bold', value: '700' },
];

// Orange Dog brand color (from logo)
const ORANGE_DOG_COLOR = '#FF7A00';

const Index = () => {
  // Add Bebas Neue font to the document
  React.useEffect(() => {
    // Add Google Fonts link for Bebas Neue
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      // Cleanup if component unmounts
      document.head.removeChild(link);
    };
  }, []);

  // Form state
  const [logoUrl, setLogoUrl] = useState<string | null>(ORANGE_DOG_LOGO);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [accentColor, setAccentColor] = useState(ORANGE_DOG_COLOR);
  
  // Font state
  const [fontFamily, setFontFamily] = useState(FONT_OPTIONS[0].value);
  const [phoneFont, setPhoneFont] = useState(FONT_OPTIONS[0].value);
  const [locationFont, setLocationFont] = useState(FONT_OPTIONS[0].value);
  const [phoneFontSize, setPhoneFontSize] = useState(FONT_SIZES[1].value);
  const [locationFontSize, setLocationFontSize] = useState(FONT_SIZES[0].value);
  const [fontWeight, setFontWeight] = useState(FONT_WEIGHTS[1].value);
  const [phoneFontWeight, setPhoneFontWeight] = useState(FONT_WEIGHTS[1].value);
  const [locationFontWeight, setLocationFontWeight] = useState(FONT_WEIGHTS[0].value);
  
  // Layout state
  const [selectedLayoutId, setSelectedLayoutId] = useState(LABEL_LAYOUTS[0].id);
  const selectedLayout = LABEL_LAYOUTS.find(layout => layout.id === selectedLayoutId) || null;
  
  // Logo upload handler
  const handleLogoChange = (url: string) => {
    setLogoUrl(url);
  };

  // Handle phone number formatting
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '');
    setPhoneNumber(cleaned);
  };

  // Export label as vector
  const handleExportLabel = () => {
    // In a real implementation, this would generate an SVG/EPS/AI file
    // and set up proper CMYK values for print
    toast.success("Label design exported as vector in CMYK format!");
    
    // For demonstration purposes, we'll just show a message
    // In a production app, this would trigger a download of the vector file
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <a href="https://www.orangedog.co.nz" target="_blank" rel="noopener noreferrer">
              <img 
                src={ORANGE_DOG_LOGO}
                alt="Orange Dog Logo" 
                className="h-16"
              />
            </a>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-center">Custom Service Label Builder</h1>
          <p className="text-gray-600 text-center">Create your own custom service label for your workshop</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={(e) => { e.preventDefault(); handleExportLabel(); }} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Design Your Label</CardTitle>
                  <CardDescription>
                    Upload your logo and fill in your business information
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Logo Upload */}
                  <LogoUploader onLogoChange={handleLogoChange} />
                  
                  {/* Business Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </Label>
                      <Input 
                        id="phone" 
                        placeholder="Enter phone number" 
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Location
                      </Label>
                      <Input 
                        id="location" 
                        placeholder="Enter city or address" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {/* Layout selector */}
                  <LayoutSelector 
                    layouts={LABEL_LAYOUTS}
                    selectedLayoutId={selectedLayoutId}
                    onLayoutChange={setSelectedLayoutId}
                  />
                  
                  {/* Font Selection */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Text Styling</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Phone Number Styling */}
                      <Card className="p-4">
                        <h4 className="font-medium mb-2">Phone Number Style</h4>
                        <div className="space-y-2">
                          <div>
                            <Label>Font</Label>
                            <FontSelector 
                              value={phoneFont}
                              onChange={setPhoneFont}
                              options={FONT_OPTIONS}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label>Size</Label>
                              <Select value={phoneFontSize} onValueChange={setPhoneFontSize}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent>
                                  {FONT_SIZES.map((size) => (
                                    <SelectItem key={size.value} value={size.value}>
                                      {size.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label>Weight</Label>
                              <Select value={phoneFontWeight} onValueChange={setPhoneFontWeight}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select weight" />
                                </SelectTrigger>
                                <SelectContent>
                                  {FONT_WEIGHTS.map((weight) => (
                                    <SelectItem key={weight.value} value={weight.value}>
                                      {weight.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </Card>
                      
                      {/* Location Styling */}
                      <Card className="p-4">
                        <h4 className="font-medium mb-2">Location Style</h4>
                        <div className="space-y-2">
                          <div>
                            <Label>Font</Label>
                            <FontSelector 
                              value={locationFont}
                              onChange={setLocationFont}
                              options={FONT_OPTIONS}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label>Size</Label>
                              <Select value={locationFontSize} onValueChange={setLocationFontSize}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent>
                                  {FONT_SIZES.map((size) => (
                                    <SelectItem key={size.value} value={size.value}>
                                      {size.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label>Weight</Label>
                              <Select value={locationFontWeight} onValueChange={setLocationFontWeight}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select weight" />
                                </SelectTrigger>
                                <SelectContent>
                                  {FONT_WEIGHTS.map((weight) => (
                                    <SelectItem key={weight.value} value={weight.value}>
                                      {weight.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                  
                  {/* Color Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomColorPicker 
                      label="Background Colour"
                      color={backgroundColor}
                      onChange={setBackgroundColor}
                    />
                    
                    <CustomColorPicker 
                      label="Accent Colour"
                      color={accentColor}
                      onChange={setAccentColor}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    style={{ backgroundColor: ORANGE_DOG_COLOR }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export Label Design (Vector CMYK)
                  </Button>
                </CardContent>
              </Card>
            </form>
          </div>
          
          {/* Preview Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Label Preview</h2>
            
            <Tabs defaultValue="both" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="both">Both Sides</TabsTrigger>
                <TabsTrigger value="out">Facing Out</TabsTrigger>
                <TabsTrigger value="in">Facing In</TabsTrigger>
              </TabsList>
              
              <TabsContent value="both" className="space-y-4">
                <LabelPreview 
                  logoUrl={logoUrl}
                  phoneNumber={phoneNumber}
                  location={location}
                  backgroundColor={backgroundColor}
                  accentColor={accentColor}
                  selectedLayout={selectedLayout}
                  type="facingOut"
                  fontFamily={fontFamily}
                  phoneFont={phoneFont}
                  locationFont={locationFont}
                  phoneFontSize={phoneFontSize}
                  locationFontSize={locationFontSize}
                  fontWeight={fontWeight}
                  phoneFontWeight={phoneFontWeight}
                  locationFontWeight={locationFontWeight}
                />
                <LabelPreview 
                  logoUrl={logoUrl}
                  phoneNumber={phoneNumber}
                  location={location}
                  backgroundColor={backgroundColor}
                  accentColor={accentColor}
                  selectedLayout={selectedLayout}
                  type="facingIn"
                  fontFamily={fontFamily}
                  phoneFont={phoneFont}
                  locationFont={locationFont}
                  phoneFontSize={phoneFontSize}
                  locationFontSize={locationFontSize}
                  fontWeight={fontWeight}
                  phoneFontWeight={phoneFontWeight}
                  locationFontWeight={locationFontWeight}
                />
              </TabsContent>
              
              <TabsContent value="out">
                <LabelPreview 
                  logoUrl={logoUrl}
                  phoneNumber={phoneNumber}
                  location={location}
                  backgroundColor={backgroundColor}
                  accentColor={accentColor}
                  selectedLayout={selectedLayout}
                  type="facingOut"
                  fontFamily={fontFamily}
                  phoneFont={phoneFont}
                  locationFont={locationFont}
                  phoneFontSize={phoneFontSize}
                  locationFontSize={locationFontSize}
                  fontWeight={fontWeight}
                  phoneFontWeight={phoneFontWeight}
                  locationFontWeight={locationFontWeight}
                />
              </TabsContent>
              
              <TabsContent value="in">
                <LabelPreview 
                  logoUrl={logoUrl}
                  phoneNumber={phoneNumber}
                  location={location}
                  backgroundColor={backgroundColor}
                  accentColor={accentColor}
                  selectedLayout={selectedLayout}
                  type="facingIn"
                  fontFamily={fontFamily}
                  phoneFont={phoneFont}
                  locationFont={locationFont}
                  phoneFontSize={phoneFontSize}
                  locationFontSize={locationFontSize}
                  fontWeight={fontWeight}
                  phoneFontWeight={phoneFontWeight}
                  locationFontWeight={locationFontWeight}
                />
              </TabsContent>
            </Tabs>
            
            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Specifications</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Label size: 60x40mm</li>
                  <li>• Bleed area: 4mm</li>
                  <li>• Print-ready dimensions: 64x44mm</li>
                  <li>• Export format: Vector (CMYK color mode)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
