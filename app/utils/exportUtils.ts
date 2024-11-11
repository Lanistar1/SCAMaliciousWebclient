import * as XLSX from "xlsx";
import { saveAs  } from "file-saver";

// Function to convert JSON data to CSV format
const exportToCSV = (data: any[], filename: string) => {
  const csvRows: string[] = [];
  // Extract headers
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));
  
  // Extract row values
  data.forEach((row) => {
    const values = headers.map((header) => row[header]);
    csvRows.push(values.join(","));
  });
  
  const csvContent = csvRows.join("\n");
  
  // Create a Blob and trigger the download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `${filename}.csv`);
};

// Function to convert JSON data to Excel format
const exportToExcel = (data: any[], filename: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
  // Trigger the download
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export { exportToCSV, exportToExcel };
