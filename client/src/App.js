import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import BudgetModal from "./components/BudgetModal";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar className="appNavbar" />
          <div className="containerBar">
            <Sidebar />

            <Container className="mainPart">
              <Home />
            </Container>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
