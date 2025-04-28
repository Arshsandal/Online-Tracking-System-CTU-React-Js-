import React, { useState } from 'react';
import { Form, Input, Button, Upload, Avatar, notification, Card, Typography } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import axiosInstance from "../../axiosInstance"; // Adjust path if needed
import baseURL from "../../config"; // Adjust path if needed

const { Title } = Typography;

const EditProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
    });
  };

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('username', values.username);
      formData.append('password', values.password);
      if (values.image && values.image.file) {
        formData.append('image', values.image.file.originFileObj);
      }

      const response = await axiosInstance.put(`${baseURL}api/user/update-profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        openNotificationWithIcon('success', 'Profile Updated', 'Your profile has been updated successfully!');
      } else {
        openNotificationWithIcon('error', 'Update Failed', response.data.message || 'Please try again.');
      }
    } catch (error) {
      console.error('Update Profile Error:', error);
      openNotificationWithIcon('error', 'Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange = (info) => {
    if (info.file.status === 'done' || info.file.status === 'uploading') {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f2f5',
      padding: '20px'
    }}>
      {contextHolder}
      <Card style={{ width: 400, padding: 24, borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Avatar
            size={100}
            icon={<UserOutlined />}
            src={previewImage}
            style={{ marginBottom: 10 }}
          />
          <Title level={3}>Edit Profile</Title>
        </div>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Enter new username" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your new password!' }]}
          >
            <Input.Password placeholder="Enter new password" size="large" />
          </Form.Item>

          <Form.Item
            label="Profile Image"
            name="image"
            valuePropName="file"
          >
            <Upload
              listType="picture"
              maxCount={1}
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleUploadChange}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditProfile;
