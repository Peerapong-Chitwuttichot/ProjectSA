import React from 'react';


function TestNotification() {
  // สร้างข้อมูล submittedData ตามที่คุณต้องการ
 

  return (
    <div>
   
    </div>
  );
}

export default TestNotification;


// import React, { useEffect, useState } from 'react';

// import {
//   LoginOutlined,
//   UserOutlined,
//   NotificationOutlined,
//   SolutionOutlined,
//   HomeOutlined,
//   UserAddOutlined,
//   UserDeleteOutlined,
//   MenuOutlined,

// } from '@ant-design/icons';

// import { Layout, Button, Card, Divider, Drawer, Row } from 'antd';
// import { Form, Space, Table } from 'antd';
// import type { ColumnsType, TableProps } from 'antd/es/table';
// import type { ExpandableConfig } from 'antd/es/table/interface';
// import Modal from 'antd/es/modal/Modal';
// import { DataCandidate, DataWHU } from "../../../interfaces/index";
// import TextArea from 'antd/es/input/TextArea';
// import Avatar from 'antd/es/avatar/avatar';
// import { Link } from 'react-router-dom';
// import { GetCandidate } from '../../../services/https';






// type EditableTableProps = Parameters<typeof Table>[0];
// type ColumnTOCF = Exclude<EditableTableProps['columns'], undefined>;





// const defaultExpandable = { expandedRowRender: (record: DataWHU) => <p>{record.description}</p> };


// const CandidateSelection: React.FC = () => {


//   const [dataCS, setDataCS] = useState<DataWHU[]>([]);

//   const GetDataCS = async () => {
//     let res = await GetCandidate();
//     if (res) {

//       setDataCS(res);
//       console.log(res);
//     }
//   };

//   useEffect(() => {
//     GetDataCS();
//   }, []);

//   const [expandable] = useState<ExpandableConfig<DataWHU> | undefined>(
//     defaultExpandable,
//   );
//   const [tableLayout] = useState();
//   const tableProps: TableProps<DataWHU> = {

//     expandable,
//     tableLayout,
//   };
//   const { Header, Content } = Layout;



//   const columnsCandidate: ColumnsType<DataWHU> = [
//     {
//       title: 'NO',
//       width: '10%',
//       dataIndex: 'ID',
//       align: 'center',
//       key: 'ID',

//     },
//     {
//       title: 'Name',
//       dataIndex: 'UserID',
//       align: 'center',
//       width: '20%',
//       key: 'UserID',
//     },
//     {
//       title: 'Job Post',
//       dataIndex: 'JobpostID',
//       align: 'center',
//       width: '25%',
//       key: 'JobpostID',

//     },
//     {

//       title: 'Detail',
//       align: 'center',
//       width: '30%',

//       render: () => (
//             <Button>
//               Resume
//             </Button>
//       ),
//     },
//     {

//       title: 'Selection',
//       align: 'center',
//       width: '20%',
//       render: (record) => (
//         dataCS.length >= 1 ? (
//           <Space >

//             <Button onClick={() => AddDataToTableCF(record.id)}>
//               <Space>

//                 เพิ่มรายชื่อ
//                 <UserAddOutlined />

//               </Space>
//             </Button>
//           </Space>
//         ) : null
//       ),
//     },
//   ];




//   // กด Add เพื่อย้ายข้อมูลไปอีกตาราง หลังจากย้ายให้ลบข้อมูลตารางเดิม
//   const AddDataToTableCF = (key: React.Key) => {
//     const itemToCF = dataCS.find((item) => item.id === key);
//     if (itemToCF) {
//       const newDataCS = dataCS.filter((item) => item.id !== key);
//       handleAddToConfirm(itemToCF);
//       setDataCS(newDataCS);
//     }
//   };
//   const handleAddToConfirm = (record: DataWHU) => {
//     const newID = count;
//     const newData: DataWHU = {
//       id: newID,
//       UserID: record.UserID,
//       JobpostID:  record.JobpostID,
//       // เพิ่มข้อมูลอื่น ๆ จาก record ตามความต้องการ
//     };
//     setDataSource([...dataSource, newData]);
//     setCount(newID + 1);
//   };


//   const [dataSource, setDataSource] = useState<DataWHU[]>([]);
//   const [count, setCount] = useState(1);




//   // กด Delete เพื่อย้ายข้อมูลไปตารางแรก หลังจากย้ายให้ลบข้อมูลตารางเดิม
//   const MoveDataBackToOriginalTable = (id: React.Key) => {
//     const itemToMoveBack = dataSource.find((item) => item.id === id);
//     if (itemToMoveBack) {
//       const newDataSource = dataSource.filter((item) => item.id !== id);
//       handleAddToOriginalTable(itemToMoveBack);
//       setDataSource(newDataSource);
//     }
//   };
//   const handleAddToOriginalTable = (record: DataWHU) => {
//   const newID = count;
//   const newData: DataWHU = {
//     id: newID,
//     UserID: record.UserID,
//     JobpostID: record.JobpostID,
//     // เพิ่มข้อมูลอื่น ๆ จาก record ตามความต้องการ
//   };
//   setDataCS([...dataCS, newData]);
//   setCount(newID + 1);
// };


  




//   const defaultColumns: (ColumnTOCF[number] & { editable?: boolean; dataIndex: string })[] = [
//     {
//       title: 'NO',
//       dataIndex: 'id',
//       align: 'center',
//       key: 'ID',
//       width: '15%',

//     },
//     {
//       title: 'Name',
//       dataIndex: 'UserID',
//       align: 'center',
//       width: '20%',
//       key: 'UserID',
//     },
//     {
//       title: 'Job Post',
//       dataIndex: 'JobpostID',
//       align: 'center',
//       width: '20%',
//       key: 'JobpostID',

//     },
//     {
//       title: 'Selection',
//       align: 'center',
//       width: '20%',
//       dataIndex: 'id',
//       render: (id: React.Key) => (
//         dataSource.length >= 1 ? (
//           <Button onClick={() => MoveDataBackToOriginalTable(id)}>
//             <Space>
//               นำรายชื่อออก
//               <UserDeleteOutlined />
//             </Space>
//           </Button>
//         ) : null
//       ),
//     },
//   ];








//   const columns = defaultColumns.map((col) => {
//     if (!col.editable) {
//       return col;
//     }
//     return {
//       ...col,
//       onCell: (record: DataCandidate) => ({
//         record,
//         editable: col.editable,
//         dataIndex: col.dataIndex,
//         title: col.title,

//       }),
//     };
//   });



//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [jobInterviewDetail, setJobInterviewDetail] = useState("");
//   const [isPass, setIsPass] = useState(false);
//   const [isReject, setIsReject] = useState(false);
//   const [submittedData, setSubmittedData] = useState<{ detail: string; status: string; }[]>([]);


//   const handleConfirmClick = () => {
//     if (jobInterviewDetail && (isPass || isReject)) {
//       if (dataSource.length >= 1) {
//         const confirmedDataArray = dataSource.map((record) => {
//           return {
//             detail: jobInterviewDetail,
//             status: isPass ? "1" : "0",
//             key: record.id,
//             UserID: record.UserID,  // เปลี่ยนจาก record.name
//             JobPost: record.JobpostID,  // เปลี่ยนจาก record.JobPost
//           };
//         });
        

//         // เพิ่มข้อมูลที่ถูก Confirm ลงในตัวแปรที่เก็บ
//         setSubmittedData([...submittedData, ...confirmedDataArray]);

//         // รีเซ็ตสถานะ Confirm
//         setIsConfirmed(true);
//         showModal();

//         // ลบรายการที่ถูกยืนยันออกจาก dataSource
//         setDataSource([]);
//         setCount(1);
//       } else {
//         console.error("ไม่มีข้อมูลใน dataSource");
//       }
//     } else {
//       // แสดงข้อความเมื่อข้อมูลไม่ครบถ้วน
//     }
//   };


//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//     setIsConfirmed(false);
//     setJobInterviewDetail("");
//     setIsPass(false);
//     setIsReject(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setIsConfirmed(false);
//     setJobInterviewDetail("");
//     setIsPass(false);
//     setIsReject(false);
//   };





//   // ส่วนของ Header and sider
//   const [open, setOpen] = useState(false);
//   const showDrawer = () => {
//     setOpen(true);
//   };

//   const onClose = () => {
//     setOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("id");
//     window.location.href = "/";
//   }




//   return (
    

//     <Layout>

// {/* <button onClick={Get}>
//   fetchData
// </button> */}

//       <Drawer
//         title="JOBJOB MENU"
//         placement="right"
//         closable={false}
//         onClose={onClose}
//         open={open}
//         key="right"
//       >
//         <div >

//           <Row>
//             <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" style={{ cursor: 'pointer', transform: 'scale(1.5)' }}>

//             </Avatar>

//             <Link to={'/customer/Receiver'}>
//               <text style={{
//                 fontSize: '20px', marginLeft: '25px',
//                 fontWeight: 'bolder', color: 'white'
//               }}>
//                 <span style={{ color: '#ff7518' }}>Naruebeth</span>
//                 <span>B</span>
//                 <span style={{ color: '#ff7518' }}>Chitchuai</span>
//               </text>

//             </Link>

//           </Row>

//         </div>

//         <p>
//           <Button icon={<HomeOutlined style={{ marginLeft: '-35px' }} />} style={{
//             fontSize: '18px', fontWeight: 'bold', height: '5vh',
//             marginTop: '5px', width: '100%'
//           }}>
//             Home
//           </Button>
//         </p>

//         <p>
//           <Button icon={<UserOutlined style={{ marginLeft: '-0px' }} />} style={{
//             fontSize: '18px', fontWeight: 'bold', height: '5vh',
//             marginTop: '5px', width: '100%'
//           }}>
//             My Profile
//           </Button>
//         </p>

//         <p>
//           <Button icon={<NotificationOutlined style={{ marginLeft: '-15px' }} />} style={{
//             fontSize: '18px', fontWeight: 'bold', height: '5vh',
//             marginTop: '5px', width: '100%', justifySelf: 'auto'
//           }}>
//             Job Post
//           </Button>
//         </p>

//         <p>
//           <Button icon={<SolutionOutlined />} style={{
//             fontSize: '18px', fontWeight: 'bold', height: '5vh',
//             marginTop: '5px', width: '100%'
//           }}>
//             Candidate
//           </Button>
//         </p>

//         <p>
//           <Button onClick={handleLogout} icon={<LoginOutlined style={{ marginLeft: '-25px' }} />}
//             style={{
//               fontSize: '18px', fontWeight: 'bold', height: '5vh',
//               marginTop: '5px', width: '100%'
//             }}>

//             Logout
//           </Button>
//         </p>


    


//       </Drawer>

//       <Header style={{ padding: 0, background: '#333333' }}>
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between', // ชิดด้านขวา
//           maxWidth: '99%'
//         }}>
//           <text style={{
//             fontSize: '50px', marginLeft: '30px',
//             fontWeight: 'bolder', color: 'white'
//           }}>
//             <span style={{ color: '#ff7518' }}>JO</span>
//             <span>B</span>
//             <span style={{ color: '#ff7518' }}>JO</span>
//             <span>B</span>
//           </text>


//           <div style={{ flex: 1 }}></div> {/* เพิ่มพื้นที่ที่ว่างเพื่อทำให้ปุ่ม Logout ชิดขวา */}

//           <Button onClick={showDrawer} icon={<MenuOutlined />} style={{
//             fontSize: '18px', fontWeight: 'bold', height: '5vh',
//             marginTop: '0px', marginLeft: '20px'
//           }}>
//             MENU
//           </Button>

//         </div>
//       </Header >






//       <Layout>

//         <Content>
//           <Card style={{ padding: 24, minHeight: 280, background: '#d9d9d9' }} >


//             <>
//               <Form
//                 layout="inline"
//                 className="components-table-demo-control-bar"
//                 style={{ marginBottom: 16 }}
//               >

//                 <Divider>Candidate Selection JOBJOB</Divider>

//               </Form>

//               <Table
//                 {...tableProps}

//                 bordered
//                 scroll={{ x: '100%', y: 240 }}

//                 size="middle"
//                 rowKey="id"
//                 columns={columnsCandidate}
//                 dataSource={dataCS}

//                 footer={() => (
//                   <div style={{ textAlign: 'center' }}>Suranaree University of Technology</div>
//                 )}
//               /> 

                

//             </>
//           </Card>

//         </Content>

//       </Layout>

//       <Layout>
//         <div style={{ display: 'grid', gridTemplateColumns: '80% 20%' }}>
//           <Card style={{ width: '100%', background: '#6e6e6e' }}>
//             <Table
//               rowClassName={() => 'editable-row'}
//               bordered
//               size="middle"
//               scroll={{ x: '100%', y: 240 }}
//               dataSource={dataSource}
//               columns={columns as ColumnTOCF}
//             />
//           </Card>

//           <Card style={{ display: 'flex', flexDirection: 'column', background: '#6e6e6e' }}>


//             <Space direction="vertical" style={{ width: '100%' }} size="large">

//               <Button onClick={handleConfirmClick}>
//                 {isConfirmed ? 'Confirmed' : 'Confirm and Sent'}
//               </Button>

//               <div style={{ display: "flex", flexDirection: "row" }}>
//                 <div>

//                   <input
//                     type="radio"
//                     name="status"
//                     checked={isPass}
//                     onChange={() => setIsPass(true)}
//                   />
//                   <label> Pass </label>
//                 </div>

//                 <div>

//                   <input
//                     type="radio"
//                     name="status"
//                     checked={isReject}
//                     onChange={() => setIsReject(true)}
//                   />
//                   <label> Reject </label>
//                 </div>

//               </div>

//               <TextArea
//                 rows={4}
//                 placeholder="Enter Job Interview Detail or Enter Rejection Letter"
//                 value={jobInterviewDetail}
//                 onChange={(e) => setJobInterviewDetail(e.target.value)}
//               />


//               <Modal
//                 title="Confirmation"
//                 visible={isModalVisible}
//                 onOk={handleOk}
//                 onCancel={handleCancel}
//               >
//                 <p>You confirm and send your file successful</p>
//               </Modal>


//             </Space>

//           </Card>

//         </div>
//       </Layout>


//     </Layout>
//   );
// };

// export default CandidateSelection;


