import React, { Component } from "react";
import { Container } from "reactstrap";
import AppNavbar from "./components/AppNavbar";
import Sidebar from "./components/Sidebar";
import Paginator from "./components/Paginator";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import store from "./store";
import { loadUser } from './actions/authActions';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <div className="App">
        <AppNavbar className="appNavbar" />
        <div className="containerBar">
          <Sidebar />
          <Container className="mainPart">

            
            
            <Paginator />
            

          </Container>
        </div>
      </div>
    );
  }
}
export default App; 
