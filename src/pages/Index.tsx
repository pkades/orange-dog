
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import LogoUploader from '@/components/LogoUploader';
import CustomColorPicker from '@/components/ColorPicker';
import LayoutSelector, { Layout } from '@/components/LayoutSelector';
import LabelPreview from '@/components/LabelPreview';

// Layout options with image URLs pointing to the uploaded images
const LAYOUT_OPTIONS: Layout[] = [
  {
    id: 'layout1',
    name: 'Layout 1',
    image: '/lovable-uploads/2e0cf000-6dbf-4332-a6e8-4deae185c59d.png'
  },
  {
    id: 'layout2',
    name: 'Layout 2',
    image: '/lovable-uploads/d019a82b-2896-4a11-9c76-2298966d7aef.png'
  },
  {
    id: 'layout3',
    name: 'Layout 3',
    image: '/lovable-uploads/f2a15f2e-57cb-4757-b107-a3b404305d0d.png'
  }
];

const Index = () => {
  // Form state
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [accentColor, setAccentColor] = useState('#F97316');
  const [selectedLayoutId, setSelectedLayoutId] = useState('layout1');
  
  // Get selected layout
  const selectedLayout = LAYOUT_OPTIONS.find(layout => layout.id === selectedLayoutId) || null;
  
  // Logo upload handler
  const handleLogoChange = (url: string) => {
    setLogoUrl(url);
  };

  // Handle phone number formatting
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '');
    setPhoneNumber(cleaned);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Label design saved!");
    // In a real application, you would save the design or generate printable PDFs here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Label Design Craft</h1>
          <p className="text-gray-600">Create custom service reminder labels for your business</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  
                  {/* Color Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomColorPicker 
                      label="Background Color"
                      color={backgroundColor}
                      onChange={setBackgroundColor}
                    />
                    
                    <CustomColorPicker 
                      label="Accent Color"
                      color={accentColor}
                      onChange={setAccentColor}
                    />
                  </div>
                  
                  {/* Layout Selection */}
                  <LayoutSelector 
                    layouts={LAYOUT_OPTIONS}
                    selectedLayoutId={selectedLayoutId}
                    onLayoutChange={setSelectedLayoutId}
                  />
                  
                  <Button type="submit" size="lg" className="w-full">
                    Save Label Design
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
                />
                <LabelPreview 
                  logoUrl={logoUrl}
                  phoneNumber={phoneNumber}
                  location={location}
                  backgroundColor={backgroundColor}
                  accentColor={accentColor}
                  selectedLayout={selectedLayout}
                  type="facingIn"
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
                />
              </TabsContent>
            </Tabs>
            
            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Specifications</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Label size: 60x40mm</li>
                  <li>• Bleed area: 4mm</li>
                  <li>• Print-ready dimensions: 68x48mm</li>
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
