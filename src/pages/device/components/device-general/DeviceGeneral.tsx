import { useMemo } from "react";
import { Alert, Table } from "antd";
import { format } from "date-fns";
import { deviceGeneralHelper } from "./DeviceGeneral.helper";
import { DeviceGeneralProps } from "./DeviceGeneral.types";
import { DeviceItem } from "../../Device.types";
import type { ColumnsType } from "antd/lib/table";

const DAYS_RANGE = 7;
const WARNING_BATTERY_LEVEL = 10;

export const DeviceGeneral: React.FC<DeviceGeneralProps> = ({ data }) => {
  const displayData = useMemo(
    () => deviceGeneralHelper.getLastDaysData(data, DAYS_RANGE),
    [data]
  );

  const isInsufficientData = deviceGeneralHelper.getIsInsufficientData(
    DAYS_RANGE,
    displayData
  );

  const columns: ColumnsType<DeviceItem> = [
    {
      title: "Date",
      dataIndex: "received_status_at",
      key: "received_status_at",
      render: (date: Date) => <span>{format(date, "Pp")}</span>,
    },
    {
      title: "Status id",
      dataIndex: "status_id",
      key: "status_id",
    },
    {
      title: "Battery level",
      dataIndex: "battery_level",
      key: "battery_level",
      render: (batteryLevel: number) => <span>{`${batteryLevel}%`}</span>,
    },
  ];

  return (
    <div>
      {Boolean(displayData) && displayData.length === 0 && (
        <Alert
          message="Warning"
          description="No Device Data!"
          type="warning"
          showIcon
        />
      )}
      {displayData.length > 0 &&
        displayData[0].battery_level < WARNING_BATTERY_LEVEL && (
          <Alert
            message="Low Battery"
            description={`${displayData[0].battery_level}% battery remaining.`}
            type="warning"
            showIcon
          />
        )}
      <Table
        columns={columns}
        dataSource={displayData}
        rowKey="status_id"
        pagination={false}
      />
      {displayData.length > 0 && isInsufficientData && (
        <Alert
          message="Device have not provided enough statuses"
          type="info"
          showIcon
        />
      )}
    </div>
  );
};
