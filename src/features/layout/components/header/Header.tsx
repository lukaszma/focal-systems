import { Layout } from "antd";
import styles from "./Header.module.css";

export const Header: React.FC = () => (
  <Layout.Header>
    <img className={styles.appLogo} src="/focal-logo.png" alt="logo" />
  </Layout.Header>
);
