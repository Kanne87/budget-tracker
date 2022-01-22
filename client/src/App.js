import React, { Component, Fragment } from "react";
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
      <Fragment>
        <main>
          <AppNavbar />
          {isAuthenticated ? <Paginator /> : <Splash />}
        </main>
        {/* <footer>Footer</footer> */}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(App);
