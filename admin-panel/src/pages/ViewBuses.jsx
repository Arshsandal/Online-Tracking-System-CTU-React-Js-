import React, { useState, useEffect } from "react";
import { Table, Card, Button, Space, Input, message } from "antd";

const { Search } = Input;

const ViewBuses = () => {
  const [busData, setBusData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBusData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://ctumobileapi.amnex.com/ListofRoutes/SearchByRoutes_v1?RoutesIDs=6954&lan=en"
        );
        const data = await response.json();

        console.log("API Response:", data); // ✅ For debugging

        if (Array.isArray(data?.Data)) {
          const buses = data.Data.map((item, index) => ({
            key: index.toString(),
            busNumber: item?.BusNo || "N/A",
            routeNumber: item?.RouteNo || "N/A",
            driverName: item?.DriverName || "N/A",
            conductorName: item?.ConductorName || "N/A",
            busType: item?.BusType || "N/A",
          }));

          setBusData(buses);
          setFilteredData(buses);
        } else {
          message.error("Unexpected data format received from API.");
        }
      } catch (error) {
        console.error("Error fetching bus data:", error);
        message.error("Failed to fetch bus data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusData();
  }, []);

  const columns = [
    {
      title: "Bus Number",
      dataIndex: "busNumber",
      key: "busNumber",
      sorter: (a, b) => a.busNumber.localeCompare(b.busNumber),
    },
    {
      title: "Route Number",
      dataIndex: "routeNumber",
      key: "routeNumber",
      sorter: (a, b) => a.routeNumber.localeCompare(b.routeNumber),
    },
    {
      title: "Driver Name",
      dataIndex: "driverName",
      key: "driverName",
    },
    {
      title: "Conductor Name",
      dataIndex: "conductorName",
      key: "conductorName",
    },
    {
      title: "Bus Type",
      dataIndex: "busType",
      key: "busType",
      filters: [
        { text: "AC", value: "AC" },
        { text: "Non-AC", value: "Non-AC" },
        { text: "Electric", value: "Electric" },
      ],
      onFilter: (value, record) => record.busType.includes(value),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">Edit</Button>
          <Button type="link" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const onSearch = (value) => {
    const filtered = busData.filter(
      (bus) =>
        bus.busNumber.toLowerCase().includes(value.toLowerCase()) ||
        bus.routeNumber.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <Card title="View Buses" style={{ width: "100%", margin: 0, padding: 0 }}>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search by Bus or Route Number"
          onSearch={onSearch}
          enterButton
        />
        <Button type="primary">Add New Bus</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />
    </Card>
  );
};

export default ViewBuses;
