import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import SchemeContainer from "../components/SchemeContainer";
import {Container, Button} from "reactstrap";

class Main extends Component {
    schemeData = null;
    
    getSchemeData = (schemeData) => {
        console.log('got new scheme data');
        this.schemeData = schemeData;
    };
    
    render() {
        return (
            <Container
                className="Main"
                style={{
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: "center",
                    //height: '20vh',
                    //maxHeight: '1200px'
                }}>
                <SchemeContainer onSchemeDataChanged={this.getSchemeData}/>
                
            </Container>
        );
    }
}

export default Main;
