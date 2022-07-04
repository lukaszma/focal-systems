import React from "react";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NotFound } from "./pages";
import { PageHeaderContext } from "./contexts";
import { AppLayout, Loader } from "./features";
import { PageHeaderProps } from "./contexts";
import "./App.css";

const DeviceList = React.lazy(() => import("./pages/device-list/DeviceList"));
const Device = React.lazy(() => import("./pages/device/Device"));

function App() {
  const [pageHeader, setPageHeader] = useState<PageHeaderProps>({
    label: "",
    isBackBtnVisible: false,
  });
  const pageHeaderValue = { pageHeader, setPageHeader };

  return (
    <React.Suspense fallback={<Loader />}>
      <BrowserRouter>
        <PageHeaderContext.Provider value={pageHeaderValue}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route
                path="/"
                element={<Navigate replace to="/device-list" />}
              />
              <Route
                path="/device-list"
                element={<DeviceList />}
                index={false}
              />
              <Route path="/device-list/:deviceId" element={<Device />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </PageHeaderContext.Provider>
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
