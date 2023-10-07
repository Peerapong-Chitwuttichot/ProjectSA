
import React, { useState } from 'react';
import { 
  Col, 
  Card, 
  Space,  
  Button,
  Form,
  Input,
  message,
  Divider,
  Row,
  Layout,
  Select,
} from "antd";
import {
  AuditOutlined,
  UserOutlined,
  PieChartOutlined,
  StockOutlined,
  DownOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import "./style.css";
import { Link, useNavigate, } from "react-router-dom";
import { UsersInterface } from "../../../interfaces/IUser";
import { CreateUser } from "../../../services/https";
import type { SizeType } from 'antd/es/config-provider/SizeContext';
const { TextArea } = Input;

function LoginUser() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: UsersInterface) => {
    try {
      const res = await CreateUser(values);
      if (res.status) {
        messageApi.success("บันทึกข้อมูลสำเร็จ");
        
        // setTimeout(() => {
        //   navigate("/register/usernext");
        // }, 2000);
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
    {/* <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
    </Header> */}
      {contextHolder}
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <div className='img-back' style={{display: "grid", placeItems: "center", height: "100vh" }}>
          <Space direction="vertical" size="middle">
            <Card style={{ height: "130px",marginBottom: "-30px",}}>
              <div className="label" style={{ marginLeft: "30px", marginRight: "30px" }}>
                <p className="div">
                  {/* <span className="space2"></span> */}
                  <span className="text-wrapper">เข้าสู่ระบบ</span>
                  <span className="span">&nbsp;</span>
                  <span className="text-wrapper-2">สำหรับผู้หางาน</span>
                  <span className="space"></span>
                  <Button className="custom-button" danger>เข้าสู่ระบบ สำหรับผู้ประกอบการ</Button>
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
                {/* <Divider /> */}
              </div>
            </Card>
            <Form
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
            <Card size="small" style={{ height: "220px"}}>
                <div style={{ marginBottom: "10px", marginTop: "20px", marginLeft: "30px", marginRight: "30px" }}>
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
                  <Divider />
                </div>        
            </Card>
            <Card style={{ height: "85px",marginTop: "-15px",}}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Button htmlType="submit" className='custom-button2' type="primary" size={size}>
                  เข้าสู่ระบบ
                </Button>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="text-wrapper-2">หรือ</span>
                <span>&nbsp;&nbsp;</span>
                <Link to='/register/user' className='custom-button3' type="link">
                  ลงทะเบียน
                </Link>
                <span>&nbsp;&nbsp;</span>
                <span className="text-wrapper-2">ด้วยอีเมล?</span>
              </Col>
            </Card>
            </Form>
          </Space>
        </div>
      </Col>
      
    </>
  );
};


export default LoginUser;

