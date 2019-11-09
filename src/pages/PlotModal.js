import React from 'react';
import {connect} from 'react-redux';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Container,
    Label,
    Input,
    Alert,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import Plot from 'react-plotly.js';

class PlotModal extends React.Component {
    constructor(props) {
        super(props);
    }
    
    
    
    render() {
        if (!this.props.plotData) return null;
        console.log('this.props.plotData',[this.props.plotData,]);
        console.log('this.props.visible',this.props.visible);
        return (
            <Modal
                isOpen={this.props.visible}
                toggle={this.props.toggle}
                backdrop={true}
                size="lg"
                style={{maxWidth: '600px', width: '50%', maxHeight: '1000px', height: '90%'}}
                scrollable
            >
                {/*<ModalHeader toggle={this.props.toggle}>{'Plot'}</ModalHeader>*/}
                <ModalBody>
                    <Plot
                        data={[this.props.plotData,]}
                        style = {{display: 'flex', width: '100%', height: '100%'}}
                    />
                </ModalBody>
            </Modal>
        );
    
        return (
            <Modal
                isOpen={this.props.visible}
                toggle={this.props.toggle}
                backdrop={true}
                size="lg"
                style={{maxWidth: '600px', width: '50%', maxHeight: '1000px', height: '90%'}}
                scrollable
            >
                <ModalHeader toggle={this.props.toggle}>{'Plot'}</ModalHeader>
                <ModalBody>
                    {/*<Plot*/}
                    {/*data={[this.props.plotData,]}*/}
                    {/*layout={ {width: '100%', height: '100%', title: 'Plot'} }*/}
                    {/*/>*/}
                    <Plot
                        data={[
                            {
                                x: [1, 2, 3],
                                y: [2, 6, 3],
                                type: 'scatter',
                                mode: 'lines+points',
                                marker: {color: 'red'},
                            },
                            {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                        ]}
                        //layout={ {display: 'flex', width: '100%', height: '100%', title: 'A Fancy Plot'} }
                        style = {{display: 'flex', width: '100%', height: '100%'}}
                    />
                </ModalBody>
            </Modal>
        );
    }
}


const mapStateToProps = (state) => ({
    plotData: state.schemeStore.buildModelData,
});

export default connect(mapStateToProps, {})(PlotModal);