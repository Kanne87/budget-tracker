import React, { Component } from "react";
import { Container } from "reactstrap";
import AppNavbar from "./components/AppNavbar";
import { connect } from "react-redux";
import Paginator from "./components/Paginator";
import Splash from "./pages/Splash";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import store from "./store";
import { loadUser } from "./actions/authActions";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="App">
        <AppNavbar />
        <div className="containerBar">
          <Container>{isAuthenticated ? <Paginator /> : <Splash />}</Container>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(App);
