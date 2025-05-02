
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Label size constants (68x45mm)
const LABEL_WIDTH_MM = 68;
const LABEL_HEIGHT_MM = 45;
const BLEED_MM = 3;

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
      // Convert the facing out HTML to canvas
      const facingOutCanvas = await html2canvas(facingOutRef, {
        scale: 2, // Higher resolution
        useCORS: true, // Allow images from other domains
        allowTaint: true,
        backgroundColor: null,
      });
      
      // Add image to the PDF
      const facingOutImgData = facingOutCanvas.toDataURL('image/png');
      pdf.addImage(
        facingOutImgData, 
        'PNG', 
        0, 
        0, 
        LABEL_WIDTH_MM + (BLEED_MM * 2), 
        LABEL_HEIGHT_MM + (BLEED_MM * 2)
      );
      
      // Add a new page for the next label
      if (facingInRef) {
        pdf.addPage();
      }
    }
    
    // If we have the facing in side
    if (facingInRef) {
      // Convert the facing in HTML to canvas
      const facingInCanvas = await html2canvas(facingInRef, {
        scale: 2, // Higher resolution
        useCORS: true, // Allow images from other domains
        allowTaint: true,
        backgroundColor: null,
      });
      
      // Add image to the PDF
      const facingInImgData = facingInCanvas.toDataURL('image/png');
      pdf.addImage(
        facingInImgData, 
        'PNG', 
        0, 
        0, 
        LABEL_WIDTH_MM + (BLEED_MM * 2), 
        LABEL_HEIGHT_MM + (BLEED_MM * 2)
      );
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
      // Convert the facing out HTML to canvas
      const facingOutCanvas = await html2canvas(facingOutRef, {
        scale: 2, // Higher resolution
        useCORS: true, // Allow images from other domains
        allowTaint: true,
        backgroundColor: null,
      });
      
      // Add image to the PDF
      const facingOutImgData = facingOutCanvas.toDataURL('image/png');
      pdf.addImage(
        facingOutImgData, 
        'PNG', 
        0, 
        0, 
        LABEL_WIDTH_MM + (BLEED_MM * 2), 
        LABEL_HEIGHT_MM + (BLEED_MM * 2)
      );
      
      // Add a new page for the next label
      if (facingInRef) {
        pdf.addPage();
      }
    }
    
    // If we have the facing in side
    if (facingInRef) {
      // Convert the facing in HTML to canvas
      const facingInCanvas = await html2canvas(facingInRef, {
        scale: 2, // Higher resolution
        useCORS: true, // Allow images from other domains
        allowTaint: true,
        backgroundColor: null,
      });
      
      // Add image to the PDF
      const facingInImgData = facingInCanvas.toDataURL('image/png');
      pdf.addImage(
        facingInImgData, 
        'PNG', 
        0, 
        0, 
        LABEL_WIDTH_MM + (BLEED_MM * 2), 
        LABEL_HEIGHT_MM + (BLEED_MM * 2)
      );
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
