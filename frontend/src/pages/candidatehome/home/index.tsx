
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
  Table,
  TableProps,
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
  HomeOutlined,
  NotificationOutlined,
  SolutionOutlined,
  FormOutlined,
  CopyOutlined,
  SnippetsOutlined,
  UserDeleteOutlined,
  UserAddOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import "./style.css";
import { Link, useNavigate, } from "react-router-dom";
import { UsersInterface } from "../../../interfaces/IUser";
import { CreateCandidatepost } from "../../../services/https";
import { GetCandidatepost } from "../../../services/https";
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { Header } from 'antd/es/layout/layout';
import { Image } from 'antd';
import { ColumnsType, ExpandableConfig } from 'antd/es/table/interface';
const { TextArea } = Input;



function Candidatehome() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [passwordError, setPasswordError] = useState('');
  const [posts, setPosts] = useState<UsersInterface[]>([]);
  const [deleteId, setDeleteId] = useState<Number>();

  const getPosts = async () => {
    let res = await GetCandidatepost();
    if (res) {
      setPosts(res);
    }
  };




  // const data: DataType[] = [];
  //   for (let i = 1; i <= 20; i++) {
  //     data.push({
  //       ID: i,
  //       Position: 'Position' ,
  //       Salary: `Salary ${i}`, 
  //       Dsecrition: `Description ${i}`,
  //       Matched: `Matched ${i}`,
  //       Address: `Address ${i}`,
  //     });
  //   }
  // const defaultExpandable = { expandedRowRender: (record: DataType) => <p>{record.Dsecrition}</p> };
  // const [expandable, setExpandable] = useState<ExpandableConfig<DataType> | undefined>(
  //     defaultExpandable,
  //   );

  // const [tableLayout, setTableLayout] = useState();
  // const tableProps: TableProps<DataType> = {

  //     expandable,
  //     tableLayout,
  //   };

  const columns: ColumnsType<UsersInterface> = [

    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "หัวข้อประกาศงาน",
      dataIndex: "Matched",
      key: "Matched",
    },
    {
      title: "ตำแหน่งที่ต้องการ",
      dataIndex: "Position",
      key: "position",
    },
    {
      title: "เงินเดือน",
      dataIndex: "Salary",
      key: "salary",
    },
    {
      title: 'รายละเอียด',
      dataIndex: 'Dsecrition',
      key: 'dsecrition',
      render: (text: string) => (
        <div>
          {text.split('\n').map((item, key) => {
            return <div key={key}>{item}</div>;
          })}
        </div>
      ),
    },

    {
      title: "ที่อยู่ทำงาน",
      dataIndex: "Address",
      key: "Address",
    },

  ];



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

  useEffect(() => {
    getPosts();
  }, []);

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
            <Link to='/candidatehome/home' type="link" >

              <Button icon={<HomeOutlined style={{ marginLeft: '-35px' }} />} style={{
                fontSize: '18px', fontWeight: 'bold', height: '5vh',
                marginTop: '5px', width: '100%'
              }}>



                Home

              </Button>
            </Link>

          </p>

          <p>
            <Button icon={<UserOutlined style={{ marginLeft: '-0px' }} />} style={{
              fontSize: '18px', fontWeight: 'bold', height: '5vh',
              marginTop: '5px', width: '100%'
            }}>
              My Profile
            </Button>
          </p>

          <p>
            <Button icon={<NotificationOutlined style={{ marginLeft: '-15px' }} />} style={{
              fontSize: '18px', fontWeight: 'bold', height: '5vh',
              marginTop: '5px', width: '100%', justifySelf: 'auto'
            }}>
              Job Post
            </Button>
          </p>

          <p>
            <Button icon={<SolutionOutlined />} style={{
              fontSize: '18px', fontWeight: 'bold', height: '5vh',
              marginTop: '5px', width: '100%'
            }}>
              Candidate
            </Button>
          </p>

          <p>
            <Button onClick={handleLogout} icon={<LoginOutlined style={{ marginLeft: '-25px' }} />}
              style={{
                fontSize: '18px', fontWeight: 'bold', height: '5vh',
                marginTop: '5px', width: '100%'
              }}>

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
              fontSize: '18px', fontWeight: 'bold', height: '5vh',
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
            <Card style={{ height: "200px", marginBottom: "0px", }}>
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
                          marginLeft: '150px',
                        }}>
                          <FormOutlined style={{ color: 'green ' }} /> {/* คงความเหมือนเดิมของไอคอน */}

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
                        marginLeft: '275px',
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
                        marginLeft: '425px',
                      }}>
                        <SnippetsOutlined style={{ color: 'orange' }} /> {/* คงความเหมือนเดิมของไอคอน */}

                      </Button>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </Col>

                  </Row>

                  <Link to='/candidate/post' className='custom-button3' style={{ position: 'absolute', fontSize: '18px', marginLeft: '125px', color: 'green' }}>
                    โพสต์ประกาศงาน
                  </Link>

                  <Link to='/candidate/post' className='custom-button3' type="link" style={{ position: 'absolute', fontSize: '18px', marginLeft: '570px', color: 'red' }}>
                    รายชื่อผู้สมัคร
                  </Link>

                  <Link to='/candidate/post' className='custom-button3' type="link" style={{ position: 'absolute', fontSize: '18px', marginLeft: '990px', color: 'orange' }}>
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
              <Card style={{ padding: 24, minHeight: 240, background: '#d9d9d9' }} >

                <>
                  <Form
                    layout="inline"
                    className="components-table-demo-control-bar"
                    style={{ marginBottom: 5 }}
                  >



                  </Form>

                  <Table rowKey="ID" columns={columns} dataSource={posts} />

                </>
              </Card>
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

