import React from 'react';
import { Form, Input, Button, notification, InputNumber } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import randomString from '../utils/randomString';
import dayjs from 'dayjs';

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate()

  const onFinish = (values) => {
    // 提交注册
    console.log('Received values of form: ', values);
    const newItem = { ...values, userId: randomString(), date: dayjs().format('YYYY-MM-DD HH:mm:ss') }
    const data = localStorage.getItem('USERLIST')
    let result = []
    if (data) result = JSON.parse(data)
    result.unshift(newItem)
    localStorage.setItem('USERLIST', JSON.stringify(result))
    notification.open({
      message: '注册成功',
      description: '注册信息提交成功 ！',
      type: 'success',
      duration: 1
    });
    navigate('/')
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ margin: '100px auto', width: '500px' }}>
      <h1>SignUp Page</h1>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
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
            style={{ width: '500px' }}
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

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined type="lock" />} placeholder="密码" />
        </Form.Item>

        <Form.Item
          name="confirm"
          rules={[
            {
              required: true,
              message: '请确认密码！',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次输入的密码不一致！');
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined type="lock" />} placeholder="确认密码" />
        </Form.Item>

        <Form.Item name="intro">
          <Input.TextArea showCount maxLength={200} placeholder="备注" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;