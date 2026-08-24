"use client";

import { Pagination, PaginationProps } from "antd";

//components
import { pageItemRender } from "../Tables/PageItemRender";
import { TableCompContainer } from "../Tables/styles";

type TPaginationProps = {
  align?: "start" | "center" | "end";
  simple?: boolean;
  className?: string;
  onChange?: PaginationProps["onChange"];
  total?: PaginationProps["total"];
  current?: PaginationProps["current"];
  pageSize?: PaginationProps["pageSize"];
};

const SofiaPagination: React.FC<TPaginationProps> = ({
  align,
  simple,
  className,
  onChange,
  pageSize,
  current,
  total,
}) => {
  return (
    <TableCompContainer className={className}>
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        itemRender={pageItemRender}
        align={align}
        simple={simple}
        onChange={onChange}
      />
    </TableCompContainer>
  );
};

export default SofiaPagination;
