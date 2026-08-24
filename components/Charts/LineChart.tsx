"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface LineDefinition {
  dataKey: string;
  color?: string;
  type?: "monotone" | "linear" | "basis" | "step";
  name?: string;
}

type LineChartProps<T extends object> = {
  data: T[];
  xKey: string;
  lines: LineDefinition[];
  height?: number;
  grid?: boolean;
  legend?: boolean;
  tooltip?: boolean;
  legendPosition?: {
    verticalAlign?: "top" | "middle" | "bottom";
    align?: "left" | "center" | "right";
  };
};

const LineChartVariant = <T extends object>({
  data,
  xKey,
  lines,
  height = 300,
  grid = true,
  legend = false,
  tooltip = true,
  legendPosition = { verticalAlign: "top", align: "right" },
}: LineChartProps<T>) => {
  // Add dynamic top margin if legend is on top
  const topMargin = legend && legendPosition.verticalAlign === "top" ? 40 : 20;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{ top: topMargin, right: 30, left: 0, bottom: 5 }}
      >
        {grid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={xKey} />
        <YAxis />
        {tooltip && <Tooltip />}
        {legend && (
          <Legend
            verticalAlign={legendPosition.verticalAlign}
            align={legendPosition.align}
            iconType="circle"
            wrapperStyle={{
              marginBottom: legendPosition.verticalAlign === "bottom" ? 10 : 0,
              marginTop: legendPosition.verticalAlign === "top" ? -20 : 0,
            }}
          />
        )}
        {lines?.map((line) => (
          <Line
            key={line.dataKey}
            type={line.type ?? "monotone"}
            dataKey={line.dataKey}
            stroke={line.color ?? "#2563EB"}
            name={line.name ?? line.dataKey}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartVariant;
