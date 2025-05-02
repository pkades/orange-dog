
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
