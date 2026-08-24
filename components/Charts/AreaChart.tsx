"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AreaDefinition<T> {
  /** The key in your data object to plot */
  dataKey: keyof T;
  /** Line color */
  stroke?: string;
  /** Fill color for the area */
  fill?: string;
  /** Custom legend name */
  name?: string;
  /** The curve type */
  type?: "monotone" | "linear" | "basis" | "step";
}

interface AreaChartVariantProps<T extends object> {
  /** Data array */
  data: T[];
  /** Property used for the X-axis */
  xKey: keyof T;
  /** Areas to display */
  areas: AreaDefinition<T>[];
  /** Chart height */
  height?: number;
  /** Whether to show grid lines */
  grid?: boolean;
  /** Whether to show tooltip */
  tooltip?: boolean;
  /** Whether to show legend */
  legend?: boolean;
  /** Legend positioning */
  legendPosition?: {
    verticalAlign?: "top" | "middle" | "bottom";
    align?: "left" | "center" | "right";
  };
}

export default function AreaChartVariant<T extends object>({
  data,
  xKey,
  areas,
  height = 300,
  grid = true,
  tooltip = true,
  legend = false,
  legendPosition = { verticalAlign: "top", align: "right" },
}: AreaChartVariantProps<T>) {
  const topMargin = legend && legendPosition.verticalAlign === "top" ? 40 : 20;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={data}
        margin={{ top: topMargin, right: 30, left: 0, bottom: 5 }}
      >
        {grid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={xKey as string} />
        <YAxis />
        {tooltip && <Tooltip />}
        {legend && (
          <Legend
            verticalAlign={legendPosition.verticalAlign}
            align={legendPosition.align}
            iconType="circle"
            wrapperStyle={{
              marginTop: legendPosition.verticalAlign === "top" ? -20 : 0,
              marginBottom: legendPosition.verticalAlign === "bottom" ? 10 : 0,
            }}
          />
        )}
        {areas.map((area) => (
          <Area
            key={String(area.dataKey)}
            type={area.type ?? "monotone"}
            dataKey={area.dataKey as string}
            stroke={area.stroke ?? "#2563EB"}
            fill={area.fill ?? "rgba(37,99,235,0.3)"}
            name={area.name ?? String(area.dataKey)}
            strokeWidth={2}
            activeDot={{ r: 4 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
