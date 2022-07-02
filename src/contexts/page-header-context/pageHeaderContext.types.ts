export interface PageHeaderProps {
  label: string;
  isBackBtnVisible: boolean;
}

export interface PageHeaderContextProps {
  pageHeader: PageHeaderProps;
  setPageHeader: React.Dispatch<React.SetStateAction<PageHeaderProps>>;
}
