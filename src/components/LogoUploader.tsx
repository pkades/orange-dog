
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { isJpegImage, removeImageBackground } from '@/utils/imageUtils';
import { toast } from "@/components/ui/sonner";

interface LogoUploaderProps {
  onLogoChange: (logoUrl: string, needsBackgroundRemoval: boolean) => void;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({ onLogoChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  
  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      
      // Check if file is JPEG (which might need background removal)
      const isJpeg = isJpegImage(file);
      
      if (isJpeg) {
        try {
          // Process JPEG to remove background
          const processedUrl = await removeImageBackground(file);
          onLogoChange(processedUrl, true);
          toast.success("Logo uploaded with background removed");
        } catch (error) {
          console.error("Error removing background:", error);
          // Fallback to original image if background removal fails
          const originalUrl = URL.createObjectURL(file);
          onLogoChange(originalUrl, false);
          toast.info("Logo uploaded without background removal");
        }
      } else {
        // Use original file for PNG (assuming it already has transparency)
        const imageUrl = URL.createObjectURL(file);
        onLogoChange(imageUrl, false);
        toast.success("Logo uploaded successfully");
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast.error("Failed to upload logo");
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="font-medium text-lg">Upload Your Logo</h3>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 w-full max-w-md flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
        <Upload className="w-10 h-10 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500 mb-4">Click to upload or drag and drop</p>
        <p className="text-xs text-gray-400 mb-4">PNG or JPEG (recommended: PNG with transparency)</p>
        
        <Button 
          variant="outline" 
          disabled={isUploading}
          className="relative"
        >
          {isUploading ? "Uploading..." : "Select Logo"}
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleLogoUpload}
            accept="image/png,image/jpeg,image/jpg"
            disabled={isUploading}
          />
        </Button>
      </div>
    </div>
  );
};

export default LogoUploader;
