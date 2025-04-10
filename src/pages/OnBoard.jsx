import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import {
  WifiOutlined,
  VideoCameraOutlined,
  TeamOutlined,
  SoundOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const { Title, Paragraph, Text } = Typography;

const onboardFeatures = [
  {
    icon: <WifiOutlined style={{ fontSize: 28, color: '#1890ff' }} />,
    title: 'Free Wi-Fi',
    description: 'Stay connected during your ride with complimentary onboard Wi-Fi.',
  },
  {
    icon: <VideoCameraOutlined style={{ fontSize: 28, color: '#fa541c' }} />,
    title: 'CCTV Surveillance',
    description: 'For your safety, all CTU buses are equipped with security cameras.',
  },
  {
    icon: <TeamOutlined style={{ fontSize: 28, color: '#722ed1' }} />,
    title: 'Priority Seating',
    description: 'Seats are reserved for elderly, disabled, and pregnant passengers.',
  },
  {
    icon: <SoundOutlined style={{ fontSize: 28, color: '#faad14' }} />,
    title: 'Next Stop Announcements',
    description: 'Clear audio announcements help you track upcoming stops easily.',
  },
  {
    icon: <SmileOutlined style={{ fontSize: 28, color: '#52c41a' }} />,
    title: 'Comfortable Ride',
    description: 'Enjoy a clean, well-ventilated, and smooth ride across the city.',
  },
];

const OnBoard = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 5%' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
          🚍 Onboard Experience
        </Title>

        <Paragraph style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 40px' }}>
          Discover the features available while you're onboard a CTU bus. We've designed our buses to give you a safe, comfortable, and connected travel experience.
        </Paragraph>

        <Row gutter={[24, 24]}>
          {onboardFeatures.map((feature, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                hoverable
                style={{ borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
                bodyStyle={{ padding: 24 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ marginRight: 16 }}>{feature.icon}</div>
                  <Title level={4} style={{ margin: 0 }}>{feature.title}</Title>
                </div>
                <Text>{feature.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default OnBoard;
