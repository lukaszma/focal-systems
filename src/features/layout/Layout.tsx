import { Layout, PageHeader } from "antd";
import ArrowLeft from "@ant-design/icons/ArrowLeftOutlined";
import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PageHeaderContext } from "../../contexts";
import { Header } from "./components";
import styles from "./Layout.module.css";

export const AppLayout: React.FC = () => {
  const { pageHeader } = useContext(PageHeaderContext);
  const navigate = useNavigate();

  const onBackHandler = () => {
    // Go to the previous page
    navigate(-1);
  };

  return (
    <Layout>
      <Header />
      <Layout.Content style={{ padding: "0 50px" }}>
        <PageHeader
          className="site-page-header"
          onBack={onBackHandler}
          title={pageHeader.label}
          backIcon={pageHeader.isBackBtnVisible && <ArrowLeft />}
        />
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </Layout.Content>
    </Layout>
  );
};
