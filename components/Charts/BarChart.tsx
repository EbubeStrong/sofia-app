"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

interface BarDefinition<T> {
  dataKey: keyof T;
  fill?: string;
  name?: string;
}

interface IBarChartProps<T extends object> {
  data: T[];
  xKey: keyof T;
  bars: BarDefinition<T>[];
  height?: number;
  grid?: boolean;
  tooltip?: boolean;
  legend?: boolean;
  legendPosition?: {
    verticalAlign?: "top" | "middle" | "bottom";
    align?: "left" | "center" | "right";
  };
}

const BarChartVariant = <T extends object>({
  data,
  xKey,
  bars,
  height = 300,
  grid = true,
  tooltip = true,
  legend = false,
  legendPosition = { verticalAlign: "top", align: "right" },
}: IBarChartProps<T>) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        {grid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={xKey as string} />
        <YAxis />
        {tooltip && <Tooltip />}
        {legend && (
          <Legend
            verticalAlign={legendPosition.verticalAlign}
            align={legendPosition.align}
          />
        )}
        {/* <Bar dataKey="value" fill="#1D3354" /> */}
        {bars.map((bar) => (
          <Bar
            key={String(bar.dataKey)}
            dataKey={bar.dataKey as string}
            fill={bar.fill ?? "#1D3354"}
            name={bar.name ?? String(bar.dataKey)}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartVariant;
