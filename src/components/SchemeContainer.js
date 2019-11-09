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
    Alert
} from 'reactstrap';
import SchemeSVG from "./SchemeSVG";
import DataFormModal from "./DataFormModal";


class SchemeContainer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentlyEditedBlockName: this.props.scheme.blocksNames[0],
            isDataFormModalOpen: false
        };
    }
    
    parseBlockFill = (blockName) => {
        if (!this.props.scheme.blocksData || !this.props.scheme.blocksData[blockName]) return '#dedede';
        if (blockName === this.state.currentlyEditedBlockName && this.state.isDataFormModalOpen) return '#FFF';
        if (this.props.scheme.blocksData[blockName].inputComplete) return 'rgba(107,162,22,10)';
        return 'white';
    };
    
    parseBlockClick = (blockName) => {
        console.log('click: ', blockName);
        console.log('this.props.scheme', this.props.scheme);
        if (!this.props.scheme.blocksData || !this.props.scheme.blocksData[blockName]) return;
        
        
        this.editBlockWithForm(blockName);
    };
    
    editBlockWithForm = (blockName) => {
        this.setState({
            currentlyEditedBlockName: blockName,
            //isDataFormModalOpen: false
        }, this.openDataFormModal());
    };
    
    
    closeDataFormModal = () => this.setState({isDataFormModalOpen: false});
    openDataFormModal = () => this.setState({isDataFormModalOpen: true,});
    toggleDataFormModal = () => this.setState({isDataFormModalOpen: !this.state.isDataFormModalOpen});
    
    
    render() {
        return (
            <Container style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center",
                //backgroundColor: "grey"
            }}>
                {/*<h1>scheme</h1>*/}
                <SchemeSVG onBlockClick={this.parseBlockClick} setBlockFill={this.parseBlockFill}/>
                <DataFormModal visible={this.state.isDataFormModalOpen} toggle={this.toggleDataFormModal}
                               blockName={this.state.currentlyEditedBlockName}/>
            </Container>
        );
    }
}


const mapStateToProps = (state) => ({
    scheme: state.schemeStore,
});

export default connect(mapStateToProps, {})(SchemeContainer);