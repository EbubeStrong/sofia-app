import styled from "styled-components";

export const TableCompContainer = styled.div`
  position: relative;
  .ant-table-wrapper .ant-table-thead > tr > th {
    font-weight: 500;
    background: 0 0;
    border-top: none;
    color: #fff;
    font-size: 16px;
  }

  .ant-table-wrapper
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    background-color: transparent;
  }
  .ant-table-wrapper {
    font-size: 16px;
    border: none;
  }
  .ant-table-wrapper .ant-table-thead > tr > th,
  .ant-table-wrapper .ant-table-thead > tr > td {
    background: #fff;
    color: #6b7280;
    font-weight: 500;
    border: none;
    font-size: 14px;
    font-family: var(--font-libre-franklin);
  }

  .ant-table-tbody > tr > td {
    border-top: 1px solid #f4f4f4;
    border-bottom: none;
    color: #111010;
    font-size: 15px;
    font-weight: 500;
    font-family: var(--font-libre-franklin);
  }

  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: none !important;
  }

  .ant-pagination .ant-pagination-item a {
    display: block;
    padding: 0 6px;
    color: #8c8c8c;
  }
  .ant-pagination .ant-pagination-item-active {
    background-color: #1175c0 !important;
    border: 1px solid #d0d5dd;
  }
  .ant-pagination .ant-pagination-item-active a {
    color: #344054;
    color: #fff;
    font-weight: 500;
  }
  a[disabled] {
    color: #8c8c8c;
  }

  .ant-pagination.ant-pagination-simple .ant-pagination-simple-pager {
    color: white;
    background: red !important;
  }

  .ant-pagination.ant-pagination-simple .ant-pagination-simple-pager input {
    color: #344054;
    font-weight: 600;
  }

  .ant-pagination .ant-pagination-item:not(.ant-pagination-item-active):hover {
    transition: all 0.2s;
    background-color: rgba(0, 0, 0, 0.06);
  }

  .ant-pagination .ant-pagination-item {
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 6px;
  }
`;
