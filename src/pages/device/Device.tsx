import { useContext, useEffect, useState } from "react";
import { Alert, Tabs } from "antd";
import LineChartOutlined from "@ant-design/icons/LineChartOutlined";
import UnorderedListOutlined from "@ant-design/icons/UnorderedListOutlined";
import { useParams } from "react-router-dom";
import { DeviceDataApiResponse, getDeviceById } from "../../api";
import { PageHeaderContext } from "../../contexts";
import { DeviceGeneral, DeviceMetrics } from "./components";
import { DeviceList } from "./Device.types";

const Device: React.FC = () => {
  const { setPageHeader } = useContext(PageHeaderContext);
  const [deviceData, setDeviceData] = useState<DeviceDataApiResponse>([]);
  const { deviceId } = useParams();

  const { TabPane } = Tabs;

  useEffect(() => {
    setPageHeader({
      label: deviceData
        ? `Device Health Check: ${deviceId}`
        : "Device not found",
      isBackBtnVisible: true,
    });
  }, [setPageHeader, deviceId, deviceData]);

  useEffect(() => {
    const getInitData = async () => {
      if (!deviceId) return;

      const data = await getDeviceById(deviceId);

      setDeviceData(data);
    };

    getInitData();
  }, [deviceId]);

  const parsedDeviceDate: DeviceList = deviceData?.map((item) => ({
    ...item,
    received_status_at: new Date(item.received_status_at),
  }));

  return (
    <div>
      {deviceData ? (
        <Tabs>
          <TabPane
            tab={
              <span>
                <UnorderedListOutlined />
                General
              </span>
            }
            key="general.tab"
          >
            <DeviceGeneral data={parsedDeviceDate} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <LineChartOutlined />
                Metrics
              </span>
            }
            key="metrics.tab"
          >
            <DeviceMetrics data={deviceData} />
          </TabPane>
        </Tabs>
      ) : (
        <Alert
          message="Error"
          description="Device not Found!"
          type="error"
          showIcon
        />
      )}
    </div>
  );
};

export default Device;
