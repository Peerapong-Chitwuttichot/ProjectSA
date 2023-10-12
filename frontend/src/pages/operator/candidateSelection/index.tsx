import React, { useContext, useEffect, useRef, useState } from 'react';

import {
  LoginOutlined,
  UserOutlined,
  NotificationOutlined,
  SolutionOutlined,
  HomeOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import type { InputRef } from 'antd';
import { Col, Input, Popconfirm, Row, Upload } from 'antd';
import type { FormInstance } from 'antd/es/form';


import { Layout, Button, theme, Card, Divider} from 'antd';


import type { RadioChangeEvent } from 'antd';
import { Form, Radio, Space, Switch, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { ExpandableConfig, TableRowSelection } from 'antd/es/table/interface';
import Modal from 'antd/es/modal/Modal';

interface EditableRowProps {
  index: number;
}

const EditableContext = React.createContext<FormInstance<any> | null>(null);
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}


const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTOCF = Exclude<EditableTableProps['columns'], undefined>;

interface Item {
  key: number;
  name: string;
  JobPost: string;
  detail: string;
  description: string;
}

interface DataType {
  key: number;
  name: string;
  JobPost: string;
  detail: string;
  description: string;
}


const data: DataType[] = [];
for (let i = 1; i <= 20; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    JobPost: String(`${i}2`),
    detail: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

// Data for push to table Confirm Candidate


const defaultExpandable = { expandedRowRender: (record: DataType) => <p>{record.description}</p> };


const CandidateSelection: React.FC = () => {
  const columnsCandidate: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    align: 'center',
    width: '15%' ,
  },
  {
    title: 'Job Post',
    dataIndex: 'JobPost',
    align: 'center',
    width: '20%' ,
    
  },
  {
    
    title: 'Detail',
    dataIndex: 'detail',
    align: 'center',
    width: '40%' ,
  },

  {
    
    title: 'Selection' ,
    align: 'center',
    width: '15%' ,
    render: () => (
      <Space >
 
        <Button >

          Delete
          <UserDeleteOutlined />

        </Button>

        <Button onClick={handleAdd}>
          <Space>

            Add
            <UserAddOutlined />

          </Space>
        </Button>

      </Space>
    ),
  },
];
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  const [expandable, setExpandable] = useState<ExpandableConfig<DataType> | undefined>(
    defaultExpandable,
  );
  
  const [rowSelection, setRowSelection] = useState<TableRowSelection<DataType> | undefined>({});
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState();
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState<string>();


  const handleTableLayoutChange = (e: RadioChangeEvent) => {
    setTableLayout(e.target.value);
  };
  const handleExpandChange = (enable: boolean) => {
    setExpandable(enable ? defaultExpandable : undefined);
  };
  const handleEllipsisChange = (enable: boolean) => {
    setEllipsis(enable);
  };
  const handleRowSelectionChange = (enable: boolean) => {
    setRowSelection(enable ? {} : undefined);
  };
  const handleYScrollChange = (enable: boolean) => {
    setYScroll(enable);
  };
  const handleXScrollChange = (e: RadioChangeEvent) => {
    setXScroll(e.target.value);
  };
  const handleDataChange = (newHasData: boolean) => {
    setHasData(newHasData);
  };





  const tableProps: TableProps<DataType> = {
  
    expandable,
    tableLayout,
  };

const { Header, Sider, Content} = Layout;



const [dataSource, setDataSource] = useState<DataType[]>([
  {
    key: 0, 
    name: 'Edward King 0',
    JobPost: `2`,
    detail: `New York No. 0 Lake Park`,
    description: `My name is Edward King, I am 32 years old, living in New York No. 0 Lake Park.`,
  },
  // ...
]);
 
const [count, setCount] = useState(2);


const handleDelete = (key: React.Key) => {
  const newData = dataSource.filter((item) => item.key !== key);
  setDataSource(newData);
};



const defaultColumns: (ColumnTOCF[number] & { editable?: boolean; dataIndex: string })[] = [
  {
    title: 'NO',
    dataIndex: 'key',
    align: 'center',
    
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: '40%',
    align: 'center',
  },
  {
    title: 'Job Post',
    dataIndex: 'JobPost',
    align: 'center',
  },
  {
    title: 'Selection',
    align: 'center',
    width: '20%',
    dataIndex: 'key', // เพิ่ม dataIndex เพื่อระบุว่าจะใช้ key ในคอลัมน์นี้
    render: (key: React.Key) => (
      dataSource.length >= 1 ? (
        <Button  onClick ={() => handleDelete(key)}>
          <Space>
            Delete
            <UserDeleteOutlined />
          </Space>
        </Button>
      ) : null
    ),
  },
];


const handleAdd = () => {
  const newData: DataType = {
    key: count,
    name: `Edward King ${count}`,
    JobPost: '32',
    detail: `London, Park Lane no. ${count}`,
    description: '',
  };
  setDataSource([...dataSource, newData]);
  setCount(count + 1);
};


const handleSave = (row: DataType) => {
  const newData = [...dataSource];
  const index = newData.findIndex((item) => row.key === item.key);
  const item = newData[index];
  newData.splice(index, 1, {
    ...item,
    ...row,
  });
  setDataSource(newData);
};

const components = {
  body: {
    row: EditableRow,
    cell: EditableCell,
  },
};

const columns = defaultColumns.map((col) => {
  if (!col.editable) {
    return col;
  }
  return {
    ...col,
    onCell: (record: DataType) => ({
      record,
      editable: col.editable,
      dataIndex: col.dataIndex,
      title: col.title,
      handleSave,
    }),
  };
});




const [isConfirmed, setIsConfirmed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleConfirmClick = () => {
    setIsConfirmed(true);
    showModal();

  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setIsConfirmed(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsConfirmed(false);
  };



  



return (
  
<Layout>
<Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Header style={{ padding: 0, background: '#333333'}}>
          
          <div style={{alignItems: 'center' ,display: 'grid', 
            gridTemplateColumns: 'repeat(6, 1fr)', gridGap: '20px',
            justifySelf: 'center', maxWidth: '99%'}}>

              
            <text style={{fontSize: '50px', marginLeft: '30px',
              fontWeight: 'bolder', color: 'white', justifySelf: 'center',
              height: '-25px'}}> 
              <span style={{color: '#ff7518'}}>JO</span>
              <span>B</span>
              <span style={{color: '#ff7518'}}>JO</span>
              <span>B</span>

            </text>

            <Button icon={<HomeOutlined />} style={{fontSize: '18px',fontWeight: 'bold', height: '5vh',
                            marginTop: '5px'}}> 
              Home 
            </Button>

            <Button icon={<NotificationOutlined />} style={{fontSize: '18px',fontWeight: 'bold', height: '5vh',
                            marginTop: '5px'}}> 
              Job Post 
            </Button>

            <Button icon={<SolutionOutlined />} style={{fontSize: '18px',fontWeight: 'bold', height: '5vh',
                            marginTop: '5px'}}> 
              Candidate 
            </Button>

            <Button icon={<UserOutlined />} style={{fontSize: '18px',fontWeight: 'bold', height: '5vh',
                            marginTop: '5px'}}> 
              My Profile 
 
            </Button>

            <Button icon={<LoginOutlined />} style={{fontSize: '18px',fontWeight: 'bold', height: '5vh',
                            marginTop: '5px'}}> 
              Logout 
            </Button>

          </div>
          
        </Header>
        
      </Space>

<Layout>
    
<Content>
  <Card style={{padding: 24, minHeight: 280, background: '#d9d9d9'}} >

    <>
      <Form
        layout="inline"
        className="components-table-demo-control-bar"
        style={{ marginBottom: 16 }}
      >

        <Divider>Candidate Selection JOBJOB</Divider>

      </Form>
      
      <Table
        {...tableProps}

        bordered
        scroll={{ x: '100%', y: 240 }}

        size="middle"
        
        columns={columnsCandidate}
        dataSource={data}
        
        footer={() => (
          <div style={{ textAlign: 'center' }}>Suranaree University of Technology</div>
        )}
      />
      
    </>
  </Card>

</Content>

</Layout>

      <Layout>
        <div style={{ display: 'grid', gridTemplateColumns: '80% 20%' }}>
          <Card style={{ width: '100%', background: '#6e6e6e' }}>
            <Table
              rowClassName={() => 'editable-row'}
              bordered
              size="middle"
              scroll={{ x: '100%', y: 240 }}
              dataSource={dataSource}
              columns={columns as ColumnTOCF}
            />
          </Card>

          <Card style={{display: 'flex', flexDirection: 'column', background: '#6e6e6e'}}>
            
            
              <Space direction="vertical" style={{ width: '100%'}} size="large">
                
                <Button onClick={handleConfirmClick}> 
                  {isConfirmed ? 'Confirmed' : 'Confirm and Sent'}
                </Button>

                <Modal
                  title="Confirmation"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                    <p>You confirm and send your file successful</p>
                </Modal>

                <Upload 
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="text"
                  maxCount={1}

                  
                >
                  <Button icon={<UploadOutlined />}>JOB Interview</Button>

                </Upload>
                
                
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188 "
                  listType="text"
                  maxCount={1}
                  
                >
                  <Button icon={<UploadOutlined />}>Rejection Letter</Button>
                
                </Upload>

                
              </Space>

          </Card>

        </div>
      </Layout>

    </Layout>
  );
};

export default CandidateSelection;