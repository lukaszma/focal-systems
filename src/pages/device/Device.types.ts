import { DeviceData } from "../../api";

export type DeviceItem = Omit<DeviceData, "received_status_at"> & {
  received_status_at: Date;
};

export type DeviceList = DeviceItem[];
