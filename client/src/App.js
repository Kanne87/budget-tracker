import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import BudgetList from './components/BudgetList';
import BudgetModal from './components/BudgetModal';
import { Container } from 'reactstrap'

import './App.css';

class App extends Component {
  render()  {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
          <BudgetModal />
          <BudgetList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
