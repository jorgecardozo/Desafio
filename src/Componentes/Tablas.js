import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import axios from 'axios';
import ModalG from './ModalG'
import ModalEliminar from './ModalEliminar';

class Tablas extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            BD: []
        };
       
        axios.get(this.props.url)
            .then((response) => {
                // console.log("Las pido");
                // console.log(response.data.data);

                this.setState({ BD: response.data.data }, () => {
                    // console.log("veo si actualizo en datos");
                    // console.log(this.state.BD);
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    actualizar =(e)=>{

        console.log("LLamo a la funcion Actualizar");
        
        axios.get(this.props.url)
            .then((response)=> {
                // console.log("Las pido");
                // console.log(response.data.data);

                this.setState({ BD: response.data.data }, () => {
                    // console.log("veo si actualizo en datos");
                    // console.log(this.state.BD);
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    
    render() {

        return (

            <div>
                {console.log("Columnas: ", this.props.columnas)}
                <ModalG nombre={"Cargar"} actualizar={this.actualizar} columnas={this.props.columnas} />
                <Table dark>
                    <thead>
                        {/* Aca genero todas las Columnas dependiendo del contenido de la BD */}
                        <tr>
                            {
                                this.props.columnas.map((persona, i) => (
                                        //console.log("persona",persona)
                                        persona.tipo === "tabla" ?
                                            persona.columnas.map((col, i) =>
                                                <td key={i} >{col.header}</td>
                                            ):
                                            null
                                    )
                                )
                            } 
                        </tr>
                    </thead>
                    <tbody >
                        {console.log("dentro de la tabla")}
                        {console.log(this.state.BD)}
                        {this.state.BD.map((persona, i) =>
                            <tr key={i}>
                                {
                                    this.props.columnas.map((e, i) => {
                                        // console.log("PERSONA: ", e.tipo)
                                        return (
                                            e.tipo === "tabla" ?
                                                e.columnas.map((col, i) => {
                                                    // console.log("col: ", col)
                                                    return (
                                                        <td key={i}>{col.format ? col.format(persona[col.field]) : persona[col.field]}</td>
                                                    );

                                                    }
                                                ):
                                                null
                                        );
                                    }
                                    )}
                                {/* {this.props.columnas.map((col,i)=>
                                    <td>{persona[col]}</td>     
                                )}  */}
                                <td> <ModalG nombre={"Actualizar"} persona={persona} actualizar={this.actualizar} columnas={this.props.columnas} /> </td>
                                <td> <ModalEliminar actualizar={this.actualizar} id={persona.id} /></td>
                                {/* <td> <Button color="danger" onClick={()=>this.eliminar(persona.id)}>Atualizar</Button> </td> */}
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }

}

export default Tablas;