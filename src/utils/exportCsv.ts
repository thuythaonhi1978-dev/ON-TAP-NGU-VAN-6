/**
 * Helper to export data to CSV format with UTF-8 BOM.
 * UTF-8 BOM (\uFEFF) ensures Microsoft Excel, Google Sheets, LibreOffice, and Numbers
 * display Vietnamese diacritics and special characters correctly without mojibake.
 * Cells containing commas, quotes, or newlines are escaped according to RFC 4180.
 */
export function exportToCSV(
  filename: string,
  headers: string[],
  rows: (string | number | undefined | null)[][]
): void {
  const escapeCell = (val: string | number | undefined | null): string => {
    if (val === undefined || val === null) return '';
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const csvRows = [
    headers.map(escapeCell).join(','),
    ...rows.map((row) => row.map(escapeCell).join(','))
  ];

  // \uFEFF is UTF-8 Byte Order Mark
  const content = '\uFEFF' + csvRows.join('\r\n');
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  const safeFilename = filename.toLowerCase().endsWith('.csv') ? filename : `${filename}.csv`;
  link.setAttribute('download', safeFilename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
