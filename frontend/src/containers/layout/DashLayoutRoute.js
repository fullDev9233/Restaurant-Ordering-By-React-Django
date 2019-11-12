import React from 'react';  
import { Route, Redirect } from 'react-router-dom';  
import DashboardLayout from './DashLayout';
  
const DashboardLayoutRoute = ({component: Component, ...rest}) => {  
  return (  
    <Route {...rest} render={matchProps => (
      
      localStorage.getItem("token") ? 
      (      
      <div>
        <DashboardLayout/>
            <Component {...matchProps} />  
        </div> 
        ) : 
        (
          <Redirect
            to={{
              pathname: "/login",
              state : {from: matchProps.location}
            }} /> 
        )

    )} />  
  )  
};  
  
export default DashboardLayoutRoute; 