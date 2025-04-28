import React from "react";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import CustomHeader from "./components/Header";
import { Outlet } from "react-router-dom";

const { Sider, Content } = Layout;

const App = () => {
  return (
    <>
    <Layout style={{ minHeight: "100vh" }}>
      <Sider >
        <Sidebar />
      </Sider>
      <Layout>
        <CustomHeader />
        <Content style={{ margin: 24, padding: 24, background: "#fff", minHeight: "100%" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
    </>
  );
};

export default App;
