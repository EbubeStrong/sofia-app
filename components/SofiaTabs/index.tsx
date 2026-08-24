import { Tabs } from "antd";

//components
import type { TabsProps } from "antd";
import { TabsContainer } from "./styles";

type TabPosition = "left" | "right" | "top" | "bottom";

interface SofiaTabsProps {
  items: TabsProps["items"];
  onChange?: (key: string) => void;
  activeKey?: string;
  defaultActiveKey?: string;
  tabPosition?: TabPosition;
  tabBarExtraContent?: TabsProps["tabBarExtraContent"];
}

const SofiaTabs: React.FC<SofiaTabsProps> = ({
  items,
  onChange,
  activeKey,
  defaultActiveKey,
  tabPosition,
  tabBarExtraContent,
}) => {
  return (
    <TabsContainer>
      <Tabs
        defaultActiveKey={defaultActiveKey ?? "1"}
        items={items}
        onChange={onChange}
        activeKey={activeKey}
        tabPosition={tabPosition}
        tabBarExtraContent={tabBarExtraContent}
      />
    </TabsContainer>
  );
};

export default SofiaTabs;
