import { createContext } from "react";
import { PageHeaderContextProps } from "./pageHeaderContext.types";

export const PageHeaderContext = createContext<PageHeaderContextProps>({
  pageHeader: { label: "", isBackBtnVisible: false },
  setPageHeader: () => {},
});
