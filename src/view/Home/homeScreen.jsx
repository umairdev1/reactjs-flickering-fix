import { Card, Space } from "antd";
import React from "react";
import { DingdingOutlined } from "@ant-design/icons";
import { GiButterfly } from "react-icons/gi";
import "./index.css";
const HomeScreen = () => {
  return (
    <div>
      <Space direction="horizontal">
        <Card className="card">
          <DingdingOutlined className="icon" />
          <p>Hotel</p>
        </Card>
        <Card className="card">
          <GiButterfly className="icon" />
          <p>Hotel</p>
        </Card>
      </Space>
    </div>
  );
};

export default HomeScreen;
