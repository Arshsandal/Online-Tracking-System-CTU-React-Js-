import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import {
  SafetyCertificateOutlined,
  AlertOutlined,
  SmileOutlined,
  ExclamationCircleOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const { Title, Paragraph, Text } = Typography;

const safetyTips = [
  {
    icon: <SafetyCertificateOutlined style={{ fontSize: 28, color: '#1890ff' }} />,
    title: 'Follow Safety Guidelines',
    description: 'Always adhere to the safety rules displayed inside the bus and at stops.',
  },
  {
    icon: <AlertOutlined style={{ fontSize: 28, color: '#fa8c16' }} />,
    title: 'Report Suspicious Activity',
    description: 'Report any unusual behavior to the bus driver or authorities immediately.',
  },
  {
    icon: <SmileOutlined style={{ fontSize: 28, color: '#52c41a' }} />,
    title: 'Respect Fellow Passengers',
    description: 'Be courteous, keep noise levels low, and avoid crowding the entryways.',
  },
  {
    icon: <ExclamationCircleOutlined style={{ fontSize: 28, color: '#eb2f96' }} />,
    title: 'Emergency Protocols',
    description: 'Familiarize yourself with emergency exits and procedures for your safety.',
  },
  {
    icon: <EnvironmentOutlined style={{ fontSize: 28, color: '#722ed1' }} />,
    title: 'Safe Boarding & Exiting',
    description: 'Always board and exit the bus at designated stops and wait until it comes to a full stop.',
  },
];

const Safety = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 5%' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
          🛡️ Bus Travel Safety Guidelines
        </Title>

        <Paragraph style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 40px' }}>
          At CTU, your safety is our priority. Please follow these essential safety measures to ensure a safe and pleasant experience for everyone on board.
        </Paragraph>

        <Row gutter={[24, 24]}>
          {safetyTips.map((tip, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                hoverable
                style={{ borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
                bodyStyle={{ padding: 24 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ marginRight: 16 }}>{tip.icon}</div>
                  <Title level={4} style={{ margin: 0 }}>{tip.title}</Title>
                </div>
                <Text>{tip.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default Safety;
