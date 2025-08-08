/** @format */

import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse } from "antd";

const FAQ = ({ response }) => {
  return (
    response?.length > 0 && (
      <div className="FAQ-Container second_con" >
        <Collapse
          bordered={false}
          defaultActiveKey={["0"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          items={response}
        />
      </div>
    )
  );
};

export default FAQ;
