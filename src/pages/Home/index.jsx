import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { getUser } from '../../utils/storage'
import SideBar from '../SideBar'
import Header from '../Header'
import { Layout } from 'antd'
const { Footer, Content } = Layout

export default class index extends Component {
  render() {
    const res = getUser()
    if (res === null) {
      return <Redirect to="/login" />
    }

    return (
      <Layout style={{ height: '100%', flexDirection: 'row' }}>
        <SideBar />
        <Layout>
          <Header />
          <Content>Content</Content>
          <Footer style={{ backgroundColor: 'pink' }}>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}
