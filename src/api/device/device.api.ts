import { DeviceDataApiResponse, DevicesApiResponse } from "./device.types";

export const getDeviceList = async (): Promise<DevicesApiResponse> =>
  (await fetch("/fcc_example_data.json")).json();

export const getDeviceById = async (
  deviceId: string
): Promise<DeviceDataApiResponse> => {
  const deviceList = await getDeviceList();

  return deviceList[deviceId];
};
