import BarChartVariant from "@/components/Charts/BarChart";


// Mock Data matching the screenshot (Jan-Dec)
const SALES_OVERVIEW_DATA = [
  { month: "Jan", amount: 650 },
  { month: "Feb", amount: 1000 },
  { month: "Mar", amount: 400 },
  { month: "Apr", amount: 780 },
  { month: "May", amount: 600 },
  { month: "Jun", amount: 550 },
  { month: "Jul", amount: 800 },
  { month: "Aug", amount: 950 },
  { month: "Sept", amount: 840 },
  { month: "Oct", amount: 500 },
  { month: "Nov", amount: 700 },
  { month: "Dec", amount: 700 },
];

const SalesOverview = () => {
  return (
    <section className="bg-white border border-solid border-dark/20 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-[#101010] mb-6">
        Sales Overview
      </h3>

      {/* Custom Header Row to match Screenshot */}
      <div className="flex justify-between items-end mb-2 px-2">
        {/* Left: Y-Axis Label */}
        <span className="text-sm text-gray-500 font-medium">Amount</span>

        {/* Right: Custom Legend */}
        <div className="flex items-center gap-6">
          {/* Amount Item (Yellow Dot) */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FFC107]"></span>
            <span className="text-sm text-gray-600">Amount</span>
          </div>
          
          {/* Year Item (Black Dot) */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#101010]"></span>
            <span className="text-sm text-gray-600">Year</span>
          </div>
        </div>
      </div>

      {/* Chart Component */}
      <div className="-ml-4"> {/* Negative margin to align Y-axis text with "Amount" label */}
        <BarChartVariant
          data={SALES_OVERVIEW_DATA}
          xKey="month"
          bars={[
            { 
              dataKey: "amount", 
              fill: "#1D3354", 
              name: "Amount" 
            }
          ]}
          height={300}
          legend={false} 
        />
      </div>
    </section>
  );
};

export default SalesOverview;