import React, { Component, lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css'
import './App.css'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/register'))
const Main = lazy(() => import('./pages/Main'))

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Suspense fallback={<h2>loading......</h2>}>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/main" component={Main}></Route>
            <Redirect to="/login" />
          </Switch>
        </Suspense>
      </div>
    )
  }
}
