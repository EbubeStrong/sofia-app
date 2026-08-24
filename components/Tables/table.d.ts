import { PaginationProps } from "antd";
import { ColumnsType, GetComponentProps } from "antd/es/table";

export interface ITableProps<T> {
  columns: ColumnsType<T>;
  dataSource: T[];
  loading: boolean;
  pageTotal: number;
  currentPage?: number;
  pageSize?: number;
  onRow?: GetComponentProps<T>;
  rowClassName?: string | RowClassName<T> | undefined;
  showHeader?: boolean;
  rowSelection?: object;
  scroll?: { x: string } | { y: string };
  onChange?: PaginationProps["onChange"];
  hasPagination?: boolean;
}

export interface IActivePage {
  currentPage: number;
  pageSize: number;
}
