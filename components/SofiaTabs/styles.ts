import styled from "styled-components";

export const TabsContainer = styled.div`
  .ant-tabs-left > .ant-tabs-nav .ant-tabs-ink-bar,
  .ant-tabs-left > div > .ant-tabs-nav .ant-tabs-ink-bar {
    left: 0;
  }
  .ant-tabs .ant-tabs-ink-bar {
    background: #d33b52;
  }
  .ant-tabs .ant-tabs-tab-btn {
    color: #667085;
    font-weight: 600;
    font-size: 16px;
    padding: 0px 16px;
  }
  .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #101010;
  }
  .ant-tabs-left > .ant-tabs-nav .ant-tabs-tab + .ant-tabs-tab,
  .ant-tabs-right > .ant-tabs-nav .ant-tabs-tab + .ant-tabs-tab,
  .ant-tabs-left > div > .ant-tabs-nav .ant-tabs-tab + .ant-tabs-tab,
  .ant-tabs-right > div > .ant-tabs-nav .ant-tabs-tab + .ant-tabs-tab {
    margin: 5px 0 0 0;
  }
  .ant-tabs-left > .ant-tabs-content-holder,
  .ant-tabs-left > div > .ant-tabs-content-holder {
    border-left: none;
    background: #f9fafb;
    border-radius: 10px;
    border: 0.5px solid #eaecf0;
  }
  .ant-tabs-left
    > .ant-tabs-content-holder
    > .ant-tabs-content
    > .ant-tabs-tabpane,
  .ant-tabs-left
    > div
    > .ant-tabs-content-holder
    > .ant-tabs-content
    > .ant-tabs-tabpane {
    padding-left: 0px;
  }
  .ant-tabs .ant-tabs-tab + .ant-tabs-tab {
    margin: 0 0 0 16px;
  }
`;
