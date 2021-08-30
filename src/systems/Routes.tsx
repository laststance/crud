import { Router } from '@reach/router'
import React, { Suspense, lazy, memo } from 'react'

import Loading from '../elements/Loading'
import About from '../pages/About'
import Index from '../pages/Index'
import Post from '../pages/Post'

const Login = lazy(
  () => import(/* webpackChunkName: "LoginPage" */ '../pages/Login')
)
const Signup = lazy(
  () => import(/* webpackChunkName: "SignupPage" */ '../pages/Signup')
)
const AdminRoutes = lazy(
  () => import(/* webpackChunkName: "AdminRoutes" */ './AdminRoutes')
)
const Dashboard = lazy(
  () => import(/* webpackChunkName: "DashboardPage" */ '../pages/Dashboard')
)
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ '../pages/NotFound')
)
const Create = lazy(
  () => import(/* webpackChunkName: "CreatePage" */ '../pages/Create')
)
const Edit = lazy(
  () => import(/* webpackChunkName: "EditPage" */ '../pages/Edit')
)

const Routes = memo(() => (
  <Suspense fallback={<Loading />}>
    <Router>
      <Index path="/" />
      <Post path="post/:postId" />
      <About path="/about" />
      {process.env.REACT_APP_ENABLE_SIGNUP && <Signup path="signup" />}
      {process.env.REACT_APP_ENABLE_LOGIN && <Login path="login" />}
      <AdminRoutes path="dashboard">
        <Dashboard path="/" />
        <Create path="create" />
        <Edit path="edit/:postId" />
      </AdminRoutes>
      <NotFound default />
    </Router>
  </Suspense>
))

Routes.displayName = 'Routes'

export default Routes
