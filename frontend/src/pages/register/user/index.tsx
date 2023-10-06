import React, { useState } from 'react';
import { 
  Col, 
  Select, 
  Card, 
  Statistic, 
  Space, 
  Table, 
  Tag, 
  Button,
  Form,
  Input,
  message,
  Divider,
  Row,
} from "antd";
import {
  AuditOutlined,
  UserOutlined,
  PieChartOutlined,
  StockOutlined,
  DownOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import "./style.css";
import { useNavigate, } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { UsersInterface } from "../../../interfaces/IUser";
import { CreateUser } from "../../../services/https";
import type { SizeType } from 'antd/es/config-provider/SizeContext';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

function RegisterUser() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: UsersInterface) => {
    try {
      const res = await CreateUser(values);
      if (res.status) {
        messageApi.success("บันทึกข้อมูลสำเร็จ");
        setTimeout(() => {
          navigate("/customer");
        }, 2000);
      } else {
        messageApi.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'

  return (
    <>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <div style={{backgroundColor: "black", display: "grid", placeItems: "center", height: "100vh" }}>
          <Space direction="vertical" size="middle">
            <Card size="small">
              <div className="label" style={{ marginLeft: "30px", marginRight: "30px" }}>
                <p className="div">
                  {/* <span className="space2"></span> */}
                  <span className="text-wrapper">ลงทะเบียน</span>
                  <span className="span">&nbsp;</span>
                  <span className="text-wrapper-2">สำหรับผู้หางาน</span>
                  <span className="space"></span>
                  <Button className="custom-button" danger>ลงทะเบียน สำหรับผู้ประกอบการ</Button>
                  {/* <span className="space2"></span> */}
                </p>
                {/* <p className="image">
                  <br />
                  <span className="space2"></span>
                  <span className="sp">คำนำหน้า</span>
                  <span className="space3"></span>
                  <span>ชื่อ</span>
                  <span className="space3"></span>
                  <span className="space3"></span>
                  <span className="space3"></span>
                  <span>สกุล</span>
                </p> */}
                
              </div>
              <Divider />
              <Form
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                <div style={{ marginBottom: "10px", marginTop: "35px", marginLeft: "30px", marginRight: "30px" }}>
                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={4}>
                      <Form.Item 
                        className="form-item-wrapper" 
                        name="title_name" 
                        label="คำนำหน้า" 
                        rules={[{ required: true, 
                                  message: 'กรุณากรอก !' }]}>
                        <Input placeholder="เช่น นาย นางสาว" />
                      </Form.Item>
                      {/* <Select 
                        defaultValue="โปรดเลือก"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                          { value: 'นาย', label: 'นาย' },
                          { value: 'นาวสาว', label: 'นางสาว' },
                          { value: 'mr.', label: 'Mr.' },
                          { value: 'mrs.', label: 'Mrs.'},
                        ]}
                      /> */}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={10}>
                      <Form.Item 
                        className="form-item-wrapper" 
                        name="first_name" 
                        label="ชื่อ" 
                        rules={[{ required: true, 
                                  message: 'กรุณากรอก !' }]}>
                        <Input placeholder="เช่น คนดี" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={10}>
                      <Form.Item 
                        className="form-item-wrapper" 
                        name="last_name" 
                        label="นามสกุล" 
                        rules={[{ required: true, 
                                  message: 'กรุณากรอก !' }]}>
                        <Input placeholder="เช่น จัง" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                      className="form-item-wrapper" 
                      label="อีเมล"
                      name="user_email"
                      rules={[
                        {
                          type: "email",
                          message: "รูปแบบอีเมลไม่ถูกต้อง !",
                        },
                        {
                          required: true,
                          message: "กรุณากรอก !",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                      className="form-item-wrapper" 
                      label="รหัสผ่าน"
                      name="user_pass"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอก !",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Button className='custom-button2' type="primary" size={size}>
                      ลงทะเบียน
                    </Button>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className="text-wrapper-2">หรือ</span>
                    <Button className='custom-button3' type="link">
                      เข้าสู่ระบบด้วยอีเมล
                    </Button>
                  </Col>
                </div>

              </Form>
            </Card>
          </Space>
        </div>
      </Col>
      
    </>
  );
};

function RegisterUsernext() {
  return (
    <div>
      <h1>หน้าที่ 2</h1>
      {/* สร้างฟอร์มหน้าที่ 2 ในนี้ */}
    </div>
  );
}

// const data: DataType[] = [];

// export default function index() {
  
// }

export default RegisterUser;
