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
import {saveBlockInScheme} from "../store/thunks/schemeThunks";

class DataFormModal extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            dataFormModalInputLibrary: '',
            dataFormModalInputCell: '',
            dataFormModalInputView: '',
            dataFormModalInputCellType: '',
        };
    }
    
    
    /*setBlockDataToDataFormModal = () => {
        const currBlockData = this.state.blocksState[this.state.currentlyEditedBlockName].data;
        
        this.setState({
            dataFormModalInputLibrary: currBlockData.library,
            dataFormModalInputCell: currBlockData.cell,
            dataFormModalInputView: currBlockData.view,
            dataFormModalInputCellType: currBlockData.cellType,
        });
    };*/
    
    
    parsePressSetModal = () => {
        const newBlockData = {
            library: this.state.dataFormModalInputLibrary,
            cell: this.state.dataFormModalInputCell,
            view: this.state.dataFormModalInputView,
            cellType: this.state.dataFormModalInputCellType,
        };
        
        this.props.saveBlockInScheme(this.props.blockName, newBlockData);
        this.props.toggle();
    };
    
    onDataFormModalInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };
    
    
    render() {
        if (!this.props.blocksData || !this.props.blocksData[this.props.blockName]) return null;
        const currentBlockData = this.props.blocksData[this.props.blockName];
        const {
            dataFormModalInputLibrary,
            dataFormModalInputCell,
            dataFormModalInputView,
            dataFormModalInputCellType
        } = currentBlockData;
    
        const {
            library,
                cell,
            view,
            cellType,
        } = currentBlockData;
        
        return (
            <Modal
                isOpen={this.props.visible}
                toggle={this.props.toggle}
                backdrop={true}
                size="lg"
                style={{maxWidth: '600px', width: '50%', maxHeight: '1000px', height: '90%'}}
                scrollable
            >
                <ModalHeader toggle={this.props.toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <Label for={"dataFormModalInputLibrary"}>
                        Library
                    </Label>
                    <Input
                        type={"text"}
                        name={"dataFormModalInputLibrary"}
                        id={"dataFormModalInputLibrary"}
                        placeholder={"enter block Library"}
                        onChange={this.onDataFormModalInputChange}
                        defaultValue={library}
                    />
                    
                    <Label for={"dataFormModalInputCell"}>
                        Cell
                    </Label>
                    <Input
                        type={"text"}
                        name={"dataFormModalInputCell"}
                        id={"dataFormModalInputCell"}
                        placeholder={"enter block Cell"}
                        onChange={this.onDataFormModalInputChange}
                        defaultValue={cell}
                    />
                    
                    <Label for={"dataFormModalInputView"}>
                        View
                    </Label>
                    <Input
                        type={"text"}
                        name={"dataFormModalInputView"}
                        id={"dataFormModalInputView"}
                        placeholder={"enter block View"}
                        onChange={this.onDataFormModalInputChange}
                        defaultValue={view}
                    />
                    
                    <Label for={"dataFormModalInputCellType"}>
                        Cell Type
                    </Label>
                    <Input
                        type={"text"}
                        name={"dataFormModalInputCellType"}
                        id={"dataFormModalInputCellType"}
                        placeholder={"enter block Cell Type"}
                        onChange={this.onDataFormModalInputChange}
                        defaultValue={cellType}
                    />
                
                
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.parsePressSetModal}>Set</Button>
                </ModalFooter>
            </Modal>
        );
    }
}


const mapStateToProps = (state) => ({
    blocksData: state.schemeStore.blocksData,
});

export default connect(mapStateToProps, {saveBlockInScheme})(DataFormModal);