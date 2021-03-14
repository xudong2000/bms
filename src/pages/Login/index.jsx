import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './login.css'
import logo from '../../assets/img/login/logo.png'
import { findUsersByParams } from '../../network/user'
import { saveUser, getUser } from '../../utils/storage'

export default class Login extends Component {
  formRef = React.createRef()

  toRegister = () => {
    this.props.history.replace('/register')
  }

  render() {
    const res = getUser()
    if (res !== null) {
      return <Redirect to="/home" />
    }

    const onFinish = (values) => {
      const { username, password } = values
      findUsersByParams('username', username).then(
        (res) => {
          const { data } = res.data
          if (data.length !== 0) {
            if (data[0].password === password) {
              message.success('登录成功')
              saveUser(data)
              this.formRef.current.resetFields()
              this.props.history.replace('/home')
            } else {
              message.error('密码错误')
            }
          } else {
            message.error('该用户名未注册')
          }
        },
        (err) => {
          console.log('数据查询失败' + err)
        }
      )
    }

    const onReset = () => {
      this.formRef.current.resetFields()
    }

    return (
      <div className="login">
        <div className="login-box">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <Form
            ref={this.formRef}
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入你的用户名' },
                {
                  pattern: /^[A-Za-z]{3,6}$/,
                  message: '用户名必须是长度在3-6个字符之间的英文字母',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入用户名"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入你的密码' },
                { min: 6, max: 12, message: '密码长度必须在6-12个字符之间' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item>
              <Button htmlType="button" onClick={onReset}>
                重置
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
              <Button
                className="toRegister"
                htmlType="button"
                onClick={this.toRegister}
              >
                去注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
