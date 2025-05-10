import React from "react";
import { Layout, Typography, Space } from "antd";

const { Footer } = Layout;
const { Text, Link } = Typography;

export default function Footer() {
  return (
    <Layout style={{ minHeight: "100vh", justifyContent: "flex-end" }}>
      <Footer
        style={{
          textAlign: "center",
          background: "#f0f2f5",
          padding: "20px 50px",
          borderTop: "1px solid #e8e8e8",
        }}
      >
        <Space direction="vertical" size="small">
          <Text type="secondary">
            © {new Date().getFullYear()} Admin Panel. All rights reserved.
          </Text>
          <Space size="middle">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Support</Link>
          </Space>
        </Space>
      </Footer>
    </Layout>
  );
}
  