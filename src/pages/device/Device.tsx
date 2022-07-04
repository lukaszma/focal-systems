import { useContext, useEffect, useMemo, useState } from "react";
import { Alert, Tabs } from "antd";
import LineChartOutlined from "@ant-design/icons/LineChartOutlined";
import UnorderedListOutlined from "@ant-design/icons/UnorderedListOutlined";
import { useParams } from "react-router-dom";
import { DeviceDataApiResponse, getDeviceById } from "../../api";
import { PageHeaderContext } from "../../contexts";
import { DeviceGeneral, DeviceMetrics } from "./components";
import { DeviceList } from "./Device.types";
import { Loader } from "../../features";

const Device: React.FC = () => {
  const { setPageHeader } = useContext(PageHeaderContext);
  const [deviceData, setDeviceData] = useState<DeviceDataApiResponse>();
  const [isDataInitialized, setIsDataInitialized] = useState(false);
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
      setIsDataInitialized(true);
    };

    getInitData();
  }, [deviceId]);

  const parsedDeviceData: DeviceList = useMemo(
    () =>
      deviceData?.map((item) => ({
        ...item,
        received_status_at: new Date(item.received_status_at),
      })) || [],
    [deviceData]
  );

  if (!isDataInitialized) {
    return <Loader />;
  }

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
            <DeviceGeneral data={parsedDeviceData} />
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
          description="Device Not Found!"
          type="error"
          showIcon
        />
      )}
    </div>
  );
};

export default Device;
