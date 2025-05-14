import React, { useState } from 'react';
import { Button, Upload, Avatar, notification, Card, Typography } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import axiosInstance from "../../axiosInstance";
import baseURL from "../../config";

const { Title } = Typography;

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
    });
  };

  const handleUploadChange = (info) => {
    setImageFile(info);
    if (info.file && info.file.originFileObj) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const handleUpload = async () => {
    if (!imageFile || !imageFile.fileList || imageFile.fileList.length === 0) {
      openNotificationWithIcon('warning', 'No Image Selected', 'Please select an image before updating.');
      return;
    }

    const rawFile = imageFile.fileList[0].originFileObj;
    const formData = new FormData();
    formData.append('image', rawFile);

    setLoading(true);
    try {
      const response = await axiosInstance.put(`${baseURL}api/auth/updateProfile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
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

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #74ebd5, #9face6)',
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
            block
            style={{
              marginBottom: '20px',
              padding: '12px',
              borderRadius: '10px',
              fontWeight: 'bold',
              backgroundColor: '#1890ff',
              color: '#fff',
              border: 'none',
            }}
          >
            Select Profile Picture
          </Button>
        </Upload>

        <Button
          type="primary"
          block
          size="large"
          loading={loading}
          onClick={handleUpload}
          style={{
            padding: '14px',
            borderRadius: '10px',
            fontWeight: 'bold',
            backgroundColor: '#1890ff',
            color: '#fff',
            border: 'none',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#40a9ff'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#1890ff'}
        >
          Upload Profile Picture
        </Button>
      </Card>
    </div>
  );
};

export default EditProfile;
