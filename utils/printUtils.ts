
import { toast } from "sonner";

type WithKey = {
  key?: React.Key;
};
export interface PrintConfig<T extends WithKey = WithKey> {
  title: string;
  address?: string;
  orderedBy?: string;
  issuedOn?: string;

  data: T[];
  columns?: {
    header: string;
    // accessor: (item: Record<string, unknown>) => string | number;
    accessor: (item: T) => string | number;
  }[];

  selectedRowKeys?: React.Key[];
  includeSummary?: boolean;
  printStyle?: "basic" | "detailed" | "minimal";
}

export const generatePrintContent = <
  T extends WithKey
>(
  config: PrintConfig<T>
): string => {

  const {
    title,
    address,
    orderedBy,
    issuedOn,
    data,
    columns,
    includeSummary = true,
    selectedRowKeys = [],
  } = config;

  const itemsToPrint =
  selectedRowKeys.length > 0
    ? data.filter(
        (item) =>
          item.key !== undefined &&
          selectedRowKeys.includes(item.key)
      )
    : data;


  const effectiveColumns =
    columns ||
    Object.keys(data[0] || {})
      .filter((key) => key !== "key")
      .map((key) => ({
        header: key,
        // accessor: (item: Record<string, unknown>) => item[key] ?? "---",
        accessor: (item) => (item as Record<string, unknown>)[key] ?? "---",
      }));

  const totalQuantity = itemsToPrint.reduce((sum, item) => {
    const col = effectiveColumns.find(
      (c) => c.header.toLowerCase().includes("quantity")
    );
    const value = col ? Number(col.accessor(item)) : 0;
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  return `
<!DOCTYPE html>
<html>
<head>
<title>${title}</title>
<style>
  body {
    font-family: "Segoe UI", Arial, sans-serif;
    margin: 0;
    padding: 32px;
    color: #111;
  }

  .header-wrap {
    display: flex;
    width: 100%;
    height: 130px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 28px;
  }

  .header-left {
    flex: 2;
    background: #1f3556;
    padding: 28px 32px;
    color: #fff;
  }

  .header-left h1 {
    margin: 0 0 6px 0;
    font-size: 34px;
    font-weight: 700;
  }

  .header-left p {
    margin: 0;
    font-size: 18px;
    color: #d1d5db;
  }

  .header-right {
    flex: 1;
    background: #2b4363;
  }

  .section-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 14px;
  }

  .section-head h2 {
    margin: 0;
    font-size: 22px;
    font-weight: 700;
  }

  .meta-box {
    border: 1px solid #d1d5db;
    padding: 18px 22px;
    margin-bottom: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px 24px;
    font-size: 14px;
  }

  .meta-box .label {
    color: #6b7280;
    font-size: 13px;
  }

  .meta-box .value {
    font-weight: 600;
    margin-top: 2px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 18px;
    font-size: 15px;
  }

  thead th {
    text-align: left;
    padding: 12px 10px;
    font-weight: 700;
  }

  tbody td {
    padding: 12px 10px;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr td {
    border-bottom: 1px solid #e5e7eb;
  }

  .total-row {
    display: flex;
    justify-content: space-between;
    font-size: 22px;
    font-weight: 700;
    margin-top: 18px;
  }

  .no-print {
    margin-top: 40px;
    text-align: center;
  }

  @media print {
    .no-print { display: none; }
  }

</style>
</head>

<body>

  <!-- Header -->
  <div class="header-wrap">
    <div class="header-left">
      <h1>${title}</h1>
      ${address ? `<p>${address}</p>` : ``}
    </div>
    <div class="header-right"></div>
  </div>

  <!-- Orders Form title -->
  <div class="section-head">
    <h2>Orders Form</h2>
  </div>

         ${includeSummary ? `
         <div class="summary">
           <p><strong>Total Records:</strong> ${itemsToPrint.length}</p>
           ${selectedRowKeys.length > 0 ? `<p><strong>Filtered:</strong> ${selectedRowKeys.length} selected records</p>` : ''}
         </div>
       ` : ''}

  <!-- Info card (NO From / To / NO Order number) -->
  <div class="meta-box">
    <div>
      <div class="label">Issued on</div>
      <div class="value">
        ${issuedOn ?? new Date().toLocaleString()}
        
      </div>
    </div>

    <div>
      <div class="label">Ordered by</div>
      <div class="value">
        ${orderedBy ?? ""}
      </div>
    </div>
  </div>

  <!-- Table -->
  <table>
    <thead>
      <tr>
        ${effectiveColumns
          .map((col) => `<th>${col.header}</th>`)
          .join("")}
      </tr>
    </thead>

    <tbody>
      ${itemsToPrint
        .map(
          (item) => `
          <tr>
            ${effectiveColumns
              .map(
                (col) => `<td>${col.accessor(item)}</td>`
              )
              .join("")}
          </tr>
        `
        )
        .join("")}
    </tbody>
  </table>

  <!-- Total -->
  <div class="total-row">
    <span>Total</span>
    <span>${totalQuantity}</span>
  </div>


  <div class="no-print" style="margin-top: 30px; text-align: center;">         
    <button onclick="window.print()" style="padding: 8px 16px; margin: 5px; cursor: pointer;">🖨️ Print</button>
    <button onclick="window.close()" style="padding: 8px 16px; margin: 5px; cursor: pointer;">❌ Close</button>
  </div>

  <script>
    setTimeout(() => window.print(), 300);
  </script>

</body>
</html>
`;
};


export const printContent = <T extends object> (config: PrintConfig<T>): boolean => {
  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    toast.error("Please allow pop-ups for printing");
    return false;
  }

  const content = generatePrintContent(config);

  printWindow.document.open();
  printWindow.document.write(content);
  printWindow.document.close();

  return true;
};


export const quickPrint = <T extends object>(
  data: T[],
  options?: Partial<PrintConfig<T>>
) => {
  const config: PrintConfig<T> = {
    title: options?.title || "Document",
    data,
    ...options,
  };

  return printContent(config);
};