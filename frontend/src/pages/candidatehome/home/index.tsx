
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
  LoginOutlined,
  HomeOutlined,
  NotificationOutlined,
  SolutionOutlined,
  FormOutlined,
  CopyOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import "./style.css";
import { Link, useNavigate, } from "react-router-dom";
import { UsersInterface } from "../../../interfaces/IUser";
import { CreateCandidatepost } from "../../../services/https";
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { Header } from 'antd/es/layout/layout';
import { Image } from 'antd';
const { TextArea } = Input;

function Candidatehome() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();


  const onFinish = async (values: UsersInterface) => {
    try {
      const res = await CreateCandidatepost(values);
      if (res.status) {
        messageApi.success("บันทึกข้อมูลสำเร็จ");
        
        // setTimeout(() => {
        //   navigate("/candidate/postnext");
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
    <Layout>
        <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
          <Header style={{ padding: 0, background: '#333333' }}>

            <div style={{
              alignItems: 'center', display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)', gridGap: '20px',
              justifySelf: 'center', maxWidth: '99%'
            }}>



              <text style={{
                fontSize: '50px', marginLeft: '30px',
                fontWeight: 'bolder', color: 'white', justifySelf: 'center',
                height: '-25px'
              }}>
                <span style={{ color: '#ff7518' }}>JO</span>
                <span>B</span>
                <span style={{ color: '#ff7518' }}>JO</span>
                <span>B</span>

              </text>

                  <Button icon={<HomeOutlined />} style={{
                    fontSize: '18px', fontWeight: 'bold', height: '5vh',
                    marginTop: '5px'
                  }}>
                    Home
                  </Button>

              <Button icon={<NotificationOutlined />} style={{
                fontSize: '18px', fontWeight: 'bold', height: '5vh',
                marginTop: '5px'
              }}>
                Job Post
              </Button>

              <Button icon={<SolutionOutlined />} style={{
                fontSize: '18px', fontWeight: 'bold', height: '5vh',
                marginTop: '5px'
              }}>
                Candidate
              </Button>

              <Button icon={<UserOutlined />} style={{
                fontSize: '18px', fontWeight: 'bold', height: '5vh',
                marginTop: '5px'
              }}>
                My Profile

              </Button>

              <Button icon={<LoginOutlined />} style={{
                fontSize: '18px', fontWeight: 'bold', height: '5vh',
                marginTop: '5px'
              }}>
                Logout
              </Button>

            </div>

          </Header>

        </Space>

      </Layout>
      {contextHolder}
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <div className='img-back' style={{display: "grid", placeItems: "center", height: "100vh" }}>
          <Space direction="vertical" size="middle">
            <Card style={{ height: "200px",marginBottom: "0px",}}>
              <div className="label" style={{ marginLeft: "100px", marginRight: "10px" }}>
                <p className="div">
                  {/* <span className="space2"></span> */}
                <Row gutter={[16, 0]}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={5}>
                  <Link to='/candidate/post'>
                  <Button style={{
                  fontSize: '50px', // เพิ่มขนาดของไอคอนเป็น 24px (หรือค่าที่คุณต้องการ)
                  fontWeight: 'bold',
                  height: '14vh',
                  marginTop: '1px',
                  marginLeft: '25px',
                  }}>
                  <FormOutlined  style={{ color: 'green ' }}/> {/* คงความเหมือนเดิมของไอคอน */}
                  
                  </Button>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>  
                  </Link>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={5}>
                  {/* <Link to='/candidate/post'> */}
                  <Button style={{
                  fontSize: '50px', // เพิ่มขนาดของไอคอนเป็น 24px (หรือค่าที่คุณต้องการ)
                  fontWeight: 'bold',
                  height: '14vh',
                  marginTop: '1px',
                  marginLeft: '50px',
                  }}>
                  <CopyOutlined style={{ color: 'red' }} /> {/* คงความเหมือนเดิมของไอคอน */}
                  
                  </Button>
                  {/* </Link> */}
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>              
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={5}>
                  <Button style={{
                  fontSize: '50px', // เพิ่มขนาดของไอคอนเป็น 24px (หรือค่าที่คุณต้องการ)
                  fontWeight: 'bold',
                  height: '14vh',
                  marginTop: '1px',
                  marginLeft: '75px',
                  }}>
                  <SnippetsOutlined style={{ color: 'orange' }}/> {/* คงความเหมือนเดิมของไอคอน */}
                  
                  </Button>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>              
                  </Col>
                  
                </Row>
                  
                  <Link to='/candidate/post' className='custom-button3' type="link" style={{ fontSize: '18px' ,marginLeft: '5px',color: 'green' }} >
                    โพสต์ประกาศงาน
                  </Link>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 
                  <Link to='/candidate/post' className='custom-button3' type="link" style={{ fontSize: '18px' ,marginLeft: 'px',color: 'red' }}>
                    รายชื่อผู้สมัคร
                  </Link>
                  <span>&nbsp;&nbsp;&nbsp;</span> 
                  <Link to='/candidate/post' className='custom-button3' type="link" style={{ fontSize: '18px' ,marginLeft: '5px',color: 'orange' }}>
                    ดูประกาศงานฉบับร่าง
                  </Link>
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
            {/* <Card size="small" style={{ height: "220px"}}>
                <div style={{ marginBottom: "10px", marginTop: "20px", marginLeft: "30px", marginRight: "30px" }}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <span className="text-wrapper-2" style={{ fontSize: '18px' ,marginLeft: '5px',color: 'orange' }}  >โพสต์ประกาศงานของฉัน</span>
                  <span className="text-wrapper-2" style={{ fontSize: '18px' ,marginLeft: '300px',color: 'orange' }}  >ผู้สมัคร</span>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    
                  </Col>
                  <Divider />
                </div>        
            </Card> */}
            {/* <Card style={{ height: "85px",marginTop: "-15px",}}>
              <div className="label" style={{ marginLeft: "18px", marginRight: "30px" }}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Button htmlType="submit" className='custom-button2' type="primary" size={size}>
                    เข้าสู่ระบบ
                  </Button>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="text-wrapper-2">หรือ</span>
                  <span>&nbsp;&nbsp;</span>
                  <Link to='/candidate/post' className='custom-button3' type="link">
                    ลงทะเบียน
                  </Link>
                  <span>&nbsp;&nbsp;</span>
                  <span className="text-wrapper-2">ด้วยอีเมล?</span>
                </Col>
              </div>
              
            </Card> */}
            </Form>
          </Space>
        </div>
      </Col>
      
    </>
  );
};


export default Candidatehome;