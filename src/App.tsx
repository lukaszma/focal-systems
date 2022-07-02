import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DeviceList, Device, NotFound } from "./pages";
import { PageHeaderContext } from "./contexts";
import { AppLayout } from "./features";
import { PageHeaderProps } from "./contexts";
import "./App.css";

function App() {
  const [pageHeader, setPageHeader] = useState<PageHeaderProps>({
    label: "",
    isBackBtnVisible: false,
  });
  const pageHeaderValue = { pageHeader, setPageHeader };

  return (
    <BrowserRouter>
      <PageHeaderContext.Provider value={pageHeaderValue}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate replace to="/device-list" />} />
            <Route path="/device-list" element={<DeviceList />} index={false} />
            <Route path="/device-list/:deviceId" element={<Device />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </PageHeaderContext.Provider>
    </BrowserRouter>
  );
}

export default App;
