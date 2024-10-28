import React, { useEffect, useState } from 'react';
import { Table, Space, Modal, Form, Input, notification, InputNumber, Popconfirm } from 'antd';
import { Link } from 'react-router-dom'
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HistoryOutlined,
  LockOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const UserList = () => {
  const [form] = Form.useForm();

  const [data, setData] = useState([{
    name: '小明（示例）',
    phone: 1566666666,
    userId: '0000000000',
    age: 18,
  }])

  const [initialValues, setInitialValues] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  //编辑，替换保存 
  const handleOk = () => {
    const { validateFields } = form
    validateFields().then((v) => {
      const values = { ...v, date: dayjs().format('YYYY-MM-DD HH:mm:ss') }
      const res = data.filter((item) => item.userId != values.userId)
      res.unshift(values)
      setData([...res])
      const USERLIST = JSON.stringify(res)
      localStorage.setItem('USERLIST', USERLIST)
      setInitialValues({})
      notification.open({
        message: '保存成功',
        description: '用户信息修改成功！',
        type: 'success',
        duration: 1
      });
      setIsModalOpen(false);
    }).catch(error => {
      console.log(error)
    })
  };

  const handleCancel = () => {
    setInitialValues({})
    setIsModalOpen(false);
  };

  //数据删除
  const handleDelete = (userId) => {
    const res = data.filter((item) => item.userId != userId)
    setData(res)
    const USERLIST = JSON.stringify(res)
    localStorage.setItem('USERLIST', USERLIST)
    notification.open({
      message: '删除成功',
      type: 'success',
      duration: 1
    });
  };

  useEffect(() => {
    if (Object.keys(initialValues).length != 0) {
      form.setFieldsValue(initialValues)
      showModal()
    }
  }, [initialValues])

  useEffect(() => {
    const value = localStorage.getItem('USERLIST')
    if (value) {
      const res = JSON.parse(value)
      setData(res)
    }
  }, [])

  return (
    <div>
      <Link to='/signUp'>用户注册</Link>
      <h1>UserList Page</h1>
      <Table
        rowKey={'userId'}
        scroll={{ x: 'max-content' }}
        columns={[
          { title: '用户名', dataIndex: 'name' },
          { title: '手机号', dataIndex: 'phone' },
          {
            title: '修改时间',
            dataIndex: 'date',
            // sorter: {
            //   compare: (a, b) => dayjs(a.date).isBefore(dayjs(b.date))
            // },
          },
          {
            title: '操作',
            dataIndex: 'option',
            fixed: 'right',
            render: (_, record) => (
              <Space size="middle">
                <a
                  id='detail'
                  href='#'
                  onClick={() => {
                    setInitialValues({ ...record })
                  }}
                >
                  详情
                </a>

                <Popconfirm
                  title="删除"
                  description="是否确认删除当前用户?"
                  onConfirm={() => handleDelete(record.userId)}
                  okText="确认"
                  cancelText="取消"
                >
                  <a id='delete' href='#'>删除</a>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
        dataSource={data}
      />
      <Modal
        title="用户详情"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        cancelText='取消'
        okText='保存修改'
      >
        <Form
          form={form}
          name="register"
          initialValues={initialValues}
        >
          <Form.Item name='userId' hidden rules={[{ required: false }]}></Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          >
            <Input prefix={<UserOutlined type="user" />} placeholder="用户名" maxLength={20} />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: '请输入手机号!' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号格式不正确！'
              }
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="手机号" />
          </Form.Item>

          <Form.Item name={'age'} rules={[{ type: 'number', min: 10, max: 60, message: '请输入10-60范围内的年龄' }]}>
            <InputNumber
              prefix={<HistoryOutlined />}
              placeholder='年龄'
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: '请输入合法的邮箱地址！',
              },
              {
                required: true,
                message: '请输入邮箱地址！',
              },
            ]}
          >
            <Input prefix={<MailOutlined type="mail" />} placeholder="邮箱" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: false }]}>
            <Input prefix={<LockOutlined type="lock" />} readOnly placeholder="密码" />
          </Form.Item>

          <Form.Item name="intro" rules={[{ required: false }]}>
            <Input.TextArea showCount maxLength={200} placeholder="备注" />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

export default UserList; 