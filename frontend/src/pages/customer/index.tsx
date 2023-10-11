import React, { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetOparetors } from "../../services/https";
import { OparetorsInterface } from "../../interfaces/IOparetor";
import { Link } from "react-router-dom";

const columns: ColumnsType<OparetorsInterface> = [
  {
    title: "ลำดับ",
    dataIndex: "ID",
    key: "id",
  },
  {
    title: "อีเมล",
    dataIndex: "Email",
    key: "email",
  },
  {
    title: "ชื่อบริษัท",
    dataIndex: "ComName",
    key: "comname",
  },
];

function Customers() {
  const [oparetors, setOparetors] = useState<OparetorsInterface[]>([]);

  const getOparetors = async () => {
    let res = await GetOparetors();
    if (res) {
      setOparetors(res);
    }
  };

  useEffect(() => {
    GetOparetors();
  }, []);

  return (
    <>
      <Row>
        <Col span={12}>
          <h2>จัดการข้อมูลสมาชิก</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Space>
            <Link to="/customer/create">
              <Button type="primary" icon={<PlusOutlined />}>
                สร้างข้อมูล
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <Table rowKey="ID" columns={columns} dataSource={oparetors} />
      </div>
    </>
  );
}

export default Customers;
