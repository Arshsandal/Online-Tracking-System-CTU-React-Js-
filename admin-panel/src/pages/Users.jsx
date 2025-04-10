import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Spin,
  message,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Checkbox,
} from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/auth/getUsers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (values) => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        ...values,
        dob: values.dob.toISOString(),
        confirmPassword: values.confirmPassword || values.password,
      };

      if (isEditMode && selectedUser) {
        await axios.put(`http://localhost:5000/api/auth/updateUser/${selectedUser._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success("User updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/auth/addUser", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success("User added successfully");
      }

      setIsModalVisible(false);
      form.resetFields();
      setIsEditMode(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error adding/updating user:", error);
      message.error(error?.response?.data?.message || "Failed to save user");
    }
  };

  const openEditModal = (user) => {
    setIsEditMode(true);
    setSelectedUser(user);
    setIsModalVisible(true);

    form.setFieldsValue({
      ...user,
      dob: dayjs(user.dob),
      remember: user.remember || false,
    });
  };

  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => openEditModal(record)}>Edit</Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h2>Users</h2>
        <Button
          type="primary"
          onClick={() => {
            setIsEditMode(false);
            setSelectedUser(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Add User
        </Button>
      </div>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table dataSource={users} columns={columns} rowKey="_id" />
      )}

      <Modal
        title={isEditMode ? "Edit User" : "Add New User"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setIsEditMode(false);
          setSelectedUser(null);
        }}
        onOk={() => form.submit()}
        okText={isEditMode ? "Update User" : "Add User"}
      >
        <Form form={form} layout="vertical" onFinish={handleAddUser}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter a username" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[{ required: true, message: "Please select the date of birth" }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input disabled={isEditMode} />
          </Form.Item>

          {!isEditMode && (
            <>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input the password!" },
                  { min: 3, message: "Password must be at least 3 characters" },
                  { max: 100, message: "Password is too long" },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Passwords do not match!"));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </>
          )}

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember Me</Checkbox>
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select placeholder="Select role">
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
