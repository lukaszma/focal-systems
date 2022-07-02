import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DeviceDataApiResponse, getDeviceById } from "../../api";
import { PageHeaderContext } from "../../contexts";

export const Device: React.FC = () => {
  const { setPageHeader } = useContext(PageHeaderContext);
  const [deviceData, setDeviceData] = useState<DeviceDataApiResponse[]>([]);
  const { deviceId } = useParams();

  useEffect(() => {
    setPageHeader({ label: "Device Health Check", isBackBtnVisible: true });
  }, [setPageHeader]);

  useEffect(() => {
    const getInitData = async () => {
      if (!deviceId) return;

      const data = await getDeviceById(deviceId);

      setDeviceData(data);
    };

    getInitData();
  }, [deviceId]);

  console.log(deviceData);

  return <div>Device</div>;
};
