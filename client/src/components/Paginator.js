import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Home from '../pages/Home';
import { Container } from 'reactstrap'

export class Paginator extends Component {
   render() {
      return (
         <div>
            <div className="containerBar">
            <Paginator />
            <Sidebar />
          
          
            <Container  className='mainPart'>
              
            <Home />
            
            </Container>
            </div>
         </div>
      )
   }
}
const mapStateToProps = (state) => ({
   budget: state.budget
});

export default connect(mapStateToProps)(Paginator);

