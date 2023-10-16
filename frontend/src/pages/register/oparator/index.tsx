import { useEffect, useState } from 'react';
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

} from "antd";

import "./style.css";
import { Link, useNavigate, } from "react-router-dom";
import { OparatorsInterface } from "../../../interfaces/IOparator";
import { CreateOparator } from "../../../services/https";
import type { SizeType } from 'antd/es/config-provider/SizeContext';
const { TextArea } = Input;

function RegisterOparator() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [, setPasswordError] = useState("");

  useEffect(() => {
    const oparatorPassword = form.getFieldValue("oparator_pass");
    const confirmPassword = form.getFieldValue("confirm_pass");

    if (oparatorPassword !== confirmPassword) {
      setPasswordError("รหัสผ่านไม่ตรงกัน");
    } else {
      setPasswordError("");
    }
  }, [form]);

  const onFinish = async (values: OparatorsInterface) => {
    try {
      const res = await CreateOparator(values);
      if (res.status) {
        messageApi.success("บันทึกข้อมูลสำเร็จ");

        setTimeout(() => {
          navigate("/login/oparator");
        }, 2000);
      } else {
        messageApi.error("อีเมลหรือชื่อบริษัทซ้ำ");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [size] = useState<SizeType>("large"); // default is 'middle'

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
                      name="oparator_email"
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
                      name="oparator_pass"
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
                      dependencies={["oparator_pass"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "กรุณายืนยันรหัสผ่าน!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if ( !value ||getFieldValue("oparator_pass") === value) {
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
                  {/* <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                      name="address"
                      label="ที่อยู่ปัจจุบัน"
                      rules={[
                        { required: true, message: "กรุณาเลือกจังหวัด!" },
                      ]}
                    >
                      <Select
                        placeholder="เลือกจังหวัด"
                        // defaultValue="--เลือกจังหวัด--"
                        style={{ width: 610 }}
                        optionLabelProp="label"
                        // onChange={handleChange}
                        options={[
                          { value: "กรุงเทพมหานคร", label: "กรุงเทพมหานคร" },
                          { value: "กาญจนบุรี", label: "กาญจนบุรี" },
                          { value: "กาฬสินธุ์", label: "กาฬสินธุ์" },
                          { value: "กำแพงเพชร", label: "กำแพงเพชร" },
                          { value: "ขอนแก่น", label: "ขอนแก่น" },
                        ]}
                      />
                    </Form.Item>
                  </Col> */}
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
                      to="/login/oparator"
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

export default RegisterOparator;

