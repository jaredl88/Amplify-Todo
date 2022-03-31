import React from 'react';
import Login from "./Login";
import Register from "./Register";
import { BrowserRouter, Switch, NavLink, Route } from "react-router-dom";
import PublicRoute from "./routes/PublicRoutes.js";


const Home = () => {
    return (
        <>
         <BrowserRouter>
        <div className="Home">
            
   <div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Hello there</h1>
      <p class="prose py-9 text-xl">My name is Jared and this is my first React/Nodejs project.You can add tasks to your task list, view task your list, set tasks as complete, and view a list of your completed tasks. It uses API Gateway, Lambda, and DynamoDB for the back-end. For the front end I used React hosted on Github pages and also on S3.</p>
      <div class="space-x-4">
      <button class="btn btn-primary pr=1.5" onClick={Register}><NavLink exact activeClassName="active" to="/Register">Register</NavLink></button>
      <button class="btn btn-primary" onClick={Login} ><NavLink exact activeClassName="active" to="/Login">Login</NavLink></button>
      </div>
    </div>
  </div>
 
</div>
        </div>
        <div className="content">
        <Switch>
            <PublicRoute exact path="/register" component={Register}/>
            <PublicRoute exact path="/login" component={Login}/>
            </Switch>
          </div>
        </BrowserRouter>
        </>
    );
};

export default Home;