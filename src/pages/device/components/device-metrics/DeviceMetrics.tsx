import { DeviceMetricsProps } from "./DeviceMetrics.types";
import styles from "./DeviceMetrics.module.css";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

export const DeviceMetrics: React.FC<DeviceMetricsProps> = ({ data }) => {
  const chartData = data.map((item) => ({
    ...item,
    received_status_at: format(new Date(item.received_status_at), "Pp"),
  }));

  return (
    <div className={styles.container}>
      <ResponsiveContainer>
        <AreaChart
          width={500}
          height={400}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="received_status_at" minTickGap={20} />
          <YAxis dataKey="battery_level" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="battery_level"
            stroke="#8884d8"
            fill="#8884d8"
            name="Batterry Level"
            unit="%"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
