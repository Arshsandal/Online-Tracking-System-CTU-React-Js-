import React from "react";
import { Form, Input, Button, Select, Card, Row, Col, message } from "antd";

const { Option } = Select;

const AddBus = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Bus Added:", values);
    message.success("Bus added successfully!");
    form.resetFields();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 p-10">
      <Card
        title={<span className="text-2xl font-semibold text-indigo-800">Add New Bus</span>}
        className="max-w-3xl mx-auto rounded-2xl shadow-xl border-0"
        bodyStyle={{ padding: 30 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="w-full"
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label={<span className="text-base font-medium text-gray-700">Bus Number</span>}
                name="busNumber"
                rules={[{ required: true, message: "Please enter bus number" }]}
              >
                <Input placeholder="e.g. CH01AB1234" className="rounded-md py-2" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={<span className="text-base font-medium text-gray-700">Route Number</span>}
                name="routeNumber"
                rules={[{ required: true, message: "Please enter route number" }]}
              >
                <Input placeholder="e.g. 38A" className="rounded-md py-2" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={<span className="text-base font-medium text-gray-700">Bus Type</span>}
            name="busType"
            rules={[{ required: true, message: "Please select bus type" }]}
          >
            <Select placeholder="Select a type" className="rounded-md">
              <Option value="AC">AC</Option>
              <Option value="Non-AC">Non-AC</Option>
              <Option value="Electric">Electric EV</Option>
              <Option value="TATA-AC">TATA AC</Option>
              <Option value="Corona">Corona</Option>
              <Option value="TATA-Midi">TATA Midi</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 text-white font-semibold rounded-lg shadow-md"
            >
              Add Bus
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddBus;