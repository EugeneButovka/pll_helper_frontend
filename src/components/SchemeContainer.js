import React from 'react';
import set from 'lodash/set';
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

export default class SchemeContainer extends React.Component {
    blocksNames = ["detector1", "amplitudeControl1"];
    
    generateBlocksInitialStates() {
        let blocksInitialStates = {};
        this.blocksNames.forEach((item, i) => {
            blocksInitialStates[item] = {
                id: i,
                //selected: false,
                data: {
                    library: "$DEFAULT_LIB",
                    cell: "$DEFAULT_CELL",
                    view: "$DEFAULT_VIEW",
                    cellType: "$DEFAULT_CELL_TYPE"
                },
                parameters: null,
                inputComplete: false
            }
        });
        console.log('blocksInitialStates', blocksInitialStates);
        return blocksInitialStates;
    }
    
    constructor(props) {
        super(props);
        
        this.state = {
            blocksState: this.generateBlocksInitialStates(),
            currentlyEditedBlockName: this.blocksNames[0],
            dataFormModalState: null,
            isDataFormModalOpen: false
        };
    }
    
    parseBlockFill = (blockName) => {
        if (!this.state.blocksState[blockName]) return 'yellow';
        if (blockName === this.state.currentlyEditedBlockName && this.state.isDataFormModalOpen) return 'grey';
        if (this.state.blocksState[blockName].inputComplete) return 'green';
        return 'white';
    };
    
    parseBlockClick = (blockName) => {
        console.log('click: ', blockName);
        if (!this.state.blocksState[blockName]) return;
        
        this.editBlockWithForm(blockName);
    };
    
    editBlockWithForm = (blockName) => {
        this.setState({
            currentlyEditedBlockName: blockName,
            //isDataFormModalOpen: false
        }, this.setBlockDataToDataFormModal);//, this.openDataFormModal());
        this.openDataFormModal();
    };
    
    
    setBlockData = (blockName, data) => {
        const block = {
            data: null, // or {library:"", cell:"", view:"", cellType:""}
        };
        
    };
    
    closeDataFormModal = () => this.setState({isDataFormModalOpen: false});
    openDataFormModal = () => this.setState({isDataFormModalOpen: true,});
    toggleDataFormModal = () => this.setState({isDataFormModalOpen: !this.state.isDataFormModalOpen});
    parsePressSetModal = () => {
        this.setDataFormModalToBlockData();
        this.closeDataFormModal();
    };
    
    
    setBlockDataToDataFormModal = () => {
        const currBlockData = this.state.blocksState[this.state.currentlyEditedBlockName].data;
        
        this.setState({
            dataFormModalInputLibrary: currBlockData.library,
            dataFormModalInputCell: currBlockData.cell,
            dataFormModalInputView: currBlockData.view,
            dataFormModalInputCellType: currBlockData.cellType,
        });
    };
    
    setDataFormModalToBlockData = () => {
        const currBlockData = {
            library: this.state.dataFormModalInputLibrary,
            cell: this.state.dataFormModalInputCell,
            view: this.state.dataFormModalInputView,
            cellType: this.state.dataFormModalInputCellType
        };
        
        this.setState(prevState => ({
            blocksState: {
                ...prevState.blocksState,
                [this.state.currentlyEditedBlockName]: {
                    ...prevState.blocksState[this.state.currentlyEditedBlockName],
                    data: currBlockData
                }
            }
        }));
    };
    
    
    onDataFormModalInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };
    
    renderDataFormForBlock() {
        return (
            <Modal isOpen={this.state.isDataFormModalOpen} toggle={this.toggleDataFormModal} backdrop={true}>
                <ModalHeader toggle={this.toggleDataFormModal}>Modal title</ModalHeader>
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
                        defaultValue={this.state.dataFormModalInputLibrary}
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
                        defaultValue={this.state.dataFormModalInputCell}
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
                        defaultValue={this.state.dataFormModalInputView}
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
                        defaultValue={this.state.dataFormModalInputCellType}
                    />
                
                
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.parsePressSetModal}>Set</Button>
                </ModalFooter>
            </Modal>
        );
    };
    
    
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
                {this.renderDataFormForBlock()}
            </Container>
        );
    }
}