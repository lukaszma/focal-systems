export interface DeviceDataApiResponse {
  status_id: number;
  battery_level: number;
  received_status_at: string;
}

export type DevicesApiResponse = Record<string, DeviceDataApiResponse[]>;
