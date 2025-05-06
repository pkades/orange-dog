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
import { exportLabelAsPDF, createPDFForSubmission, submitDesignToServer, submitDesignByEmail } from '@/utils/pdfExporter';
import SubmissionModal, { CustomerInfo } from '@/components/SubmissionModal';

// Updated Orange Dog logo URL
const ORANGE_DOG_LOGO = 'https://raw.githubusercontent.com/pkades/orangedogv2/main/orange%20dog%20logo%20svg.svg';

// Define the Inline SVG for layout 1
const LAYOUT1_SVG = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Creator: CorelDRAW 2019 (64-Bit) -->
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="68mm" height="45mm" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
viewBox="0 0 7433.34 4919.12"
 xmlns:xlink="http://www.w3.org/1999/xlink"
 xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
 <defs>
  <style type="text/css">
   <![CDATA[
    .str0 {stroke:#373435;stroke-width:28.92;stroke-miterlimit:22.9256}
    .fil0 {fill:#FEFEFE}
    .fil2 {fill:#F58634}
    .fil3 {fill:#FEFEFE;fill-rule:nonzero}
    .fil1 {fill:#373435;fill-rule:nonzero}
   ]]>
  </style>
 </defs>
 <g id="Layer_x0020_1">
  <metadata id="CorelCorpID_0Corel-Layer"/>
  <rect class="fil0" x="0" y="-0" width="7433.34" height="4919.12" rx="344.56" ry="437.26"/>
  <path class="fil1" d="M446.88 0l6539.59 0c122.9,0 234.63,50.21 315.61,131.07 80.99,80.86 131.26,192.41 131.26,315.14l0 4026.71c0,122.73 -50.27,234.28 -131.26,315.14 -80.98,80.86 -192.71,131.07 -315.61,131.07l-6539.59 0c-122.9,0 -234.63,-50.21 -315.61,-131.07 -80.99,-80.86 -192.71,-131.07 -315.61,-131.07zm6539.59 21.76l-6539.59 0c-116.89,0 -223.16,47.77 -300.2,124.68 -77.04,76.92 -124.88,183.05 -124.88,299.76l0 4026.71c0,116.71 47.84,222.84 124.88,299.76 77.03,76.91 183.31,124.68 300.2,124.68l6539.59 0c116.89,0 223.16,-47.77 300.2,-124.68 77.04,-76.92 124.88,-183.05 124.88,-299.76l0 -4026.71c0,-116.71 -47.84,-222.84 -124.88,-299.76 -77.03,-76.91 -183.31,-124.68 -300.2,-124.68z"/>
  <g id="_3025737991952">
   <path class="fil0 str0" d="M622.01 2734.03l6189.34 0c86.59,0 157.42,70.84 157.42,157.43l0 792.86c0,86.58 -70.84,157.41 -157.42,157.41l-6189.34 0c-86.59,0 -157.42,-70.84 -157.42,-157.41l0 -792.86c0,-86.6 70.84,-157.43 157.42,-157.43z"/>
   <path class="fil1" d="M6630.59 3722.14l-33.02 0 0 -247.06 33.02 0 0 247.06zm76.05 0l-33.03 0 -41.29 -120.78 0 -2.07 34.41 -124.21 30.28 0 -34.76 122.84 44.39 124.22zm86.03 -101.85l30.62 -145.21 36.48 0 0 247.06 -33.03 0 3.44 -161.73 -24.78 117 -25.46 0 -24.77 -117 3.43 161.73 -33.02 0 0 -247.06 36.47 0 30.63 145.21z"/>
   <path class="fil2" d="M2105.1 3827.28l0 -1078.79 -1483.09 0c-39.31,0 -75.05,16.09 -100.96,42 -25.92,25.89 -42,61.64 -42,100.97l0 792.86c0,39.3 16.09,75.04 42,100.95 25.91,25.91 61.66,42 100.96,42l1483.09 0z"/>
   <path class="fil3" d="M835.04 2987.21l0 -31.09c0,-14.15 -6.91,-21.22 -20.73,-21.22l-7.4 0c-13.49,0 -20.23,7.07 -20.23,21.22l0 58.72c0,6.58 1.31,11.02 3.95,13.33 2.63,2.31 6.91,5.26 12.83,8.89l44.91 24.18c9.87,5.59 16.87,9.95 20.98,13.07 4.11,3.13 7.31,6.91 9.62,11.35 2.31,4.45 3.45,12.92 3.45,25.42l0 75.5c0,39.81 -19.08,59.72 -57.25,59.72l-29.11 0c-37.83,0 -56.76,-21.71 -56.76,-65.14l0 -17.76 47.38 0 0 19.24c0,13.82 7.07,20.73 21.22,20.73l8.4 0c12.49,0 18.75,-6.91 18.75,-20.73l0 -60.2c0,-6.58 -1.31,-11.03 -3.95,-13.33 -2.63,-2.31 -6.91,-5.27 -12.83,-8.89l-44.91 -25.16c-9.87,-5.27 -17.02,-9.71 -21.47,-13.33 -4.44,-3.62 -7.64,-8.31 -9.62,-14.07 -1.98,-5.76 -2.96,-13.24 -2.96,-22.45l0 -72.54c0,-40.47 18.92,-60.7 56.76,-60.7l29.6 0c37.84,0 56.76,20.23 56.76,60.7l0 34.54 -47.38 0zm86.86 259.08l0 -354.33 117.45 0 0 42.94 -70.08 0 0 107.58 62.19 0 0 42.94 -62.19 0 0 117.94 70.08 0 0 42.94 -117.45 0zm151.51 -354.33l92.77 0c36.18,0 54.29,20.23 54.29,60.7l0 87.34c0,30.92 -9.38,50.5 -28.14,58.73l33.07 147.55 -44.91 0 -31.09 -143.11 -28.63 0 0 143.11 -47.37 0 0 -354.33zm47.37 170.75l31.1 0c14.15,0 21.22,-8.55 21.22,-25.66l0 -76.5c0,-17.11 -7.07,-25.66 -21.22,-25.66l-31.1 0 0 127.81zm292.66 -170.75l-57.25 354.33 -56.26 0 -57.25 -354.33 46.88 0 38.5 270.43 38.49 -270.43 46.88 0zm27.14 354.33l0 -354.33 47.37 0 0 354.33 -47.37 0zm233.42 -82.9l0 22.69c0,40.14 -18.91,60.21 -56.76,60.21l-30.6 0c-37.83,0 -56.74,-20.07 -56.74,-60.21l0 -233.91c0,-40.14 18.91,-60.21 56.74,-60.21l30.6 0c37.84,0 56.76,20.07 56.76,60.21l0 39.97 -47.38 0 0 -36.51c0,-13.82 -7.07,-20.73 -21.22,-20.73l-9.38 0c-12.49,0 -18.75,6.91 -18.75,20.73l0 227c0,13.82 6.25,20.73 18.75,20.73l11.85 0c12.49,0 18.75,-6.91 18.75,-20.73l0 -19.24 47.38 0zm37.01 82.9l0 -354.33 117.45 0 0 42.94 -70.08 0 0 107.58 62.19 0 0 42.94 -62.19 0 0 117.94 70.08 0 0 42.94 -117.45 0zm-966.76 437.49l0 -354.33 82.41 0c44.41,0 66.62,22.7 66.62,68.1l0 234.9c0,34.22 -18.91,51.32 -56.74,51.32l-92.28 0zm47.37 -42.94l35.54 0c12.51,0 18.75,-5.26 18.75,-15.78l0 -227.01c0,-17.11 -7.07,-25.66 -21.22,-25.66l-33.07 0 0 268.45zm297.59 -311.39l0 287.21c0,44.74 -19.09,67.12 -57.25,67.12l-39.98 0c-37.83,0 -56.74,-22.54 -56.74,-67.61l0 -286.72 47.37 0 0 288.21c0,15.46 6.91,23.19 20.74,23.19l19.24 0c12.83,0 19.25,-7.73 19.25,-23.19l0 -288.21 47.38 0zm44.41 354.33l0 -354.33 117.45 0 0 42.94 -70.08 0 0 107.58 62.19 0 0 42.94 -62.19 0 0 117.94 70.08 0 0 42.94 -117.45 0zm275.37 0l-47.38 0 0 -293.63c0,-40.47 18.91,-60.7 56.74,-60.7l35.54 0c37.83,0 56.76,20.23 56.76,60.7l0 293.63 -47.38 0 0 -129.79 -54.29 0 0 129.79zm54.29 -172.73l0 -117.94c0,-13.82 -6.91,-20.73 -20.73,-20.73l-12.83 0c-13.82,0 -20.73,6.91 -20.73,20.73l0 117.94 54.29 0zm164.82 -138.66l0 311.39 -47.38 0 0 -311.39 -45.41 0 0 -42.94 138.18 0 0 42.94 -45.4 0zm75.01 251.18l0 60.21 -50.34 0 0 -60.21 50.34 0zm0 -193.94l0 60.21 -50.34 0 0 -60.21 50.34 0z"/>
  </g>
 </g>
</svg>`;

// Create a Blob URL for the layout1 SVG
const createLayout1SVGUrl = () => {
  const blob = new Blob([LAYOUT1_SVG], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
};

// Define the available layouts with updated references
const LABEL_LAYOUTS: Layout[] = [
  { 
    id: 'layout1', 
    name: 'Orange Circle Service Label', 
    svgUrl: 'data:image/svg+xml;base64,' + btoa(LAYOUT1_SVG)
  },
  {
    id: 'layout2',
    name: 'Black Banner Service Label',
    svgUrl: 'https://via.placeholder.com/500x330?text=Layout+2+Placeholder'
  },
  {
    id: 'layout3',
    name: 'Split Panel Service Label',
    svgUrl: 'https://via.placeholder.com/500x330?text=Layout+3+Placeholder'
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
        // Try email submission approach
        await submitDesignByEmail(pdfBlob, customerInfo);
        
        toast.success("Design successfully submitted to josh@orangedog.co.nz! We'll contact you soon.");
        setSubmissionModalOpen(false);
      } catch (error) {
        console.error("Error submitting design:", error);
        toast.error("Failed to submit design. Please try again or contact support.");
      }
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
