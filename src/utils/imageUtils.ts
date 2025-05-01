
export const removeImageBackground = async (
  imageFile: File
): Promise<string> => {
  // Create a canvas element
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  // Create an image element and load the file
  const img = new Image();
  const imageUrl = URL.createObjectURL(imageFile);
  
  // Return a promise that resolves with the processed image data URL
  return new Promise((resolve, reject) => {
    img.onload = () => {
      // Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0);
      
      // Get the image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // For simplicity in this demo, we'll make white-ish pixels transparent
      // A more sophisticated solution would use ML models for background removal
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If pixel is light (white-ish), make it transparent
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0; // Set alpha channel to transparent
        }
      }
      
      // Put the modified image data back on the canvas
      ctx.putImageData(imageData, 0, 0);
      
      // Convert canvas to data URL
      const processedImageUrl = canvas.toDataURL("image/png");
      URL.revokeObjectURL(imageUrl);
      resolve(processedImageUrl);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error("Failed to load image"));
    };
    
    img.src = imageUrl;
  });
};

export const isJpegImage = (file: File): boolean => {
  return file.type === "image/jpeg" || file.type === "image/jpg";
};
