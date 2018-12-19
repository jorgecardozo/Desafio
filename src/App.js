import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Tablas from './Componentes/Tablas';
import  datos  from './datos.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      datos: datos.data
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className="App">

       
        <Tablas url={'http://10.0.0.68:81/personas/'} columnas={this.state.datos}/>
        <header className="App-header">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        
      </div>
    );
  }
}

export default App;
