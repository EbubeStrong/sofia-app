import React from "react";
import { Timeline } from "antd";

import type { TimelineItemProps } from "antd/es/timeline";

type TSofiaTimelineProps = {
  items: TimelineItemProps[];
};

const SofiaTimeline: React.FC<TSofiaTimelineProps> = ({ items }) => {
  return <Timeline items={items} />;
};

export default SofiaTimeline;
