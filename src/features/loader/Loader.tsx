import { Spin } from "antd";
import styles from "./Loader.module.css";

export const Loader: React.FC = () => (
  <div className={styles.container}>
    <Spin size="large" />
  </div>
);
