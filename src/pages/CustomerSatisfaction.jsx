import React from 'react';
import { Layout, Card, Row, Col, Progress, Rate } from 'antd';
import Navbar from '../components/Navbar';
 
import Copyright from '../components/Copyright';
import Footer from '../components/Footer';

const { Content } = Layout;

const feedbacks = [
  {
    name: "Amit Sharma",
    rating: 5,
    comment: "The buses are always on time and very clean. I'm really satisfied with the service.",
  },
  {
    name: "Riya Patel",
    rating: 4,
    comment: "Booking tickets online is super convenient. Great improvement over the years!",
  },
  {
    name: "Mohit Verma",
    rating: 5,
    comment: "Excellent customer support! They helped me reschedule my ticket smoothly.",
  },
];

const CustomerSatisfaction = () => {
  return (
    <>
      <Navbar />
      <Layout
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(to right bottom, #f2fbd3, #b3e685)',
        }}
      >
  

        <Content style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h1 className="text-5xl font-bold text-green-800 mb-3">Customer Satisfaction</h1>
            <p className="text-lg text-gray-700 opacity-90">
              We take pride in our commitment to providing excellent service. Here's what our customers have to say:
            </p>
          </div>

          {/* Satisfaction Stats */}
          <Row gutter={[24, 24]} justify="center" className="mb-12">
            <Col xs={24} sm={12} md={8}>
              <Card bordered={false} className="text-center shadow-lg rounded-xl">
                <h2 className="text-3xl font-semibold text-green-700 mb-2">4.6 / 5</h2>
                <Rate disabled defaultValue={4.5} allowHalf />
                <p className="mt-2 text-gray-600">Average Rating</p>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card bordered={false} className="text-center shadow-lg rounded-xl">
                <Progress type="circle" percent={92} strokeColor="#52c41a" />
                <p className="mt-4 text-gray-600">Customer Satisfaction Rate</p>
              </Card>
            </Col>
          </Row>

          {/* Testimonials */}
          <h2 className="text-2xl text-green-800 font-semibold mb-6 text-center">What Our Customers Say</h2>
          <Row gutter={[24, 24]}>
            {feedbacks.map((fb, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card
                  title={<span className="font-semibold text-indigo-700">{fb.name}</span>}
                  bordered={false}
                  className="shadow-md bg-white bg-opacity-90 backdrop-blur rounded-xl"
                >
                  <Rate disabled defaultValue={fb.rating} className="mb-2" />
                  <p className="text-gray-700">"{fb.comment}"</p>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="mt-12">
            <Copyright />
          </div>
        </Content>
      </Layout>
      <Footer />
    </>
  );
};

export default CustomerSatisfaction;
