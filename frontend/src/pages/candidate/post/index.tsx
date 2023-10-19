import React, { useEffect, useState } from 'react';
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
  Drawer,
  Avatar,
} from "antd";
import {
  AuditOutlined,
  UserOutlined,
  PieChartOutlined,
  StockOutlined,
  DownOutlined,
  DownloadOutlined,
  LoginOutlined,
  SolutionOutlined,
  NotificationOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import "./style.css";
import { Link, useNavigate, } from "react-router-dom";
import { CandidateInterface } from "../../../interfaces/ICandidate";
import { CreateCandidatepost } from "../../../services/https";
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { Header } from 'antd/es/layout/layout';
const { TextArea } = Input;

function Candidatepost() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const userPassword = form.getFieldValue('user_pass');
    const confirmPassword = form.getFieldValue('confirm_password');

    if (userPassword !== confirmPassword) {
      setPasswordError('รหัสผ่านไม่ตรงกัน');
    } else {
      setPasswordError('');
    }
  }, [form]);

  const onFinish = async (values: CandidateInterface) => {
    try {
      const res = await CreateCandidatepost(values);
      if (res.status) {
        messageApi.success("บันทึกข้อมูลสำเร็จ");

        setTimeout(() => {
          navigate("/candidatehome/home");
        }, 2000);
      } else {
        messageApi.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'

    // ส่วนของ Header and sider // อยู่นอก return
const [open, setOpen] = useState(false);
const showDrawer = () => {
  setOpen(true);
};

const onClose = () => {
  setOpen(false);
};

const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("id");
  window.location.href = "/";
}


  return (
    <>
      {/* <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
    </Header> */}
      <Layout>
      <Drawer
        title="JOBJOB MENU"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        key="right"
      >
        <div >
          
        <Row>
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" style={{ cursor: 'pointer', transform: 'scale(1.5)' }}>

          </Avatar>
          <text style={{
            fontSize: '20px', marginLeft: '25px',
            fontWeight: 'bolder', color: 'white'
          }}>
            <span style={{ color: '#ff7518' }}>Supachai</span>
            <span>B</span>
            <span style={{ color: '#ff7518' }}>Charoen</span>
          </text>
        </Row>

        </div>

       <p>
       <Link to='/candidatehome/home'  type="link" >
          <Button icon={<HomeOutlined style={{ marginLeft: '-35px'}}/>} style={{fontSize: '18px',fontWeight: 'bold', height: '5vh',
                              marginTop: '5px', width: '100%'}}> 
                Home 
          </Button>
          </Link>
        </p>

        <p>
          <Button icon={<UserOutlined style={{ marginLeft: '-0px'}}/>} style={{fontSize: '18px',fontWeight: 'bold', height: '5vh',
                              marginTop: '5px', width: '100%'}}> 
                My Profile 
          </Button>
        </p>

        <p>
          <Button icon={<NotificationOutlined style={{ marginLeft: '-15px'}}/>} style={{fontSize: '18px',fontWeight: 'bold', height: '5vh',
                              marginTop: '5px', width: '100%', justifySelf: 'auto'}}> 
                Job Post 
          </Button>
        </p>

        <p>
          <Button icon={<SolutionOutlined />} style={{fontSize: '18px',fontWeight: 'bold', height: '5vh',
                              marginTop: '5px', width: '100%'}}> 
                Candidate 
          </Button>
        </p>

        <p>
        <Button onClick={handleLogout} icon={<LoginOutlined style={{ marginLeft: '-25px'}}/>} 
                style={{fontSize: '18px',fontWeight: 'bold', height: '5vh',
                        marginTop: '5px', width: '100%'}}> 

              Logout 
            </Button>
        </p>

        

        

      </Drawer>

      <Header style={{ padding: 0, background: '#333333' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between', // ชิดด้านขวา
          maxWidth: '99%'
        }}>
          <text style={{
            fontSize: '50px', marginLeft: '30px',
            fontWeight: 'bolder', color: 'white'
          }}>
            <span style={{ color: '#ff7518' }}>JO</span>
            <span>B</span>
            <span style={{ color: '#ff7518' }}>JO</span>
            <span>B</span>
          </text>
          

          <div style={{ flex: 1 }}></div> {/* เพิ่มพื้นที่ที่ว่างเพื่อทำให้ปุ่ม Logout ชิดขวา */}

          <Button onClick={showDrawer} icon={<MenuOutlined />} style={{
            fontSize: '18px', fontWeight: 'bold', height: '100%',
            marginTop: '0px', marginLeft: '20px'
          }}>
            MENU
          </Button>

        </div>
      </Header >

      </Layout>
      {contextHolder}
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <div className='img-back' style={{ display: "grid", placeItems: "center", height: "100vh" }}>
          <Space direction="vertical" size="middle">
            <Card style={{ height: "30%", marginBottom: "-5%", placeItems: "center",}}>
            <text style={{ height: "30%", marginLeft: "140px", placeItems: "center",fontSize: '32px',color: '#ff7518'}}>แบบฟอร์มสำหรับโพสต์งาน</text>
              <div className="label" style={{ marginLeft: "300px", marginRight: "300px" }}>
                <p className="div">
                  {/* <span className="space2"></span> */}
                  
                  <span className="span">&nbsp;</span>
                  {/* <span className="text-wrapper-2">สำหรับผู้หางาน</span>
                  <span className="space"></span> */}
                  {/* <Button className="custom-button" danger>ลงทะเบียน สำหรับผู้ประกอบการ</Button> */}
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

              <div style={{ marginBottom: "10px", marginTop: "20px", marginLeft: "30px", marginRight: "30px" }}>

                  {/* <Col  xs={24} sm={24} md={24} lg={24} xl={4}>
                      <Form.Item
                        name="title_name"
                        label="คำนำหน้า" 
                        rules={[{ required: true, 
                                  message: 'กรุณาเลือก!' }]}>
                        <Select placeholder="เลือก"
                          // defaultValue="-เลือก-"
                          style={{ width: 90 }}
                          optionLabelProp="label"
                          // onChange={handleChange}
                          options={[
                            { value: 'นาย', label: 'นาย' },
                            { value: 'นาวสาว', label: 'นางสาว' },
                            { value: 'mr.', label: 'Mr.' },
                            { value: 'mrs.', label: 'Mrs.'},
                          ]}
                        />
                      </Form.Item>
                    </Col> */}

                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                      className="form-item-wrapper"
                      name="topic"
                      label="หัวข้อที่ต้องการ"
                      rules={[{
                        required: true,
                        message: 'กรุณากรอกข้มูลให้ครบถ้วน!'
                      }]}>
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>

                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                      <Form.Item
                        name="address"
                        label="สถานที่ทำงาน"
                        rules={[{
                          required: true,
                          message: 'กรุณาเลือกสถานที่ทำงาน!'
                        }]}>
                        <Select placeholder="เลือกสถานที่ทำงาน"
                          // defaultValue="--เลือกสถานที่ทำงาน--"
                          style={{ width: 250 }}
                          optionLabelProp="label"
                          // onChange={handleChange}
                          options={[
                            { value: 'กรุงเทพมหานคร', label: 'กรุงเทพมหานคร' },
                            { value: 'กาญจนบุรี', label: 'กาญจนบุรี' },
                            { value: 'กาฬสินธุ์', label: 'กาฬสินธุ์' },
                            { value: 'กำแพงเพชร', label: 'กำแพงเพชร' },
                            { value: 'ขอนแก่น', label: 'ขอนแก่น' },
                            { value: 'จันทบุรี', label: 'จันทบุรี' },
                            { value: 'ฉะเชิงเทรา', label: 'ฉะเชิงเทรา' },
                            { value: 'ชลบุรี', label: 'ชลบุรี' },
                            { value: 'ชัยนาท', label: 'ชัยนาท' },
                            { value: 'ชัยภูมิ', label: 'ชัยภูมิ' },
                            { value: 'ชุมพร', label: 'ชุมพร' },
                            { value: 'เชียงราย', label: 'เชียงราย' },
                            { value: 'เชียงใหม่', label: 'เชียงใหม่' },
                            { value: 'ตรัง', label: 'ตรัง' },
                            { value: 'ตราด', label: 'ตราด' },
                            { value: 'ตาก', label: 'ตาก' },
                            { value: 'นครนายก', label: 'นครนายก' },
                            { value: 'นครปฐม', label: 'นครปฐม' },
                            { value: 'นครพนม', label: 'นครพนม' },
                            { value: 'นครราชสีมา', label: 'นครราชสีมา' },
                            { value: 'นครศรีธรรมราช', label: 'นครศรีธรรมราช' },
                            { value: 'นครสวรรค์', label: 'นครสวรรค์' },
                            { value: 'นนทบุรี', label: 'นนทบุรี' },
                            { value: 'นราธิวาส', label: 'นราธิวาส' },
                            { value: 'น่าน', label: 'น่าน' },
                            { value: 'บึงกาฬ', label: 'บึงกาฬ' },
                            { value: 'บุรีรัมย์', label: 'บุรีรัมย์' },
                            { value: 'ปทุมธานี', label: 'ปทุมธานี' },
                            { value: 'ประจวบคีรีขันธ์', label: 'ประจวบคีรีขันธ์' },
                            { value: 'ปราจีนบุรี', label: 'ปราจีนบุรี' },
                            { value: 'ปัตตานี', label: 'ปัตตานี' },
                            { value: 'พระนครศรีอยุธยา', label: 'พระนครศรีอยุธยา' },
                            { value: 'พะเยา', label: 'พะเยา' },
                            { value: 'พังงา', label: 'พังงา' },
                            { value: 'พัทลุง', label: 'พัทลุง' },
                            { value: 'พิจิตร', label: 'พิจิตร' },
                            { value: 'พิษณุโลก', label: 'พิษณุโลก' },
                            { value: 'เพชรบุรี', label: 'เพชรบุรี' },
                            { value: 'เพชรบูรณ์', label: 'เพชรบูรณ์' },
                            { value: 'แพร่', label: 'แพร่' },
                            { value: 'ภูเก็ต', label: 'ภูเก็ต' },
                            { value: 'มหาสารคาม', label: 'มหาสารคาม' },
                            { value: 'มุกดาหาร', label: 'มุกดาหาร' },
                            { value: 'แม่ฮ่องสอน', label: 'แม่ฮ่องสอน' },
                            { value: 'ยโสธร', label: 'ยโสธร' },
                            { value: 'ยะลา', label: 'ยะลา' },
                            { value: 'ร้อยเอ็ด', label: 'ร้อยเอ็ด' },
                            { value: 'ระนอง', label: 'ระนอง' },
                            { value: 'ระยอง', label: 'ระยอง' },
                            { value: 'ราชบุรี', label: 'ราชบุรี' },
                            { value: 'ลพบุรี', label: 'ลพบุรี' },
                            { value: 'ลำปาง', label: 'ลำปาง' },
                            { value: 'ลำพูน', label: 'ลำพูน' },
                            { value: 'เลย', label: 'เลย' },
                            { value: 'ศรีสะเกษ', label: 'ศรีสะเกษ' },
                            { value: 'สกลนคร', label: 'สกลนคร' },
                            { value: 'สงขลา', label: 'สงขลา' },
                            { value: 'สตูล', label: 'สตูล' },
                            { value: 'สมุทรปราการ', label: 'สมุทรปราการ' },
                            { value: 'สมุทรสงคราม', label: 'สมุทรสงคราม' },
                            { value: 'สมุทรสาคร', label: 'สมุทรสาคร' },
                            { value: 'สระบุรี', label: 'สระบุรี' },
                            { value: 'สระแก้ว', label: 'สระแก้ว' },
                            { value: 'สิงห์บุรี', label: 'สิงห์บุรี' },
                            { value: 'สุโขทัย', label: 'สุโขทัย' },
                            { value: 'สุพรรณบุรี', label: 'สุพรรณบุรี' },
                            { value: 'สุราษฎร์ธานี', label: 'สุราษฎร์ธานี' },
                            { value: 'สุรินทร์', label: 'สุรินทร์' },
                            { value: 'หนองคาย', label: 'หนองคาย' },
                            { value: 'หนองบัวลำภู', label: 'หนองบัวลำภู' },
                            { value: 'อ่างทอง', label: 'อ่างทอง' },
                            { value: 'อำนาจเจริญ', label: 'อำนาจเจริญ' },
                            { value: 'อุดรธานี', label: 'อุดรธานี' },
                            { value: 'อุตรดิตถ์', label: 'อุตรดิตถ์' },
                            { value: 'อุทัยธานี', label: 'อุทัยธานี' },
                            { value: 'อุบลราชธานี', label: 'อุบลราชธานี' },

                          ]}

                        />

                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                      <Form.Item
                        name="position"
                        style={{ width: 250}}
                        label="ตำแหน่ง"
                        rules={[{
                          required: true,
                          message: 'กรุณาตำแหน่งงาน!'
                          
                        }]}>
                        <Select placeholder="เลือกตำแหน่งงาน"
                          // defaultValue="--เลือกตำแหน่งงาน--"
                          
                          optionLabelProp="label"
                          // onChange={handleChange}
                          options={[
                            { value: 'ผู้จัดการทั่วไป', label: 'ผู้จัดการทั่วไป' },
                            { value: 'ผู้จัดการ', label: 'ผู้จัดการ' },
                            { value: 'ผู้จัดการสาขา', label: 'ผู้จัดการสาขา' },
                            { value: 'หัวหน้าแผนก', label: 'หัวหน้าแผนก' },
                            { value: 'ผู้จัดการฝ่ายบุคคล', label: 'ผู้จัดการฝ่ายบุคคล' },
                            { value: 'ผู้จัดการฝ่ายการเงิน', label: 'ผู้จัดการฝ่ายการเงิน' },
                            { value: 'ผู้จัดการฝ่ายขาย', label: 'ผู้จัดการฝ่ายขาย' },
                            { value: 'ผู้จัดการฝ่ายโรงงาน', label: 'ผู้จัดการฝ่ายโรงงาน' },
                            { value: 'ผู้จัดการฝ่ายบัญชี', label: 'ผู้จัดการฝ่ายบัญชี' },
                            { value: 'ผู้จัดการฝ่ายจัดซื้อ', label: 'ผู้จัดการฝ่ายจัดซื้อ' },
                            { value: 'ผู้จัดการฝ่ายผลิต', label: 'ผู้จัดการฝ่ายผลิต' },
                            { value: 'ผู้จัดการฝ่ายส่งออก', label: 'ผู้จัดการฝ่ายส่งออก' },
                            { value: 'เลขาผู้บริหาร', label: 'เลขาผู้บริหาร' },
                            { value: 'เลขานุการ', label: 'เลขานุการ' },
                            { value: 'พนังงาน', label: 'พนังงาน' },
                            { value: 'ลูกจ้าง', label: 'ลูกจ้าง' },
                            { value: 'อื่นๆ', label: 'อื่นๆ' },

                          ]}

                        />

                      </Form.Item>
                    </Col>
                  </Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={15}>
                    <Form.Item
                      className="form-item-wrapper2"
                      name="salary"
                      label="เงินเดือนโดยประมาณ"

                      rules={[{
                        required: true,
                        message: 'กรุณากรอกข้มูลให้ครบถ้วน!'
                      }]}>
                      <TextArea rows={1} placeholder="xxxxx-xxxxx" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={24} lg={24} xl={20}>
                    <Form.Item
                      className="form-item-wrapper2"
                      name="dsecrition"
                      label="รายละเอียด"

                      rules={[{
                        required: true,
                        message: 'กรุณากรอกข้มูลให้ครบถ้วน!'
                      }]}>
                      <TextArea rows={4} placeholder="เช่น บ้านเลขที่ อำเภอ รายละเอียดทำงาน" />
                    </Form.Item>
                  </Col>


                  {/* <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
                          message: "กรุณากรอกอีเมล!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col> */}
                  {/* <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                      className="form-item-wrapper" 
                      label="รหัสผ่าน"
                      name="user_pass"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกรหัสผ่าน!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col> */}
                  {/* <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    name="confirm"
                    label="ยืนยันรหัสผ่าน"
                    dependencies={['user_pass']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'กรุณายืนยันรหัสผ่าน!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('user_pass') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('รหัสผ่านไม่ตรงกัน!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  </Col> */}
                  {/* <Divider /> */}
                  {/* <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item 
                      className="form-item-wrapper2" 
                      name="experience" 
                      label="อธิบายประสบการณ์ล่าสุด" 
                      rules={[{ required: true, 
                                  message: 'กรุณากรอก!' }]}>
                      <TextArea rows={3} placeholder="เช่น ผมทำงานมาแล้วทั่วโลก" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item 
                      className="form-item-wrapper2" 
                      name="skill" 
                      label="อธิบายทักษะของตัวเอง" 
                      rules={[{ required: true, 
                                  message: 'กรุณากรอก!' }]}>
                      <TextArea rows={3} placeholder="เช่น ผมเก่งเจ๋ง" />
                    </Form.Item> */}
                  {/* </Col>
                   */}
              </div>
            </Card>
            <Card style={{ height: "85px", marginTop: "-15px", }}>
              <div className="label" style={{ marginLeft: "30px", marginRight: "300px" }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Button htmlType="submit" className='custom-button2' type="primary" size={size}>
                    โพสต์งาน
                  </Button>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    {/* <span className="text-wrapper-2">หรือ</span>
                  <span>&nbsp;&nbsp;</span>
                  <Link to='/candidate/home' className='custom-button3' type="link">
                    เข้าสู่ระบบ
                  </Link> */}
                    {/* <span>&nbsp;&nbsp;</span>
                  <span className="text-wrapper-2">ด้วยอีเมล?</span> */}
                </Col>
              </div>
            </Card>
            </Form>
          </Space>
        </div>
      </Col>

    </>
  );
};


export default Candidatepost;

