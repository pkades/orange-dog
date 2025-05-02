import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Download, ArrowLeftRight, ArrowUpDown, FileText, Upload, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import LogoUploader from '@/components/LogoUploader';
import CustomColorPicker from '@/components/ColorPicker';
import LabelPreview from '@/components/LabelPreview';
import FontSelector from '@/components/FontSelector';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LayoutSelector, { Layout } from '@/components/LayoutSelector';
import { Slider } from "@/components/ui/slider";
import { exportLabelAsPDF, createPDFForSubmission, submitDesignToServer } from '@/utils/pdfExporter';
import SubmissionModal, { CustomerInfo } from '@/components/SubmissionModal';

// Updated Orange Dog logo URL
const ORANGE_DOG_LOGO = 'https://raw.githubusercontent.com/pkades/orangedogv2/main/orange%20dog%20logo%20svg.svg';

// Define the available layouts with new SVG URLs
const LABEL_LAYOUTS: Layout[] = [
  { 
    id: 'layout1', 
    name: 'Orange Circle Service Label', 
    svgUrl: 'https://raw.githubusercontent.com/pkades/orangedogv2/main/option%201%20svg.svg'
  },
  {
    id: 'layout2',
    name: 'Black Banner Service Label',
    svgUrl: 'https://raw.githubusercontent.com/pkades/orangedogv2/main/option%202%20svg%20fix.svg'
  },
  {
    id: 'layout3',
    name: 'Split Panel Service Label',
    svgUrl: 'https://raw.githubusercontent.com/pkades/orangedogv2/main/option%203%20svg.svg'
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
const ORANGE_DOG_COLOR = '#FF6600';

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
  
  // Logo size state - separate for facing out and facing in
  const [facingOutLogoSize, setFacingOutLogoSize] = useState(70);
  const [facingInLogoSize, setFacingInLogoSize] = useState(70);
  
  // Logo position state - for facing in preview
  const [logoPositionX, setLogoPositionX] = useState(25);
  const [logoPositionY, setLogoPositionY] = useState(25);
  
  // NEW: Text position state - for phone and location
  const [phonePositionX, setPhonePositionX] = useState(75);
  const [phonePositionY, setPhonePositionY] = useState(25);
  const [locationPositionX, setLocationPositionX] = useState(75);
  const [locationPositionY, setLocationPositionY] = useState(35);
  
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

  // References to label previews for PDF export
  const facingOutRef = useRef<HTMLDivElement>(null);
  const facingInRef = useRef<HTMLDivElement>(null);

  // Handle phone number formatting - UPDATED to allow spaces
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only remove characters that are not numbers or spaces
    const cleaned = e.target.value.replace(/[^\d\s]/g, '');
    setPhoneNumber(cleaned);
  };

  // Add new state for submission modal
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Export label as PDF
  const handleExportLabel = async () => {
    toast.info("Preparing label design for PDF export...", {
      duration: 2000, // 2 seconds
    });
    
    try {
      await exportLabelAsPDF(facingOutRef.current, facingInRef.current);
      
      toast.success("Label design exported as PDF. Check your downloads folder!");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  // New function to handle design submission
  const handleSubmitDesign = async (customerInfo: CustomerInfo) => {
    setIsSubmitting(true);
    
    try {
      // Display toast that we're preparing the submission
      toast.info("Preparing your design for submission...");
      
      // Create the PDF blob
      const pdfBlob = await createPDFForSubmission(facingOutRef.current, facingInRef.current, customerInfo);
      
      // For demo purposes, we'll use two approaches:
      // Option 1: Direct form submission (only works if your endpoint supports it)
      toast.info("Submitting your design to Orange Dog...");
      
      try {
        // This is just a placeholder. In production you'd have an actual endpoint.
        // For demonstration, we'll simulate a successful submission after 2 seconds
        // await submitDesignToServer(pdfBlob, customerInfo);
        
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        toast.success("Design successfully submitted to Orange Dog! We'll contact you soon.");
        setSubmissionModalOpen(false);
      } catch (error) {
        console.error("Error submitting design:", error);
        toast.error("Failed to submit design. Please try again or contact support.");
      }
      
      // Option 2: Email with attachment
      // This would require backend functionality
      // For now we'll just simulate this flow
    } catch (error) {
      console.error("Error preparing design submission:", error);
      toast.error("Failed to prepare design for submission. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" style={{ fontFamily: 'inherit' }}>
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
                <CardHeader className="bg-orangedog text-white text-center rounded-t-lg">
                  <CardTitle>Design Your Label</CardTitle>
                  <CardDescription className="text-white pb-2">
                    Upload your logo and fill in your business information
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6 pt-6">
                  {/* Logo Upload */}
                  <LogoUploader onLogoChange={handleLogoChange} />
                  
                  {/* Layout selector under logo upload */}
                  <LayoutSelector 
                    layouts={LABEL_LAYOUTS}
                    selectedLayoutId={selectedLayoutId}
                    onLayoutChange={setSelectedLayoutId}
                    backgroundColor={backgroundColor}
                    accentColor={accentColor}
                    hideTextPlaceholders={true}
                  />
                  
                  {/* MOVED: Color Selection to be right after layout selection */}
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
                  
                  {/* Logo Size Adjustment for Facing Out */}
                  <div className="space-y-2">
                    <Label htmlFor="facing-out-logo-size" className="flex items-center gap-2">
                      Logo Size (Facing Out)
                    </Label>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">Small</span>
                      <Slider
                        id="facing-out-logo-size"
                        defaultValue={[facingOutLogoSize]}
                        max={120}
                        min={30}
                        step={1}
                        onValueChange={(values) => setFacingOutLogoSize(values[0])}
                        className="flex-1"
                      />
                      <span className="text-sm">Large</span>
                    </div>
                  </div>
                  
                  {/* Logo Size Adjustment for Facing In */}
                  <div className="space-y-2">
                    <Label htmlFor="facing-in-logo-size" className="flex items-center gap-2">
                      Logo Size (Facing In)
                    </Label>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">Small</span>
                      <Slider
                        id="facing-in-logo-size"
                        defaultValue={[facingInLogoSize]}
                        max={120}
                        min={30}
                        step={1}
                        onValueChange={(values) => setFacingInLogoSize(values[0])}
                        className="flex-1"
                      />
                      <span className="text-sm">Large</span>
                    </div>
                  </div>
                  
                  {/* Logo Position Controls for Facing In */}
                  <Card className="p-4">
                    <h4 className="font-medium mb-4">Logo Position (Facing In)</h4>
                    <div className="space-y-5">
                      {/* X Position (Horizontal) */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <ArrowLeftRight className="h-4 w-4" />
                          <Label htmlFor="logo-position-x">Horizontal Position</Label>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">Left</span>
                          <Slider
                            id="logo-position-x"
                            defaultValue={[logoPositionX]}
                            max={90}
                            min={10}
                            step={1}
                            onValueChange={(values) => setLogoPositionX(values[0])}
                            className="flex-1"
                          />
                          <span className="text-sm">Right</span>
                        </div>
                      </div>
                      
                      {/* Y Position (Vertical) */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <ArrowUpDown className="h-4 w-4" />
                          <Label htmlFor="logo-position-y">Vertical Position</Label>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">Top</span>
                          <Slider
                            id="logo-position-y"
                            defaultValue={[logoPositionY]}
                            max={90}
                            min={10}
                            step={1}
                            onValueChange={(values) => setLogoPositionY(values[0])}
                            className="flex-1"
                          />
                          <span className="text-sm">Bottom</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  {/* Business Information - MOVED before Text Styling */}
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
                  
                  {/* MOVED: Text Styling section moved under the Phone/Location inputs */}
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
                  
                  {/* MOVED: Text Position Controls after Text Styling  */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone Number Position */}
                    <Card className="p-4">
                      <h4 className="font-medium mb-4">Phone Number Position</h4>
                      <div className="space-y-4">
                        {/* Phone X Position */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <ArrowLeftRight className="h-4 w-4" />
                            <Label htmlFor="phone-position-x">Horizontal Position</Label>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm">Left</span>
                            <Slider
                              id="phone-position-x"
                              defaultValue={[phonePositionX]}
                              max={90}
                              min={10}
                              step={1}
                              onValueChange={(values) => setPhonePositionX(values[0])}
                              className="flex-1"
                            />
                            <span className="text-sm">Right</span>
                          </div>
                        </div>
                        
                        {/* Phone Y Position */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <ArrowUpDown className="h-4 w-4" />
                            <Label htmlFor="phone-position-y">Vertical Position</Label>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm">Top</span>
                            <Slider
                              id="phone-position-y"
                              defaultValue={[phonePositionY]}
                              max={90}
                              min={10}
                              step={1}
                              onValueChange={(values) => setPhonePositionY(values[0])}
                              className="flex-1"
                            />
                            <span className="text-sm">Bottom</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                    
                    {/* Location Position */}
                    <Card className="p-4">
                      <h4 className="font-medium mb-4">Location Position</h4>
                      <div className="space-y-4">
                        {/* Location X Position */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <ArrowLeftRight className="h-4 w-4" />
                            <Label htmlFor="location-position-x">Horizontal Position</Label>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm">Left</span>
                            <Slider
                              id="location-position-x"
                              defaultValue={[locationPositionX]}
                              max={90}
                              min={10}
                              step={1}
                              onValueChange={(values) => setLocationPositionX(values[0])}
                              className="flex-1"
                            />
                            <span className="text-sm">Right</span>
                          </div>
                        </div>
                        
                        {/* Location Y Position */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <ArrowUpDown className="h-4 w-4" />
                            <Label htmlFor="location-position-y">Vertical Position</Label>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm">Top</span>
                            <Slider
                              id="location-position-y"
                              defaultValue={[locationPositionY]}
                              max={90}
                              min={10}
                              step={1}
                              onValueChange={(values) => setLocationPositionY(values[0])}
                              className="flex-1"
                            />
                            <span className="text-sm">Bottom</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      style={{ backgroundColor: ORANGE_DOG_COLOR }}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Export Label Design as PDF
                    </Button>
                    
                    <Button 
                      type="button"
                      size="lg" 
                      className="w-full bg-gray-700 hover:bg-gray-800"
                      onClick={() => setSubmissionModalOpen(true)}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Submit Design to Orange Dog
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
          
          {/* Preview Section - Adding sticky positioning */}
          <div className="space-y-6">
            <div className="sticky top-4">
              <h2 className="text-xl font-bold mb-4">Label Preview</h2>
              
              <Tabs defaultValue="both" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="both">Both Sides</TabsTrigger>
                  <TabsTrigger value="out">Facing Out</TabsTrigger>
                  <TabsTrigger value="in">Facing In</TabsTrigger>
                </TabsList>
                
                <TabsContent value="both" className="space-y-4">
                  <LabelPreview 
                    ref={facingOutRef}
                    logoUrl={logoUrl}
                    phoneNumber={phoneNumber}
                    location={location}
                    backgroundColor={backgroundColor}
                    accentColor={accentColor}
                    selectedLayout={selectedLayout}
                    type="facingOut"
                    facingOutLogoSize={facingOutLogoSize}
                    facingInLogoSize={facingInLogoSize}
                    logoPositionX={logoPositionX}
                    logoPositionY={logoPositionY}
                    phonePositionX={phonePositionX}
                    phonePositionY={phonePositionY}
                    locationPositionX={locationPositionX}
                    locationPositionY={locationPositionY}
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
                    ref={facingInRef}
                    logoUrl={logoUrl}
                    phoneNumber={phoneNumber}
                    location={location}
                    backgroundColor={backgroundColor}
                    accentColor={accentColor}
                    selectedLayout={selectedLayout}
                    type="facingIn"
                    facingOutLogoSize={facingOutLogoSize}
                    facingInLogoSize={facingInLogoSize}
                    logoPositionX={logoPositionX}
                    logoPositionY={logoPositionY}
                    phonePositionX={phonePositionX}
                    phonePositionY={phonePositionY}
                    locationPositionX={locationPositionX}
                    locationPositionY={locationPositionY}
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
                    ref={facingOutRef}
                    logoUrl={logoUrl}
                    phoneNumber={phoneNumber}
                    location={location}
                    backgroundColor={backgroundColor}
                    accentColor={accentColor}
                    selectedLayout={selectedLayout}
                    type="facingOut"
                    facingOutLogoSize={facingOutLogoSize}
                    facingInLogoSize={facingInLogoSize}
                    logoPositionX={logoPositionX}
                    logoPositionY={logoPositionY}
                    phonePositionX={phonePositionX}
                    phonePositionY={phonePositionY}
                    locationPositionX={locationPositionX}
                    locationPositionY={locationPositionY}
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
                    ref={facingInRef}
                    logoUrl={logoUrl}
                    phoneNumber={phoneNumber}
                    location={location}
                    backgroundColor={backgroundColor}
                    accentColor={accentColor}
                    selectedLayout={selectedLayout}
                    type="facingIn"
                    facingOutLogoSize={facingOutLogoSize}
                    facingInLogoSize={facingInLogoSize}
                    logoPositionX={logoPositionX}
                    logoPositionY={logoPositionY}
                    phonePositionX={phonePositionX}
                    phonePositionY={phonePositionY}
                    locationPositionX={locationPositionX}
                    locationPositionY={locationPositionY}
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
              
              {/* Specifications Card */}
              <Card className="mt-4">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Specifications</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Label size: 68x45mm</li>
                    <li>• Bleed area: 3mm</li>
                    <li>• Print-ready dimensions: 74x51mm</li>
                    <li>• Export format: PDF with embedded images</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      <SubmissionModal
        open={submissionModalOpen}
        onOpenChange={setSubmissionModalOpen}
        onSubmit={handleSubmitDesign}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default Index;
