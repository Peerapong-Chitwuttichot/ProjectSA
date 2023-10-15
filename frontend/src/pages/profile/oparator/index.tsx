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
  Avatar,
  Drawer,
} from "antd";
import {
  AuditOutlined,
  UserOutlined,
  PieChartOutlined,
  StockOutlined,
  DownOutlined,
  DownloadOutlined,
  HomeOutlined,
  NotificationOutlined,
  SolutionOutlined,
  LoginOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import "./style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { OparatorsInterface } from "../../../interfaces/IOparator";
import {
  CreateOparator,
  GetOparators,
  UpdateOparator,
} from "../../../services/https";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { Header } from "antd/es/layout/layout";
import { OparatorsIDInterface } from "../../../interfaces/IOparatorid";
const { TextArea } = Input;

function ProfileOparator() {
  // const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [oldpassword, setOldPassword] = useState();
  const [oparator, setOparators] = useState<OparatorsInterface>();
  const [open, setOpen] = useState(false);

  const oparatorID = localStorage.getItem("id"); // รับค่าจาก localStorage

  const onFinish = async (values: OparatorsInterface) => {
    try {
      values.ID = oparator?.ID;
      let res = await UpdateOparator(values);
      if (res.status) {
        messageApi.success("บันทึกข้อมูลสำเร็จ");
        console.log(res);

        setTimeout(() => {
          window.location.href = "/profile/oparator";
        }, 2000);
      } else {
        messageApi.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id");
    window.location.href = "/";
  };

  const getOparatorById = async () => {
    let res = await GetOparators(Number(oparatorID));
    if (res) {
      setOparators(res);
      setOldPassword(res.Oparator_pass);
      // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
      form.setFieldsValue({
        title_name: res.Title_name,
        first_name: res.First_name,
        last_name: res.Last_name,
        oparator_email: res.Oparator_email,
        experience: res.Experience,
        skill: res.Skill,
        address: res.Address,
      });
    }
  };

  useEffect(() => {
    getOparatorById();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [size, setSize] = useState<SizeType>("large"); // default is 'middle'

  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        key="right"
      >
        <div
          className="profilebg"
          style={{ marginRight: "50px", transform: "scale(1.5)" }}
        >
          {/* <img src={person1} alt="" style={style.person} /> */}
          <Avatar
            src="https://xsgames.co/randomoparators/avatar.php?g=pixel"
            style={{ cursor: "pointer" }}
          ></Avatar>

          {/* <div className='nameText'>Anuwat Passaphan</div> */}
        </div>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <Button
          onClick={handleLogout}
          icon={<LoginOutlined />}
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            height: "5vh",
            marginTop: "0px",
          }}
        >
          Logout
        </Button>
      </Drawer>
      <Header style={{ padding: 0, background: "#333333" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", // ชิดด้านขวา
            maxWidth: "99%",
          }}
        >
          <text
            style={{
              fontSize: "50px",
              marginLeft: "30px",
              fontWeight: "bolder",
              color: "white",
            }}
          >
            <span style={{ color: "#ff7518" }}>JO</span>
            <span>B</span>
            <span style={{ color: "#ff7518" }}>JO</span>
            <span>B</span>
          </text>
          {/* <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> */}
          <Button
            icon={<HomeOutlined />}
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              height: "5vh",
              marginTop: "0px",
              marginLeft: "30px",
            }}
          >
            Home
          </Button>
          <div style={{ flex: 1 }}></div>{" "}
          {/* เพิ่มพื้นที่ที่ว่างเพื่อทำให้ปุ่ม Logout ชิดขวา */}
          <Button
            onClick={showDrawer}
            icon={<MenuOutlined />}
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              height: "5vh",
              marginTop: "0px",
              marginLeft: "20px",
            }}
          >
            MENU
          </Button>
        </div>
      </Header>

      {contextHolder}
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <div
          style={{
            padding: 0,
            background: "#E8E8E8",
            display: "grid",
            height: "93.5vh",
          }}
        >
          <Col xs={24} sm={24} md={24} lg={24} xl={20}>
            <Card
              style={{
                height: "100px",
                marginTop: "70px",
                marginLeft: "50px",
                marginRight: "50px",
              }}
            >
              <div
                style={{
                  marginBottom: "10px",
                  marginTop: "10px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                <text
                  style={{
                    fontSize: "22px",
                    fontWeight: "bolder",
                    color: "white",
                    justifySelf: "center",
                    height: "-25px",
                  }}
                >
                  <span style={{ color: "#ff7518" }}>My Profile</span>
                </text>
              </div>
            </Card>
            <Form
              name="basic"
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Card
                style={{
                  overflow: "auto",
                  height: "570px",
                  marginTop: "-10px",
                  marginLeft: "50px",
                  marginRight: "50px",
                }}
              >
                <div
                  style={{
                    marginBottom: "10px",
                    marginTop: "20px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
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
                  <Col xs={24} sm={24} md={24} lg={14} xl={12}>
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
                  <Col xs={24} sm={24} md={24} lg={14} xl={12}>
                    <Form.Item
                      className="form-item-wrapper"
                      label="รหัสผ่านเดิม"
                      name="old_pass"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกรหัสผ่าน!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || oldpassword === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("รหัสผ่านไม่ตรงกับรหัสเดิม!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={14} xl={12}>
                    <Form.Item
                      className="form-item-wrapper"
                      label="รหัสผ่านใหม่"
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
                  <Col xs={24} sm={24} md={24} lg={14} xl={12}>
                    <Form.Item
                      name="confirm"
                      label="ยืนยันรหัสผ่านใหม่"
                      dependencies={["oparator_pass"]}
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
                              getFieldValue("oparator_pass") === value
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
              <Card
                style={{
                  height: "90px",
                  marginTop: "-5px",
                  marginLeft: "50px",
                  marginRight: "50px",
                }}
              >
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
                      บันทึก
                    </Button>
                  </Col>
                </div>
              </Card>
            </Form>
          </Col>
        </div>
      </Col>
    </>
  );
}

export default ProfileOparator;
