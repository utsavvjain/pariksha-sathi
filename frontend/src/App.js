import React from 'react'
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Test from './components/Test';

function App(props) {    
  const [name,setName]=React.useState("")
  React.useEffect(() => {
    let login_details = JSON.parse( localStorage.getItem("login_details"))
    if (!login_details) {      
       props.dispatch({
         type: "LOGGED_IN",
         payload: false
       })
    }
    else {
      let login_details = JSON.parse( localStorage.getItem("login_details"))
      console.log(login_details)
       props.dispatch({
         type: "LOGGED_IN",
         payload: true
       })
       setName(login_details.user.username)
    }
  }, [props.loggedIn])
  if (!props.loggedIn) {
    return (
      <Home dispatch={props.dispatch}/>
    )
  }
  return (
    <BrowserRouter>
    <Navbar dispatch={props.dispatch}/>
      <Routes>
        <Route path="/"  element={<Dashboard name={name}/>} />
        <Route path="/test/:subject"  element={<Test/>} />

      </Routes>
    </BrowserRouter>
  );
}
const stateToPropsMapper = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

export default connect(stateToPropsMapper)(App);
