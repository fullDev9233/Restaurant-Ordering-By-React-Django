import React, { Component } from 'react'
import { Route } from 'react-router'
import Login from '../containers/Login'

const AppRoute = ( {component: Component, layout: Layout, ...rest}) => (
    <Route
        {...rest}
        render={props => (
            <Layout>
                <Component {...props} />
            </Layout>
        )}
    />
)

export default AppRoute;