import { differenceInDays } from "date-fns";
import { DeviceList } from "../../Device.types";

const getMaxDate = (dates: Date[]) => new Date(Math.max(...dates.map(Number)));
const getMinDate = (dates: Date[]) => new Date(Math.min(...dates.map(Number)));

const getLastDaysData = (data: DeviceList, daysRange: number): DeviceList => {
  const maxDate = getMaxDate(data.map((item) => item.received_status_at));

  const utclLastDate = new Date(
    maxDate.getFullYear(),
    maxDate.getMonth(),
    maxDate.getDate() - daysRange + 1,
    0,
    0,
    0,
    0
  );

  return data
    .filter(
      (item) => item.received_status_at.getTime() > utclLastDate.getTime()
    )
    .sort(
      (a, b) => b.received_status_at.getTime() - a.received_status_at.getTime()
    );
};

const getIsInsufficientData = (
  daysRange: number,
  data: DeviceList
): boolean => {
  const datesArr = data.map((item) => item.received_status_at);
  const maxDate = getMaxDate(datesArr);
  const minDate = getMinDate(datesArr);

  const daysDiff = differenceInDays(
    new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()),
    new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
  );

  return daysDiff !== daysRange - 1;
};

export const deviceGeneralHelper = {
  getLastDaysData,
  getIsInsufficientData,
};
