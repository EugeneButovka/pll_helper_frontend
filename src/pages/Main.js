import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import SchemeContainer from "../components/SchemeContainer";
import {
    Container,
    Button,
    Label,
    Input,
    Row,
    Col
} from "reactstrap";
import {initScheme} from '../store/thunks/schemeThunks'
import connect from "react-redux/es/connect/connect";

class Main extends Component {
    constructor(props) {
        super(props);
        
        this.props.initScheme();
    }
    
    
    renderStatus() {
        return (
            <Container>
                <Row>
                    <Col md={{offset: 4 }}>
                            <b>Current status: </b>
                            {'ready'}
                    </Col>
                </Row>
                
                {/*<Row><Col><br/></Col></Row>*/}
                
                <Row>
                    <Col  xs="6"  md={{offset: 3 }}>
                        <Button color="primary" block size={'sm'} onClick={{/*this.parsePressSetModal*/}}>
                            Bulid model
                        </Button>
                    </Col>
                </Row>
    
                <Row><Col><br/><br/></Col></Row>
                
                <Row>
                    <Col  xs="6" md={{offset: 3 }}>
                        <Button color="primary" block size={'sm'} onClick={{/*this.parsePressSetModal*/}}>
                            Plot characteristics
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    };
    
    renderParameterInputs() {
        const vcoCharacterizationStatus = (this.props.scheme);
        
        return (
            <Container>
                <Row>
                    <Col md={{offset: 5 }}>
                        <b>
                            {'VCO'}
                        </b>
                    </Col>
                </Row>
                
                <Row>
                    <Col xs="9">
                        <p>
                            {'Characterization status: '}
                            <u>{this.props.scheme.vcoCharacterizationStatus}</u>
                        </p>
                    </Col>
                    <Col  xs="3">
                        <Button color="primary" block size={'sm'} onClick={{/*this.parsePressSetModal*/}}>
                            Characterize
                        </Button>
                    </Col>
                </Row>
                
                <Row>
                    <Col xs="12">
                        <p>
                            {'Characterization info: '}
                            <u>{this.props.scheme.vcoCharacterizationInfo ? this.props.scheme.vcoCharacterizationInfo : 'none'}</u>
                        </p>
                    </Col>
                </Row>
                
                <Row>
                    <Col xs="6">
                        <Label for={"parameterInputVcoBlock1Frequency"}>
                            {'VCO frequency'}
                        </Label>
                    </Col>
                    <Col xs="6">
                        <Input
                            size={'sm'}
                            type={"text"}
                            name={"parameterInputVcoBlock1Frequency"}
                            id={"parameterInputVcoBlock1Frequency"}
                            //placeholder={"enter VCO frequency"}
                            //onChange={this.onDataFormModalInputChange}
                            //defaultValue={library}
                        />
                    </Col>
                    {/*<Col xs="3">*/}
                        {/*<Button color="primary" block  size={'sm'} onClick={/!*this.parsePressSetModal*!/}>Set</Button>*/}
                    {/*</Col>*/}
                </Row>
                
                <Row><Col><hr/></Col></Row>
                
                <Row>
                    <Col xs="6">
                        <Label for={"parameterInputCompFrequency"}>
                            {'Comparison frequency'}
                        </Label>
                    </Col>
                    <Col xs="6">
                        <Input
                            size={'sm'}
                            type={"text"}
                            name={"parameterInputCompFrequency"}
                            id={"parameterInputCompFrequency"}
                            //placeholder={"enter comparison frequency"}
                            //onChange={this.onDataFormModalInputChange}
                            //defaultValue={library}
                        />
                    </Col>
                </Row>
    
                <Row>
                    <Col xs="6">
                        <Label for={"parameterInputRefFrequency"}>
                            {'Reference frequency'}
                        </Label>
                    </Col>
                    <Col xs="6">
                        <Input
                            size={'sm'}
                            type={"text"}
                            name={"parameterInputRefFrequency"}
                            id={"parameterInputRefFrequency"}
                            //placeholder={"ref frequency"}
                            //onChange={this.onDataFormModalInputChange}
                            //defaultValue={library}
                        />
                    </Col>
                </Row>
    
                <Row>
                    <Col xs="6">
                        <Label for={"parameterInputRefFrequencyPower"}>
                            {'Reference frequency power'}
                        </Label>
                    </Col>
                    <Col xs="6">
                        <Input
                            size={'sm'}
                            type={"text"}
                            name={"parameterInputRefFrequencyPower"}
                            id={"parameterInputRefFrequencyPower"}
                            //placeholder={"ref freq pow"}
                            //onChange={this.onDataFormModalInputChange}
                            //defaultValue={library}
                        />
                    </Col>
                </Row>
    
                <Row><Col><hr/></Col></Row>
    
                <Row>
                    <Col xs="3">
                        <Label>
                            {'External LPF'}
                        </Label>
                    </Col>
                    <Col xs="1">
                        <b>
                            {'R1'}
                        </b>
                    </Col>
                    <Col xs="2">
                        <Input
                            size={'sm'}
                            type={"text"}
                            name={"parameterInputExternalLPF1R1"}
                            id={"parameterInputExternalLPF1R1"}
                            //placeholder={"ref freq pow"}
                            //onChange={this.onDataFormModalInputChange}
                            //defaultValue={library}
                        />
                    </Col>
                    <Col xs="1">
                        <b>
                            {'C1'}
                        </b>
                    </Col>
                    <Col xs="2">
                        <Input
                            size={'sm'}
                            type={"text"}
                            name={"parameterInputExternalLPF1C1"}
                            id={"parameterInputExternalLPF1C1"}
                            //placeholder={"ref freq pow"}
                            //onChange={this.onDataFormModalInputChange}
                            //defaultValue={library}
                        />
                    </Col>
                    <Col xs="1">
                        <b>
                            {'C2'}
                        </b>
                    </Col>
                    <Col xs="2">
                        <Input
                            size={'sm'}
                            type={"text"}
                            name={"parameterInputExternalLPF1C2"}
                            id={"parameterInputExternalLPF1C2"}
                            //placeholder={"ref freq pow"}
                            //onChange={this.onDataFormModalInputChange}
                            //defaultValue={library}
                        />
                    </Col>
                </Row>
            </Container>
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
                
                <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                    <div style={{width: '50%'}}>
                        {this.renderParameterInputs()}
                    </div>
                    <div style={{backgroundColor:'#dbdbdb', width: '1px'}}>
                    </div>
                    <div style={{width: '50%'}}>
                        {this.renderStatus()}
                    </div>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    scheme: state.schemeStore,
});

export default connect(mapStateToProps, {initScheme})(Main);
