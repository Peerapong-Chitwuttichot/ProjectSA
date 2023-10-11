import React, { useEffect, useState } from 'react';
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
  Layout,
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
import { OparetorsInterface } from "../../../interfaces/IOparetor";
import { CreateOparetor } from "../../../services/https";
import type { SizeType } from 'antd/es/config-provider/SizeContext';
const { TextArea } = Input;
const { Header, Content, Footer, Sider } = Layout;

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

function RegisterOparetornext() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [formDataPage1, setFormDataPage1] = useState({});
  // const [isNavigated, setIsNavigated] = useState(false);

  // // ตรวจสอบ URL ที่เข้ามา
  // useEffect(() => {
  //   const currentUrl = window.location.pathname;
    
  //   if (currentUrl === "/register/oparetornext") {
  //     setIsNavigated(true);
  //   } else {
  //     setIsNavigated(false);
  //   }
  // }, []);

  // // ถ้าไม่ได้เข้ามาผ่าน navigate ให้นำทางกลับไปที่หน้า RegisterOparetor
  // if (!isNavigated) {
  //   navigate("/register/oparetor");
  //   return null;
  // }

  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'

  return (
    <>
    {/* <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
    </Header> */}
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <div className='img-back' style={{display: "grid", placeItems: "center", height: "100vh" }}>
          <Space direction="vertical" size="middle">
            <Card size="small">
              <div className="label" style={{ marginLeft: "30px", marginRight: "30px" }}>
                <p className="div">
                  {/* <span className="space2"></span> */}
                  <span className="text-wrapper">ลงทะเบียน</span>
                  <span className="span">&nbsp;</span>
                  <span className="text-wrapper-2">สำหรับผู้ประกอบการ</span>
                  <span className="space"></span>
                  <Button className="custom-button" danger>ลงทะเบียนสำหรับผู้หางาน</Button>
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
              {/* <Form
                name="basic"
                layout="vertical"
                onFinish={onFinishPage1}
                autoComplete="off"
              > */}
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
                      name="op_email"
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
                      name="op_password"
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
                  <Divider />

                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Button htmlType="submit" className='custom-button2' type="primary" size={size}>
                      ลงทะเบียน
                    </Button>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className="text-wrapper-2">หรือ</span>
                    <Button className='custom-button3' type="link">
                      เข้าสู่ระบบด้วยอีเมล
                    </Button>
                  </Col>
                </div>

              {/* </Form> */}
            </Card>
          </Space>
        </div>
      </Col>
      
    </>
  );
};



// const data: DataType[] = [];

// export default function index() {
  
// }


export default RegisterOparetornext;
// export default RegisterOparetornext;
