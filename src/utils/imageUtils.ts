
export const removeImageBackground = async (
  imageFile: File
): Promise<string> => {
  // Create a canvas element
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
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
      
      // For simplicity, we'll use a color detection algorithm
      // In a production app, you'd use a more sophisticated AI-based background removal
      
      // Find the most common edge colors (likely background)
      const edgePixels: {[key: string]: number} = {};
      
      // Sample the edges of the image
      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          // Only check pixels on the edges
          if (x < 5 || y < 5 || x > canvas.width - 5 || y > canvas.height - 5) {
            const i = (y * canvas.width + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Create a color key with reduced precision to group similar colors
            const colorKey = `${Math.floor(r/10)},${Math.floor(g/10)},${Math.floor(b/10)}`;
            
            if (!edgePixels[colorKey]) {
              edgePixels[colorKey] = 1;
            } else {
              edgePixels[colorKey]++;
            }
          }
        }
      }
      
      // Find the most common edge color
      let maxCount = 0;
      let bgColorKey = '';
      for (const key in edgePixels) {
        if (edgePixels[key] > maxCount) {
          maxCount = edgePixels[key];
          bgColorKey = key;
        }
      }
      
      // Convert the key back to RGB
      const [r10, g10, b10] = bgColorKey.split(',').map(Number);
      
      // With some threshold to account for slight variations
      const threshold = 25;
      
      // Make background transparent
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If pixel color is close to the identified background color
        if (
          Math.abs(r - r10 * 10) < threshold && 
          Math.abs(g - g10 * 10) < threshold && 
          Math.abs(b - b10 * 10) < threshold
        ) {
          data[i + 3] = 0; // Set alpha to transparent
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

// Helper function to convert canvas/image to SVG for vector export
export const convertToSVG = (canvas: HTMLCanvasElement, logoUrl: string | null): string => {
  const width = canvas.width;
  const height = canvas.height;
  
  // Create SVG
  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
  
  // Add background rect
  svgContent += `<rect width="${width}" height="${height}" fill="${getCanvasBackgroundColor(canvas)}" />`;
  
  // Add logo if available
  if (logoUrl) {
    svgContent += `<image href="${logoUrl}" x="${width/4}" y="${height/4}" width="${width/2}" height="${height/2}" preserveAspectRatio="xMidYMid meet" />`;
  }
  
  // Close SVG
  svgContent += '</svg>';
  
  return svgContent;
};

// Get the dominant background color from canvas
const getCanvasBackgroundColor = (canvas: HTMLCanvasElement): string => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return '#ffffff';
  
  const imageData = ctx.getImageData(0, 0, 1, 1).data;
  return `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
};

// Helper function for vector export
export const exportAsVector = (
  svgContent: string, 
  filename: string = 'label-design'
): void => {
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up
  setTimeout(() => URL.revokeObjectURL(url), 100);
};
