import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { toast } from 'sonner';

export const generateMasterSchedulePDF = (outlets, chefs) => {
  try {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(10, 37, 64);
    doc.text('Aroma Labs: Master Staff Schedule', 14, 22);
    
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    const tableColumn = ["Outlet", "Manager", "Chefs On-Duty"];
    const tableRows = [];

    outlets.forEach(outlet => {
      const outletChefs = chefs.filter(c => c.outlet === outlet.name).map(c => c.name).join(', ') || "N/A";
      const rowData = [
        outlet.name,
        outlet.manager,
        outletChefs
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [10, 37, 64], textColor: [255, 255, 255] },
      styles: { fontSize: 10, cellPadding: 5 }
    });

    doc.save('AromaLabs_MasterSchedule.pdf');
    toast.success('Master Schedule PDF Exported successfully!');
  } catch (error) {
    console.error('Failed to export PDF:', error);
    toast.error('Failed to export PDF. Please try again.');
  }
};
