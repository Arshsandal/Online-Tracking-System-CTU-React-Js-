import React from "react";
import { Card, Col, Row, Statistic, Table } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const Dashboard = () => {
  const busStats = [
    { type: "AC", count: 150 },
    { type: "Non-AC", count: 200 },
    { type: "Electric EV", count: 50 },
    { type: "TATA AC", count: 80 },
    { type: "Corona", count: 60 },
    { type: "TATA Midi", count: 70 },
  ];

  const totalBuses = busStats.reduce((sum, bus) => sum + bus.count, 0);

  const columns = [
    {
      title: "Bus Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Number of Buses",
      dataIndex: "count",
      key: "count",
    },
  ];

  const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#0ea5e9", "#8b5cf6"];

  return (
    <div className="px-12 py-10 bg-gradient-to-tr from-white via-blue-50 to-indigo-100 min-h-screen font-sans">
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-black text-indigo-900 tracking-tight mb-4 drop-shadow-sm">Fleet Intelligence</h1>
        <p className="text-gray-600 text-lg">Real-time insights into your transportation network</p>
      </div>

      <Row gutter={[32, 32]} className="mb-14">
        <Col span={6}>
          <Card className="rounded-2xl bg-white shadow-xl border-0 p-4 hover:scale-[1.02] transition-transform duration-300">
            <Statistic
              title={<span className="text-gray-500 text-base font-semibold">Total Buses</span>}
              value={totalBuses}
              valueStyle={{ color: '#1e40af', fontSize: 30, fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        {busStats.slice(0, 3).map((bus, index) => (
          <Col span={6} key={index}>
            <Card className="rounded-2xl bg-white shadow-xl border-0 p-4 hover:scale-[1.02] transition-transform duration-300">
              <Statistic
                title={<span className="text-gray-500 text-base font-semibold">{bus.type}</span>}
                value={bus.count}
                valueStyle={{ color: '#0f766e', fontSize: 26, fontWeight: '600' }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[32, 32]} className="mb-14">
        {busStats.slice(3).map((bus, index) => (
          <Col span={6} key={index}>
            <Card className="rounded-2xl bg-white shadow-xl border-0 p-4 hover:scale-[1.02] transition-transform duration-300">
              <Statistic
                title={<span className="text-gray-500 text-base font-semibold">{bus.type}</span>}
                value={bus.count}
                valueStyle={{ color: '#9333ea', fontSize: 26, fontWeight: '600' }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[32, 32]} className="mb-14 animate-fade-in-up">
        <Col span={12}>
          <Card
            title={<span className="text-xl font-bold text-gray-700">Bus Type Distribution</span>}
            className="rounded-2xl bg-white shadow-lg border-0 p-4"
            bodyStyle={{ padding: 0 }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={busStats}
                  dataKey="count"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  fill="#8884d8"
                  label
                >
                  {busStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title={<span className="text-xl font-bold text-gray-700">Breakdown by Bus Type</span>}
            className="rounded-2xl bg-white shadow-lg border-0 p-4"
            headStyle={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}
          >
            <div className="mt-2">
              <Table
                columns={columns}
                dataSource={busStats}
                rowKey="type"
                pagination={false}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;