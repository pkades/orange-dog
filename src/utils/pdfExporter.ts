
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Label size constants (68x45mm)
const LABEL_WIDTH_MM = 68;
const LABEL_HEIGHT_MM = 45;
const BLEED_MM = 3;
const IMAGE_DPI = 400; // Set image DPI to 400

export const exportLabelAsPDF = async (facingOutRef: HTMLDivElement | null, facingInRef: HTMLDivElement | null): Promise<void> => {
  try {
    // Create PDF document with custom dimensions
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [LABEL_WIDTH_MM + (BLEED_MM * 2), LABEL_HEIGHT_MM + (BLEED_MM * 2)]
    });
    
    // If we have the facing out side
    if (facingOutRef) {
      // Extract logo image if present
      const logoImg = facingOutRef.querySelector('img');
      
      // Set background color using vector graphics
      pdf.setFillColor(facingOutRef.style.backgroundColor || '#FFFFFF');
      pdf.rect(0, 0, LABEL_WIDTH_MM + (BLEED_MM * 2), LABEL_HEIGHT_MM + (BLEED_MM * 2), 'F');
      
      // If logo exists, convert only the logo to high-resolution image
      if (logoImg) {
        const logoCanvas = document.createElement('canvas');
        const ctx = logoCanvas.getContext('2d');
        
        // Set canvas size to match logo size but at high DPI
        const scaleFactor = IMAGE_DPI / 72; // Convert from PDF points to DPI
        logoCanvas.width = logoImg.width * scaleFactor;
        logoCanvas.height = logoImg.height * scaleFactor;
        
        // Draw logo on canvas
        if (ctx) {
          ctx.drawImage(logoImg, 0, 0, logoCanvas.width, logoCanvas.height);
          
          // Get logo position and size
          const logoRect = logoImg.getBoundingClientRect();
          const containerRect = facingOutRef.getBoundingClientRect();
          
          // Calculate position as percentage of container
          const xPercent = (logoRect.left - containerRect.left) / containerRect.width;
          const yPercent = (logoRect.top - containerRect.top) / containerRect.height;
          
          // Calculate width as percentage of container
          const widthPercent = logoRect.width / containerRect.width;
          const heightPercent = logoRect.height / containerRect.height;
          
          // Convert to PDF units (mm)
          const xPos = xPercent * (LABEL_WIDTH_MM + (BLEED_MM * 2));
          const yPos = yPercent * (LABEL_HEIGHT_MM + (BLEED_MM * 2));
          const width = widthPercent * (LABEL_WIDTH_MM + (BLEED_MM * 2));
          const height = heightPercent * (LABEL_HEIGHT_MM + (BLEED_MM * 2));
          
          // Add logo image to the PDF
          const logoData = logoCanvas.toDataURL('image/png');
          pdf.addImage(logoData, 'PNG', xPos, yPos, width, height);
        }
      }
      
      // Add a new page for the next label
      if (facingInRef) {
        pdf.addPage();
      }
    }
    
    // If we have the facing in side
    if (facingInRef) {
      // Set background color using vector graphics
      pdf.setFillColor(facingInRef.style.backgroundColor || '#FFFFFF');
      pdf.rect(0, 0, LABEL_WIDTH_MM + (BLEED_MM * 2), LABEL_HEIGHT_MM + (BLEED_MM * 2), 'F');
      
      // Extract and process elements separately
      const elements = facingInRef.querySelectorAll('*');
      
      // First, handle the SVG template
      const svgTemplate = facingInRef.querySelector('img[src*=".svg"]');
      if (svgTemplate && svgTemplate.getAttribute('src')) {
        // For SVG template, we'll fetch the actual SVG content and add it as vector
        try {
          const response = await fetch(svgTemplate.getAttribute('src') || '');
          const svgText = await response.text();
          
          // Add SVG directly to PDF (jsPDF has limited SVG support, so this is a simplified approach)
          pdf.addSvgAsImage(svgText, 0, 0, LABEL_WIDTH_MM + (BLEED_MM * 2), LABEL_HEIGHT_MM + (BLEED_MM * 2));
        } catch (error) {
          console.error('Error fetching SVG template:', error);
          // Fallback to raster if SVG fetch fails
          const templateCanvas = await html2canvas(svgTemplate as HTMLElement, {
            scale: IMAGE_DPI / 72,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
          });
          
          const templateImgData = templateCanvas.toDataURL('image/png');
          pdf.addImage(templateImgData, 'PNG', 0, 0, LABEL_WIDTH_MM + (BLEED_MM * 2), LABEL_HEIGHT_MM + (BLEED_MM * 2));
        }
      }
      
      // Handle text elements - convert to PDF text objects for vector output
      const textElements = facingInRef.querySelectorAll('div[style*="font"]');
      textElements.forEach((element) => {
        const textElement = element as HTMLElement;
        const text = textElement.textContent || '';
        
        // Get computed styles
        const styles = window.getComputedStyle(textElement);
        const fontFamily = styles.fontFamily.split(',')[0].replace(/"/g, '').replace(/'/g, '');
        const fontSize = parseFloat(styles.fontSize) * 0.352778; // Convert px to mm (1px ≈ 0.352778mm)
        
        // Get position
        const rect = textElement.getBoundingClientRect();
        const containerRect = facingInRef.getBoundingClientRect();
        
        // Calculate position as percentage of container
        const xPercent = (rect.left - containerRect.left) / containerRect.width;
        const yPercent = (rect.top - containerRect.top) / containerRect.height;
        
        // Convert to PDF units (mm)
        const xPos = xPercent * (LABEL_WIDTH_MM + (BLEED_MM * 2));
        const yPos = yPercent * (LABEL_HEIGHT_MM + (BLEED_MM * 2)) + fontSize; // Add fontSize to account for baseline
        
        // Set text properties
        pdf.setFont(fontFamily, styles.fontWeight === 'bold' ? 'bold' : 'normal');
        pdf.setFontSize(fontSize);
        pdf.setTextColor(styles.color);
        
        // Add text to PDF
        pdf.text(text, xPos, yPos, { align: 'left' });
      });
      
      // Handle logo image - convert to high-resolution raster
      const logoImg = facingInRef.querySelector('img:not([src*=".svg"])');
      if (logoImg) {
        const logoCanvas = document.createElement('canvas');
        const ctx = logoCanvas.getContext('2d');
        
        // Set canvas size to match logo size but at high DPI
        const scaleFactor = IMAGE_DPI / 72; // Convert from PDF points to DPI
        logoCanvas.width = logoImg.width * scaleFactor;
        logoCanvas.height = logoImg.height * scaleFactor;
        
        // Draw logo on canvas
        if (ctx) {
          ctx.drawImage(logoImg, 0, 0, logoCanvas.width, logoCanvas.height);
          
          // Get logo position and size
          const logoRect = logoImg.getBoundingClientRect();
          const containerRect = facingInRef.getBoundingClientRect();
          
          // Calculate position as percentage of container
          const xPercent = (logoRect.left - containerRect.left) / containerRect.width;
          const yPercent = (logoRect.top - containerRect.top) / containerRect.height;
          
          // Calculate width as percentage of container
          const widthPercent = logoRect.width / containerRect.width;
          const heightPercent = logoRect.height / containerRect.height;
          
          // Convert to PDF units (mm)
          const xPos = xPercent * (LABEL_WIDTH_MM + (BLEED_MM * 2));
          const yPos = yPercent * (LABEL_HEIGHT_MM + (BLEED_MM * 2));
          const width = widthPercent * (LABEL_WIDTH_MM + (BLEED_MM * 2));
          const height = heightPercent * (LABEL_HEIGHT_MM + (BLEED_MM * 2));
          
          // Add logo image to the PDF
          const logoData = logoCanvas.toDataURL('image/png');
          pdf.addImage(logoData, 'PNG', xPos, yPos, width, height);
        }
      }
    }
    
    // Save the PDF with a custom name
    pdf.save('orange-dog-service-label.pdf');
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error generating PDF:', error);
    return Promise.reject(error);
  }
};

// New function to create PDF and return it as a blob for submission
export const createPDFForSubmission = async (
  facingOutRef: HTMLDivElement | null, 
  facingInRef: HTMLDivElement | null,
  customerInfo?: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
  }
): Promise<Blob> => {
  try {
    // Create PDF document with custom dimensions
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [LABEL_WIDTH_MM + (BLEED_MM * 2), LABEL_HEIGHT_MM + (BLEED_MM * 2)]
    });
    
    // If we have the facing out side
    if (facingOutRef) {
      // Extract logo image if present
      const logoImg = facingOutRef.querySelector('img');
      
      // Set background color using vector graphics
      pdf.setFillColor(facingOutRef.style.backgroundColor || '#FFFFFF');
      pdf.rect(0, 0, LABEL_WIDTH_MM + (BLEED_MM * 2), LABEL_HEIGHT_MM + (BLEED_MM * 2), 'F');
      
      // If logo exists, convert only the logo to high-resolution image
      if (logoImg) {
        const logoCanvas = document.createElement('canvas');
        const ctx = logoCanvas.getContext('2d');
        
        // Set canvas size to match logo size but at high DPI
        const scaleFactor = IMAGE_DPI / 72; // Convert from PDF points to DPI
        logoCanvas.width = logoImg.width * scaleFactor;
        logoCanvas.height = logoImg.height * scaleFactor;
        
        // Draw logo on canvas
        if (ctx) {
          ctx.drawImage(logoImg, 0, 0, logoCanvas.width, logoCanvas.height);
          
          // Get logo position and size
          const logoRect = logoImg.getBoundingClientRect();
          const containerRect = facingOutRef.getBoundingClientRect();
          
          // Calculate position as percentage of container
          const xPercent = (logoRect.left - containerRect.left) / containerRect.width;
          const yPercent = (logoRect.top - containerRect.top) / containerRect.height;
          
          // Calculate width as percentage of container
          const widthPercent = logoRect.width / containerRect.width;
          const heightPercent = logoRect.height / containerRect.height;
          
          // Convert to PDF units (mm)
          const xPos = xPercent * (LABEL_WIDTH_MM + (BLEED_MM * 2));
          const yPos = yPercent * (LABEL_HEIGHT_MM + (BLEED_MM * 2));
          const width = widthPercent * (LABEL_WIDTH_MM + (BLEED_MM * 2));
          const height = heightPercent * (LABEL_HEIGHT_MM + (BLEED_MM * 2));
          
          // Add logo image to the PDF
          const logoData = logoCanvas.toDataURL('image/png');
          pdf.addImage(logoData, 'PNG', xPos, yPos, width, height);
        }
      }
      
      // Add a new page for the next label
      if (facingInRef) {
        pdf.addPage();
      }
    }
    
    // If we have the facing in side
    if (facingInRef) {
      // Set background color using vector graphics
      pdf.setFillColor(facingInRef.style.backgroundColor || '#FFFFFF');
      pdf.rect(0, 0, LABEL_WIDTH_MM + (BLEED_MM * 2), LABEL_HEIGHT_MM + (BLEED_MM * 2), 'F');
      
      // Extract and process elements separately
      const elements = facingInRef.querySelectorAll('*');
      
      // First, handle the SVG template
      const svgTemplate = facingInRef.querySelector('img[src*=".svg"]');
      if (svgTemplate && svgTemplate.getAttribute('src')) {
        // For SVG template, we'll fetch the actual SVG content and add it as vector
        try {
          const response = await fetch(svgTemplate.getAttribute('src') || '');
          const svgText = await response.text();
          
          // Add SVG directly to PDF (jsPDF has limited SVG support, so this is a simplified approach)
          pdf.addSvgAsImage(svgText, 0, 0, LABEL_WIDTH_MM + (BLEED_MM * 2), LABEL_HEIGHT_MM + (BLEED_MM * 2));
        } catch (error) {
          console.error('Error fetching SVG template:', error);
          // Fallback to raster if SVG fetch fails
          const templateCanvas = await html2canvas(svgTemplate as HTMLElement, {
            scale: IMAGE_DPI / 72,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
          });
          
          const templateImgData = templateCanvas.toDataURL('image/png');
          pdf.addImage(templateImgData, 'PNG', 0, 0, LABEL_WIDTH_MM + (BLEED_MM * 2), LABEL_HEIGHT_MM + (BLEED_MM * 2));
        }
      }
      
      // Handle text elements - convert to PDF text objects for vector output
      const textElements = facingInRef.querySelectorAll('div[style*="font"]');
      textElements.forEach((element) => {
        const textElement = element as HTMLElement;
        const text = textElement.textContent || '';
        
        // Get computed styles
        const styles = window.getComputedStyle(textElement);
        const fontFamily = styles.fontFamily.split(',')[0].replace(/"/g, '').replace(/'/g, '');
        const fontSize = parseFloat(styles.fontSize) * 0.352778; // Convert px to mm (1px ≈ 0.352778mm)
        
        // Get position
        const rect = textElement.getBoundingClientRect();
        const containerRect = facingInRef.getBoundingClientRect();
        
        // Calculate position as percentage of container
        const xPercent = (rect.left - containerRect.left) / containerRect.width;
        const yPercent = (rect.top - containerRect.top) / containerRect.height;
        
        // Convert to PDF units (mm)
        const xPos = xPercent * (LABEL_WIDTH_MM + (BLEED_MM * 2));
        const yPos = yPercent * (LABEL_HEIGHT_MM + (BLEED_MM * 2)) + fontSize; // Add fontSize to account for baseline
        
        // Set text properties
        pdf.setFont(fontFamily, styles.fontWeight === 'bold' ? 'bold' : 'normal');
        pdf.setFontSize(fontSize);
        pdf.setTextColor(styles.color);
        
        // Add text to PDF
        pdf.text(text, xPos, yPos, { align: 'left' });
      });
      
      // Handle logo image - convert to high-resolution raster
      const logoImg = facingInRef.querySelector('img:not([src*=".svg"])');
      if (logoImg) {
        const logoCanvas = document.createElement('canvas');
        const ctx = logoCanvas.getContext('2d');
        
        // Set canvas size to match logo size but at high DPI
        const scaleFactor = IMAGE_DPI / 72; // Convert from PDF points to DPI
        logoCanvas.width = logoImg.width * scaleFactor;
        logoCanvas.height = logoImg.height * scaleFactor;
        
        // Draw logo on canvas
        if (ctx) {
          ctx.drawImage(logoImg, 0, 0, logoCanvas.width, logoCanvas.height);
          
          // Get logo position and size
          const logoRect = logoImg.getBoundingClientRect();
          const containerRect = facingInRef.getBoundingClientRect();
          
          // Calculate position as percentage of container
          const xPercent = (logoRect.left - containerRect.left) / containerRect.width;
          const yPercent = (logoRect.top - containerRect.top) / containerRect.height;
          
          // Calculate width as percentage of container
          const widthPercent = logoRect.width / containerRect.width;
          const heightPercent = logoRect.height / containerRect.height;
          
          // Convert to PDF units (mm)
          const xPos = xPercent * (LABEL_WIDTH_MM + (BLEED_MM * 2));
          const yPos = yPercent * (LABEL_HEIGHT_MM + (BLEED_MM * 2));
          const width = widthPercent * (LABEL_WIDTH_MM + (BLEED_MM * 2));
          const height = heightPercent * (LABEL_HEIGHT_MM + (BLEED_MM * 2));
          
          // Add logo image to the PDF
          const logoData = logoCanvas.toDataURL('image/png');
          pdf.addImage(logoData, 'PNG', xPos, yPos, width, height);
        }
      }
    }
    
    // If customer info is provided, add an additional page with customer details
    if (customerInfo) {
      pdf.addPage();
      pdf.setFontSize(14);
      pdf.text("Customer Information", 10, 10);
      pdf.setFontSize(12);
      pdf.text(`Name: ${customerInfo.name}`, 10, 20);
      pdf.text(`Email: ${customerInfo.email}`, 10, 25);
      if (customerInfo.phone) {
        pdf.text(`Phone: ${customerInfo.phone}`, 10, 30);
      }
      if (customerInfo.message) {
        pdf.text("Message:", 10, 35);
        // Split long message into multiple lines
        const splitMessage = pdf.splitTextToSize(customerInfo.message, 150);
        pdf.text(splitMessage, 10, 40);
      }
    }
    
    // Return the PDF as a blob
    const pdfBlob = pdf.output('blob');
    return pdfBlob;
  } catch (error) {
    console.error('Error generating PDF for submission:', error);
    throw error;
  }
};

// Helper function to submit PDF using FormData and fetch API
export const submitDesignToServer = async (
  pdfBlob: Blob,
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
  }
): Promise<Response> => {
  // Create form data to send
  const formData = new FormData();
  formData.append('pdf', pdfBlob, 'design.pdf');
  formData.append('name', customerInfo.name);
  formData.append('email', customerInfo.email);
  if (customerInfo.phone) formData.append('phone', customerInfo.phone);
  if (customerInfo.message) formData.append('message', customerInfo.message);
  
  // Send to server using fetch API
  // Replace this URL with your actual submission endpoint
  const response = await fetch('https://your-submission-endpoint.com/submit-design', {
    method: 'POST',
    body: formData,
  });
  
  return response;
};

// New helper function for email submissions
export const submitDesignByEmail = async (
  pdfBlob: Blob,
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
  }
): Promise<boolean> => {
  try {
    // This is a mock function since client-side JS can't directly send emails
    // In a real application, you'd submit this to a backend service that handles the email
    
    // For demonstration purposes, we'll simulate a successful email submission
    console.log(`Simulating email submission to: josh@orangedog.co.nz`);
    console.log(`From: ${customerInfo.name} (${customerInfo.email})`);
    if (customerInfo.phone) console.log(`Phone: ${customerInfo.phone}`);
    if (customerInfo.message) console.log(`Message: ${customerInfo.message}`);
    console.log(`PDF attachment: ${pdfBlob.size} bytes`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
