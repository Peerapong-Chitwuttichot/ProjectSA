import React, { useEffect, useState } from "react";
import {
  Col,
  Card,
  Button,
  Form,
  Input,
  message,
  Divider,
  Avatar,
  Drawer,
} from "antd";
import { LoginOutlined, MenuOutlined } from "@ant-design/icons";
import "./style.css";
import { OparatorsInterface } from "../../../interfaces/IOparator";
import { GetOparators, UpdateOparator } from "../../../services/https";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

const { TextArea } = Input;

function ProfileOparator() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [oparator, setOparators] = useState<OparatorsInterface>();
  const [open, setOpen] = useState(false);

  const oparatorID = localStorage.getItem("id");

  const onFinish = async (values: OparatorsInterface) => {
    try {
      values.ID = oparator?.ID;
      values.Oparator_email = oparator?.Oparator_email;
      values.Oparator_pass = oparator?.Oparator_pass;
      let res = await UpdateOparator(values);
      if (res.status) {
        messageApi.success("บันทึกข้อมูลสำเร็จ");
        setTimeout(() => {
          window.location.href = "/profile/oparator";
        }, 2000);
      } else {
        messageApi.error("ชื่อบริษัทซ้ำ"); // แจ้งเตือนเมื่อชื่อบริษัทซ้ำกัน
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
      form.setFieldsValue({
        com_name: res.Com_name,
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

  const [size, setSize] = useState<SizeType>("large");

  // เพิ่มฟังก์ชันเพื่อเปิดหน้าแก้ไขข้อมูลส่วนตัว
  const handleEditProfile = () => {
    window.location.href = "/privacy/oparator";
  };

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
          <Avatar
            src="https://xsgames.co/randomoparators/avatar.php?g=pixel"
            style={{ cursor: "pointer" }}
          ></Avatar>
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
            justifyContent: "space-between",
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
          <div style={{ flex: 1 }}></div>
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
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={24}
        xl={24}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%" }}>
          <Card
            style={{
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
                    <Input placeholder="เช่น โชคชัย" />
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
                      rows={5}
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
                  {/* เพิ่มปุ่ม "แก้ไขข้อมูลส่วนตัว" ข้างหลังปุ่ม "บันทึก" */}
                  <Link to="/privacy/oparator">
                    <Button
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        height: "5vh",
                        marginTop: "0px",
                        marginLeft: "20px",
                      }}
                      onClick={handleEditProfile}
                    >
                      แก้ไขข้อมูลส่วนตัว
                    </Button>
                  </Link>
                </Col>
              </div>
            </Card>
          </Form>
        </div>
      </Col>
    </>
  );
}

export default ProfileOparator;
