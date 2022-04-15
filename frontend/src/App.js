import React from 'react'
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'

function App(props) {    
  const [name,setName]=React.useState("")
  React.useEffect(() => {
    let login_details = localStorage.getItem("login_details")
    if (!login_details) {
       props.dispatch({
         type: "LOGGED_IN",
         payload: false
       })
    }
    else {
       props.dispatch({
         type: "LOGGED_IN",
         payload: true
       })
       setName(login_details.user.username)
    }
  }, [])
  if (!props.loggedIn) {
    return (
      <>
      <Home dispatch={props.dispatch}/>
      </>
    )
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<h1>Hey </h1>} />
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
