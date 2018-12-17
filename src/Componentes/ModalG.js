import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios'

class ModalG extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            nombre: '',
            apellido: '',
            tipo: 1,
            documento: '',
            email: '',
            id: ''
        }
    }
    
    toggle= ()=> {
        this.setState({
            modal: !this.state.modal
        });
        //this.handleSubmit();
    }

    datos = () =>{
        this.setState({
            nombre: this.props.persona.nombre,
            apellido: this.props.persona.apellido,
            tipo: this.props.persona.tipoDocumento,
            documento: this.props.persona.documento,
            email: this.props.persona.email,
            id: this.props.persona.id
        });
        this.toggle();
    }

    DatosActualizar = () => {
        
       
        axios.put('http://10.0.0.68:81/personas/'+this.state.id+"/",{
                    nombre: this.state.nombre,
                    apellido: this.state.apellido,
                    tipoDocumento: this.state.tipo,
                    documento: this.state.documento,
                    email: this.state.email
                })
                    .then( (response)=> {
                        // handle success
                        if(this.props.actualizar)
                        this.props.actualizar();
                        this.toggle();
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });
      
    }
    validarNumero = (e) => {
        const { value, name } = e.target;
        var expresionRegular = /^\d{0,8}$/;
        if (expresionRegular.test(value)) {
            console.log(value, name);
            // console.log("Error");
            this.setState({
                [name]: value
            });
        }
    }

    validarMail = (e) => {
        const { value, name } = e.target;

        this.setState({
            [name]: value
        });
    }
    
    validarString = (e) => {
        console.log("Entro a valida");
        const { value, name } = e.target;
        var expresionRegular = /^[a-zA-Z]{0,15}$/;
        if (expresionRegular.test(value)) {
            console.log(value, name);
             console.log("Cumplio La expresion Regular");
            this.setState({
                [name]: value
            });
        }
    }

    handleTipo = (e) => {
        const { value, name } = e.target;
        let valor;
        (value == "DNI") ? valor = 1 : (value == "Cédula") ? valor = 2: valor=3; 
        console.log("valor de Tipo documento");
        console.log(valor);
        this.setState({
            tipoA: valor
        });
    }

    render() {
        return (  
          <div>
            {/* <Button color="danger" onClick={()=>this.eliminar(persona.id)}>Eliminar</Button> */}

            <Button color="danger" onClick={this.datos}>Actualizar</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Actualizar Datos</ModalHeader>
              <ModalBody>
                <div className="row mt-4">
                                <div className="card">
                                    <form 
                                        // onSubmit={} 
                                        className="card-body">

                                        {/* {   this.props.columnas.map((col, i) => 
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    name={col}
                                                    className="form-control"
                                                    value={col}
                                                    // onChange={this.validarString}
                                                    placeholder=""
                                                />
                                            </div>
                                        )}  */}

                                        {
                                            this.props.columnas.map((e, i) => {
                                                console.log("PERSONA: ", e.tipo)
                                                return (
                                                    e.tipo === "form" ?
                                                        e.datos.map((v, i) => {
                                                            console.log("datos: ", v.tipo)
                                                            return (
                                                                v.tipo === "select" ?
                                                                    <div key={i} className="form-group">
                                                                        <select
                                                                            name={v.name}
                                                                            className={v.className}
                                                                            // value={}
                                                                            onChange={ this[v.onChange]}
                                                                        >   
                                                                            {v.header.map((e,i)=>
                                                                                <option key={i}>{e}</option>
                                                                            )}
                                                                            {/* <option>DNI</option>
                                                                            <option>Cedula</option>
                                                                            <option>Pasaporte</option> */}
                                                                        </select>
                                                                    </div>:

                                                                    <div className="form-group">
                                                                        <input
                                                                            type={v.type}
                                                                            name={v.name}
                                                                            className={v.className}
                                                                            value={this.state[v.name]}
                                                                            onChange={this[v.onChange]}
                                                                            placeholder={v.header}
                                                                        />
                                                                    </div>
                                                                    
                                                            );

                                                        }

                                                        ) :
                                                        null
                                                    );
                                                }
                                            )
                                        }           
                                    </form>
                                </div>
                            </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={()=>this.DatosActualizar()}>Actualizar</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
      }
}

export default ModalG;