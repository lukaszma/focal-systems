import { List, Avatar, Input, Divider } from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { getDeviceList, DevicesApiResponse } from "../../api";
import { PageHeaderContext } from "../../contexts";
import { ListDataItem } from "./DeviceList.types";
import { Link } from "react-router-dom";

const DeviceList: React.FC = () => {
  const { setPageHeader } = useContext(PageHeaderContext);
  const [deviceList, setDeviceList] = useState<DevicesApiResponse>({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setPageHeader({ label: "Device List", isBackBtnVisible: false });
  }, [setPageHeader]);

  useEffect(() => {
    const getInitData = async () => {
      setDeviceList(await getDeviceList());
    };

    getInitData();
  }, []);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setSearchTerm(value);
  };

  const listData: ListDataItem[] = useMemo(
    () =>
      Object.keys(deviceList)
        .filter((deviceKey) => deviceKey.includes(searchTerm))
        .map((deviceKey) => ({
          id: deviceKey,
          title: deviceKey,
        })),
    [deviceList, searchTerm]
  );

  return (
    <div>
      <Input onChange={onSearch} placeholder="Type to search device..." />
      <Divider />
      <List
        itemLayout="horizontal"
        dataSource={listData}
        pagination={{
          pageSize: 10,
        }}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="Barcode-Scanner.webp" />}
              title={<Link to={item.id}>{item.title}</Link>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default DeviceList;
