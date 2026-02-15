import ExcelJS from 'exceljs';

interface RegistrationData {
  _id: string;
  _creationTime: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: string;
  cancelledBy?: string;
  cancelledAt?: number;
}

export async function exportToExcel(
  data: RegistrationData[],
  filename: string,
  sheetName: string
) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  // Define columns
  worksheet.columns = [
    { header: 'Full Name', key: 'fullName', width: 25 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Phone Number', key: 'phoneNumber', width: 20 },
    { header: 'Status', key: 'status', width: 15 },
    { header: 'Registration Date', key: 'registrationDate', width: 20 },
    { header: 'Cancelled By', key: 'cancelledBy', width: 25 },
    { header: 'Cancelled At', key: 'cancelledAt', width: 20 },
  ];

  // Style header row
  worksheet.getRow(1).font = { bold: true, size: 12 };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4F46E5' }, // Indigo color
  };
  worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
  worksheet.getRow(1).height = 25;

  // Add data rows
  data.forEach((item) => {
    worksheet.addRow({
      fullName: item.fullName,
      email: item.email,
      phoneNumber: item.phoneNumber,
      status: item.status.toUpperCase(),
      registrationDate: new Date(item._creationTime).toLocaleString(),
      cancelledBy: item.cancelledBy || '-',
      cancelledAt: item.cancelledAt ? new Date(item.cancelledAt).toLocaleString() : '-',
    });
  });

  // Style data rows
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
          left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
          bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
          right: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        };
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
      });

      // Color code status
      const statusCell = row.getCell('status');
      if (statusCell.value === 'ACTIVE') {
        statusCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF10B981' }, // Green
        };
        statusCell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
      } else if (statusCell.value === 'CANCELLED') {
        statusCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFEF4444' }, // Red
        };
        statusCell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
      }
    }
  });

  // Generate buffer and download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
}
