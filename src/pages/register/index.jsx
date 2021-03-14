import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './register.css'
import logo from '../../assets/img/login/logo.png'
import { findUsers, findUsersByParams, addUsers } from '../../network/user'

export default class register extends Component {
  formRef = React.createRef()

  componentDidMount() {
    findUsers().then(
      (res) => {
        const { data } = res.data
        let total = data[data.length - 1].id
        this.setState({ totalNum: total + 1 })
      },
      (err) => {
        console.log('数据查询失败' + err)
      }
    )
  }

  toLogin = () => {
    this.props.history.replace('/login')
    console.log(this.state.totalNum)
  }

  render() {
    const onFinish = (values) => {
      values.id = this.state.totalNum
      findUsersByParams('username', values.username).then(
        (res) => {
          const { data } = res.data
          if (data.length === 0) {
            addUsers(values).then(
              (res) => {
                message.success('注册成功')
                this.formRef.current.resetFields()
              },
              (err) => {
                console.log('数据添加失败' + err)
              }
            )
          } else {
            message.error('该用户名已被注册')
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
      <div className="register">
        <div className="register-box">
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

            <Form.Item
              name="telephone"
              rules={[
                { required: true, message: '请输入你的手机号' },
                { min: 11, max: 11, message: '手机号只能为11位数字' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="tel"
                placeholder="请输入手机号"
              />
            </Form.Item>

            <Form.Item
              name="qqEmail"
              rules={[
                { required: true, message: '请输入你的QQ邮箱' },
                { min: 15, max: 17, message: '请输入正确的QQ邮箱' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="email"
                placeholder="请输入QQ邮箱"
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
                注册
              </Button>
              <Button
                className="toLogin"
                htmlType="button"
                onClick={this.toLogin}
              >
                去登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
