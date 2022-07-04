export interface DeviceData {
  status_id: number;
  battery_level: number;
  received_status_at: string;
}

export type DeviceDataApiResponse = DeviceData[];

export type DevicesApiResponse = Record<string, DeviceDataApiResponse>;
