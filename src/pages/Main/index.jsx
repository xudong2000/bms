import React, { Component, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { getUser } from '../../utils/storage'
import SideBar from '../../components/SideBar'
import Header from '../../components/Header'
import { Layout } from 'antd'
const { Footer, Content } = Layout
const Home = lazy(() => import('../Home'))
const Category = lazy(() => import('../Category'))
const Goods = lazy(() => import('../Goods'))
const User = lazy(() => import('../User'))
const Role = lazy(() => import('../Role'))
const Chart = lazy(() => import('../Chart'))

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
          <Content>
            <Switch>
              <Route path="/home " component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/goods" component={Goods}></Route>
              <Route path="/user " component={User}></Route>
              <Route path="/role " component={Role}></Route>
              <Route path="/chart" component={Chart}></Route>
              {/* <Redirect to="/home" /> */}
            </Switch>
          </Content>
          <Footer style={{ backgroundColor: 'pink' }}>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}
