import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import SchemeContainer from "../components/SchemeContainer";
import {
    Container,
    Button,
    Label,
    Input, ModalBody,
} from "reactstrap";
import {initScheme} from '../store/thunks/schemeThunks'
import connect from "react-redux/es/connect/connect";

class Main extends Component {
    constructor(props) {
        super(props);
        
        this.props.initScheme();
    }
    
    
    renderStatus() {
    
    };
    
    renderParameterInputs() {
        return (
            <div
                style={{
                    display: "flex",
                    width: '100%',
                    flexDirection: 'column',
                    //justifyContent: "flex-start",
                    //alignItems: "flex-start",
                    //height: '20vh',
                    //maxHeight: '1200px'
                    margin: '20px',
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: 'row',
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Label for={"parameterInputVcoBlock1Frequency"} style={{display: "inline-block", whiteSpace: 'nowrap', width: '350px'}}>
                        {'VCO frequency (xGHz - xxGhz)'}
                    </Label>
                    <Button color="primary" onClick={{/*this.parsePressSetModal*/}} style={{display: "inline-block", marginLeft: '25px'}}>Characterize</Button>
                    <Input
                        type={"text"}
                        name={"parameterInputVcoBlock1Frequency"}
                        id={"parameterInputVcoBlock1Frequency"}
                        placeholder={"enter VCO frequency"}
                        //onChange={this.onDataFormModalInputChange}
                        //defaultValue={library}
                    />
                    <Button color="primary" onClick={{/*this.parsePressSetModal*/}}>Set</Button>
                </div>
    
                <div
                    style={{
                        display: "flex",
                        flexDirection: 'row',
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Label for={"parameterInputCompFrequency"} style={{display: "inline-block", whiteSpace: 'nowrap', width: '350px'}}>
                        {'Comparison frequency'}
                    </Label>
                    <Input
                        type={"text"}
                        name={"parameterInputCompFrequency"}
                        id={"parameterInputCompFrequency"}
                        placeholder={"enter comparison frequency"}
                        //onChange={this.onDataFormModalInputChange}
                        //defaultValue={library}
                    />
                    <Button color="primary" onClick={{/*this.parsePressSetModal*/}}>Set</Button>
                </div>
    
                <div
                    style={{
                        display: "flex",
                        flexDirection: 'row',
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Label for={"parameterInputRefFrequency"} style={{display: "inline-block", whiteSpace: 'nowrap', width: '350px'}}>
                        {'Reference frequency'}
                    </Label>
                    <Input
                        type={"text"}
                        name={"parameterInputRefFrequency"}
                        id={"parameterInputRefFrequency"}
                        placeholder={"enter reference frequency"}
                        //onChange={this.onDataFormModalInputChange}
                        //defaultValue={library}
                    />
                    <Button color="primary" onClick={{/*this.parsePressSetModal*/}}>Set</Button>
                </div>
    
                <div
                    style={{
                        display: "flex",
                        flexDirection: 'row',
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Label for={"parameterInputRefFrequencyPower"} style={{display: "inline-block", whiteSpace: 'nowrap', width: '350px'}}>
                        {'Reference frequency power'}
                    </Label>
                    <Input
                        type={"text"}
                        name={"parameterInputRefFrequencyPower"}
                        id={"parameterInputRefFrequencyPower"}
                        placeholder={"enter reference frequency power"}
                        //onChange={this.onDataFormModalInputChange}
                        //defaultValue={library}
                    />
                    <Button color="primary" onClick={{/*this.parsePressSetModal*/}}>Set</Button>
                </div>
            </div>
        )
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
                <SchemeContainer/>
                {this.renderParameterInputs()}
                {this.renderStatus()}
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    scheme: state.schemeStore,
});

export default connect(mapStateToProps, {initScheme})(Main);
