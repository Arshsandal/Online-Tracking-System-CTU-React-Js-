import React, { useState } from 'react';
import { Form, Button, Upload, Avatar, notification, Card, Typography } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import axiosInstance from "../../axiosInstance"; // Adjust path if needed
import baseURL from "../../config";  

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
      // Only append the image if there's one selected
      if (values.image && values.image.file) {
        formData.append('image', values.image.file.originFileObj);
      }

      const response = await axiosInstance.put(`${baseURL}api/auth/update-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        openNotificationWithIcon('success', 'Profile Updated', 'Your profile picture has been updated successfully!');
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
      background: 'linear-gradient(to right, #74ebd5, #9face6)',  // Beautiful gradient background
      padding: '20px 10px',
    }}>
      {contextHolder}
      <Card
        style={{
          width: '100%',
          maxWidth: 420,
          padding: '32px 24px',
          borderRadius: '20px',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
          textAlign: 'center',
          transform: 'scale(1)',
          transition: 'transform 0.3s ease',
        }}
        hoverable
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Avatar
          size={100}
          icon={<UserOutlined />}
          src={previewImage}
          style={{
            marginBottom: '20px',
            border: '5px solid #1890ff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
          }}
        />
        <Title level={3} style={{ color: '#333', marginBottom: '20px' }}>Edit Profile Picture</Title>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
        >
          <Form.Item
            name="image"
            valuePropName="file"
            style={{ marginBottom: '20px' }}
          >
            <Upload
              listType="picture"
              maxCount={1}
              showUploadList={false}
              beforeUpload={() => false} // Prevent auto upload
              onChange={handleUploadChange}
            >
              <Button
                icon={<UploadOutlined />}
                size="large"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  backgroundColor: '#1890ff',
                  color: '#fff',
                  border: 'none',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Upload Profile Image
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              style={{
                padding: '14px',
                borderRadius: '10px',
                fontWeight: 'bold',
                backgroundColor: '#1890ff',
                color: '#fff',
                border: 'none',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#40a9ff'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#1890ff'}
            >
              Update Profile Picture
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditProfile;
