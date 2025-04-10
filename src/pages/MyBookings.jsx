import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Tag, Spin, message } from 'antd';
import {
  CalendarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const { Title, Text } = Typography;

const dummyBookings = [
  {
    id: 'BKG001',
    route_number: '7',
    from: 'ISBT 17',
    to: 'WORKSHOP',
    via: [],
    date: '2025-04-11',
    time: '08:00 AM',
    status: 'Confirmed',
  },
  {
    id: 'BKG002',
    route_number: '01',
    from: 'ISBT-17',
    to: 'Mani Majra',
    via: ['Sector 19 market, Railway Station'],
    date: '2025-04-12',
    time: '10:15 AM',
    status: 'Pending',
  },
  {
    id: 'BKG003',
    route_number: '06',
    from: 'New Maloya Colony',
    to: 'ISBT 43',
    via: ['Sector 38 Market, Sector 42 Market'],
    date: '2025-04-13',
    time: '01:30 PM',
    status: 'Completed',
  },
  {
    id: 'BKG004',
    route_number: '01',
    from: 'New Maloya Colony',
    to: 'CTU Workshop',
    via: ['Dadu Majra village'],
    date: '2025-04-15',
    time: '09:45 AM',
    status: 'Confirmed',
  },
  {
    id: 'BKG005',
    route_number: '06',
    from: 'Raipur Kalan',
    to: 'New Maloya Colony',
    via: ['Tribune Chowk, Ramdarbar, Sector 33 Market'],
    date: '2025-04-16',
    time: '04:20 PM',
    status: 'Pending',
  },
];

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        await new Promise((res) => setTimeout(res, 800));
        setBookings(dummyBookings); // Replace with API call in future
      } catch (err) {
        message.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'Completed':
        return 'blue';
      default:
        return 'default';
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 5%' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
          🧾 My Bookings
        </Title>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 50 }}>
            <Spin size="large" />
          </div>
        ) : bookings.length > 0 ? (
          <Row gutter={[24, 24]}>
            {bookings.map((booking) => (
              <Col xs={24} sm={12} lg={8} key={booking.id}>
                <Card
                  hoverable
                  title={
                    <span>
                      🚌 Route <strong>{booking.route_number}</strong>
                    </span>
                  }
                  extra={<Tag color={getStatusColor(booking.status)}>{booking.status}</Tag>}
                  style={{ borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
                >
                  <Text>
                    <EnvironmentOutlined /> From: <strong>{booking.from}</strong>
                  </Text>
                  <br />
                  <Text>
                    <EnvironmentOutlined /> To: <strong>{booking.to}</strong>
                  </Text>
                  <br />
                  <Text>
                    <CalendarOutlined /> Date: {booking.date}
                  </Text>
                  <br />
                  <Text>
                    <ClockCircleOutlined /> Time: {booking.time}
                  </Text>
                  <br />
                  {booking.via.length > 0 && (
                    <Text type="secondary">
                      🛣️ Via: {booking.via.join(', ')}
                    </Text>
                  )}
                  <br />
                  <Text type="secondary">Booking ID: {booking.id}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a' }} />
            <Title level={4} style={{ marginTop: 16 }}>No bookings found.</Title>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyBookings;
