import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { PhoneOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Support = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1000));
      message.success('Your message has been sent!');
    } catch (error) {
      message.error('Failed to send message. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 5%', maxWidth: 800, margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center' }}>🛠 Support</Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 30 }}>
          We're here to help. Fill out the form and we'll get back to you as soon as possible.
        </Text>

        <Card>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input placeholder="example@domain.com" />
            </Form.Item>

            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: 'Please enter your message' }]}
            >
              <TextArea rows={5} placeholder="Describe your issue or question..." />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                icon={<MessageOutlined />}
              >
                Submit Request
              </Button>
            </Form.Item>
          </Form>

          <div style={{ marginTop: 40, borderTop: '1px solid #f0f0f0', paddingTop: 20 }}>
            <Title level={4}>Contact Info</Title>
            <Text>
              <PhoneOutlined /> +91 12345 67890
            </Text>
            <br />
            <Text>
              <MailOutlined /> support@ctutracker.in
            </Text>
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default Support;
