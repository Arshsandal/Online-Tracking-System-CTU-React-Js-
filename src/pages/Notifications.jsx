import React, { useEffect, useState } from 'react';
import { List, Avatar, Typography, Badge, Card, Spin, message } from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  BellOutlined,
} from '@ant-design/icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const { Title, Text } = Typography;

// Dummy notifications
const dummyNotifications = [
  {
    id: 1,
    title: 'Booking Confirmed',
    description: 'Your booking on Route 01 from ISBT-17 to Mani Majra has been confirmed.',
    type: 'success',
    time: '2 mins ago',
  },
  {
    id: 2,
    title: 'Delay Alert',
    description: 'Route 06 is delayed due to traffic near Tribune Chowk.',
    type: 'warning',
    time: '10 mins ago',
  },
  {
    id: 3,
    title: 'New Route Added',
    description: 'Route 12 from CTU Workshop to Sector 45 is now live!',
    type: 'info',
    time: '1 hour ago',
  },
  {
    id: 4,
    title: 'Booking Completed',
    description: 'Your journey on Route 07 has been completed. Thank you for riding with us.',
    type: 'success',
    time: 'Yesterday',
  },
];

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
    case 'warning':
      return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
    case 'info':
    default:
      return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
  }
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        // Simulate fetch
        await new Promise((res) => setTimeout(res, 800));
        setNotifications(dummyNotifications); // Replace with real API later
      } catch (err) {
        message.error('Failed to load notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 5%' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
          🔔 Notifications
        </Title>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 50 }}>
            <Spin size="large" />
          </div>
        ) : (
          <Card>
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor:
                            item.type === 'success'
                              ? '#f6ffed'
                              : item.type === 'warning'
                              ? '#fffbe6'
                              : '#e6f7ff',
                        }}
                        icon={getIcon(item.type)}
                      />
                    }
                    title={<Text strong>{item.title}</Text>}
                    description={
                      <>
                        <Text>{item.description}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {item.time}
                        </Text>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Notifications;
