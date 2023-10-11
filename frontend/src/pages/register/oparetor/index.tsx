import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { OparetorsInterface } from "../../../interfaces/IOparetor";
import { CreateOparetor } from "../../../services/https";
import type { SizeType } from "antd/es/config-provider/SizeContext";
const { TextArea } = Input;

function RegisterOparetor() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const oparetorPassword = form.getFieldValue("op_password");
    const confirmPassword = form.getFieldValue("confirm_password");

    if (oparetorPassword !== confirmPassword) {
      setPasswordError("รหัสผ่านไม่ตรงกัน");
    } else {
      setPasswordError("");
    }
  }, [form]);

  const onFinish = async (values: OparetorsInterface) => {
    try {
      const res = await CreateOparetor(values);
      if (res.status) {
        messageApi.success("บันทึกข้อมูลสำเร็จ");

        setTimeout(() => {
          navigate("/login/oparetor");
        }, 2000);
      } else {
        messageApi.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [size, setSize] = useState<SizeType>("large"); // default is 'middle'

  return (
    <>
      {/* <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
    </Header> */}
      {contextHolder}
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <div
          className="img-back"
          style={{ display: "grid", placeItems: "center", height: "100vh" }}
        >
          <Space direction="vertical" size="middle">
            <Card style={{ height: "130px", marginBottom: "-30px" }}>
              <div
                className="label"
                style={{ marginLeft: "30px", marginRight: "30px" }}
              >
                <p className="div">
                  {/* <span className="space2"></span> */}
                  <span className="text-wrapper">ลงทะเบียน</span>
                  <span className="span">&nbsp;</span>
                  <span className="text-wrapper-2">สำหรับผู้ประกอบการ</span>
                  <span className="space"></span>
                  <Button className="custom-button" danger>
                    ลงทะเบียนสำหรับผู้หางาน
                  </Button>
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
              <Card size="small" style={{ height: "475px", overflow: "auto" }}>
                <div
                  style={{
                    marginBottom: "10px",
                    marginTop: "20px",
                    marginLeft: "30px",
                    marginRight: "30px",
                  }}
                >
                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item
                        className="form-item-wrapper"
                        name="com_name"
                        label="ชื่อบริษัท"
                        rules={[{ required: true, message: "กรุณากรอกชื่อ!" }]}
                      >
                        <Input placeholder="เช่น คนดี" />
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
                          message: "กรุณากรอกอีเมล!",
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
                          message: "กรุณากรอกรหัสผ่าน!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                      name="confirm"
                      label="ยืนยันรหัสผ่าน"
                      dependencies={["op_password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "กรุณายืนยันรหัสผ่าน!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("op_password") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("รหัสผ่านไม่ตรงกัน!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                  <Divider />
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                      className="form-item-wrapper2"
                      name="address"
                      label="ที่อยู่"
                      rules={[{ required: true, message: "กรุณากรอก!" }]}
                    >
                      <TextArea
                        rows={3}
                        placeholder="เช่น 999 หมู่ 9 ถนนคอนกรีต ตำบลสุรนารี อำเภอเมือง จังหวัดนครราชสีมา 99999"
                      />
                    </Form.Item>
                  </Col>
                  
                </div>
              </Card>
              <Card style={{ height: "85px", marginTop: "-15px" }}>
                <div
                  className="label"
                  style={{ marginLeft: "18px", marginRight: "30px" }}
                >
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Button
                      htmlType="submit"
                      className="custom-button2"
                      type="primary"
                      size={size}
                    >
                      ลงทะเบียน
                    </Button>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className="text-wrapper-2">หรือ</span>
                    <span>&nbsp;&nbsp;</span>
                    <Link
                      to="/login/oparetor"
                      className="custom-button3"
                      type="link"
                    >
                      เข้าสู่ระบบ
                    </Link>
                    <span>&nbsp;&nbsp;</span>
                    <span className="text-wrapper-2">ด้วยอีเมล?</span>
                  </Col>
                </div>
              </Card>
            </Form>
          </Space>
        </div>
      </Col>
    </>
  );
}

export default RegisterOparetor;
