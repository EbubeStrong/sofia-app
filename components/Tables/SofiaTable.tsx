"use client";

import React, { useMemo } from "react";
import { Table, TablePaginationConfig } from "antd";

//component
import { TableCompContainer } from "./styles";
import { pageItemRender } from "./PageItemRender";
import { ITableProps } from "./table";
import EmptyTable from "./EmptyTable";
import Loader from "../Loader";

// Move static objects outside component to prevent recreation on every render
const EMPTY_LOCALE = {
  emptyText: (
    <EmptyTable
      message="No records found"
      description="Actions on the records appear here"
    />
  ),
};

const LOADING_INDICATOR = (
  <div className="w-full h-auto flex items-center justify-center bg-white">
    <Loader color="#1175c0" size={28} />
  </div>
);

function SofiaTable<T extends object>({
  columns,
  dataSource,
  loading,
  pageTotal,
  currentPage,
  pageSize,
  onRow,
  rowClassName,
  showHeader,
  rowSelection,
  scroll,
  onChange,
  hasPagination = true,
}: Readonly<ITableProps<T>>) {
  // Memoize loading config to prevent recreation
  const tableLoading = useMemo(
    () => ({
      spinning: loading,
      indicator: LOADING_INDICATOR,
    }),
    [loading]
  );

  // Memoize pagination config to prevent recreation
  const pagination = useMemo(
    () => ({
      itemRender: pageItemRender,
      position: ["bottomRight"] as TablePaginationConfig["position"],
      current: currentPage,
      pageSize: pageSize,
      total: pageTotal,
      onChange: onChange,
    }),
    [currentPage, pageSize, pageTotal, onChange]
  );

  return (
    <TableCompContainer>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={tableLoading}
        pagination={hasPagination ? pagination : false}
        onRow={onRow}
        rowClassName={rowClassName}
        size="large"
        locale={EMPTY_LOCALE}
        scroll={scroll}
        showHeader={showHeader}
        rowSelection={rowSelection}
      />
    </TableCompContainer>
  );
}

export default React.memo(SofiaTable) as typeof SofiaTable;
