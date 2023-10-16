import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
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
import {
  GetOparators,
  UpdateOparator,

} from "../../../services/https";

import type { SizeType } from "antd/es/config-provider/SizeContext";
import { Header } from "antd/es/layout/layout";

const { TextArea } = Input;

function ProfileOparator() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [oldPassword, setOldPassword] = useState("");
  const [oparator, setOparators] = useState<OparatorsInterface>();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | undefined>();

  const oparatorID = localStorage.getItem("id");
//   const handleDelete = async () => {
//     try {
//       if (oparatorID) {
//         const response = await DeleteOparator(Number(oparatorID)); // แปลงเป็น Number และตรวจสอบว่าไม่ใช่ null
//         if (response.status) {
//           messageApi.success("ลบข้อมูลเรียบร้อย");
//           window.location.href = "/login/oparator";
//         } else {
//           messageApi.error("เกิดข้อผิดพลาดในการลบข้อมูล");
//         }
//       } else {
//         messageApi.error("ไม่สามารถลบข้อมูลเนื่องจากไม่มี ID");
//       }
//     } catch (error) {
//       console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", error);
//       messageApi.error("เกิดข้อผิดพลาดในการลบข้อมูล");
//     }
//   };
  
  

  const onFinish = async (values: OparatorsInterface) => {
    try {
      values.ID = oparator?.ID;
      values.Com_name = oparator?.Com_name;
      values.Address = oparator?.Address;
      let res = await UpdateOparator(values);
      if (res.status) {
        messageApi.success("บันทึกข้อมูลสำเร็จ");
        setTimeout(() => {
          window.location.href = "/profile/oparator";
        }, 2000);
      } else {
        messageApi.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error("Error saving operator:", error);
      messageApi.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id");
    window.location.href = "/login/oparator";
  };



  const getOparatorById = async () => {
    let res = await GetOparators(Number(oparatorID));
    if (res) {
      setOparators(res);
      setOldPassword(res.Oparator_pass);
      form.setFieldsValue({
        oparator_email: res.Oparator_email,
      });
      setDeleteId(res.ID);
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
        <div className="profilebg" style={{ marginRight: "50px", transform: "scale(1.5)" }}>
          <Avatar
            src="https://xsgames.co/randomoparators/avatar.php?g=pixel"
            style={{ cursor: "pointer" }}
          />
        </div>
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
                  <span style={{ color: "#ff7518" }}>Privacy</span>
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
                            if (!value || oldPassword === value) {
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
                </div>
              </Card>
              <Card
                style={{
                  height: "90px",
                  marginTop: "-180px",
                  marginLeft: "50px",
                  marginRight: "50px",
                }}
              >
                <div className="label" style={{ marginLeft: "18px", marginRight: "30px" }}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Button
                      htmlType="submit"
                      className="custom-button2"
                      type="primary"
                      size={size}
                    >
                      บันทึก
                    </Button>
                    {/* <Button
                      onClick={handleDelete}
                      icon={<DeleteOutlined />}
                      style={{
                        marginLeft: "18px",
                        fontSize: "18px",
                        fontWeight: "bold",
                        height: "5vh",
                        marginTop: "0px",
                      }}
                    >
                      Delete
                    </Button> */}
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
