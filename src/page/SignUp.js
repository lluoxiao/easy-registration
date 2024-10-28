import React  from 'react';
import { Form, Input, Button, notification } from 'antd';
import {
  UserOutlined,
  MailOutlined, LockOutlined
} from '@ant-design/icons';
const RegistrationForm = () => {
  const [form] = Form.useForm();
 
  const onFinish = (values) => {
    // 这里可以添加注册逻辑，比如发送注册信息到服务器
    console.log('Received values of form: ', values);
    notification.open({
      message: '注册成功',
      description: '注册信息提交成功，可以登录了！',
      type: 'success',
    });
  };
 
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
 
  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
      >
        <Input prefix={<UserOutlined type="user" />} placeholder="用户名" />
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
 
      <Form.Item>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};
 
export default RegistrationForm;