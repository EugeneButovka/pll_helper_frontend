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
    
    initModal = () => {
        console.log('modal opened');
        const {
            library,
            cell,
            view,
            cellType,
        } = this.props.blocksData[this.props.blockName];
    
        console.log('blocks data', this.props.blocksData);
        
        
        this.setState({
            dataFormModalInputLibrary: library,
            dataFormModalInputCell: cell,
            dataFormModalInputView: view,
            dataFormModalInputCellType: cellType,
        }, () => console.log('this.state.dataFormModalInputLibrary',this.state.dataFormModalInputLibrary))
    };
    
    
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
    
    parseSelectLib = (e) => {
        this.setState({dataFormModalInputLibrary: e.currentTarget.textContent});
    };
    
    parseSelectCell = (e) => {
        this.setState({dataFormModalInputCell: e.currentTarget.textContent});
    };
    
    parseSelectView = (e) => {
        this.setState({dataFormModalInputView: e.currentTarget.textContent});
    };
    
    parseSelectCellType = (e) => {
        this.setState({dataFormModalInputCellType: e.currentTarget.textContent});
    };
    
    
    
    render() {
        if (!this.props.blocksData || !this.props.blocksData[this.props.blockName]) return null;
        const currentBlockData = this.props.blocksData[this.props.blockName];
        //console.log('currentBlockData', currentBlockData);
        
        const {
            dataFormModalInputLibrary,
            dataFormModalInputCell,
            dataFormModalInputView,
            dataFormModalInputCellType
        } = this.state;
        
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
                onOpened={this.initModal}
            >
                <ModalHeader toggle={this.props.toggle}>{this.props.blockName}</ModalHeader>
                <ModalBody>
                    <Label>
                        Library
                    </Label>
                    <UncontrolledDropdown>
                        <DropdownToggle caret>
                            {dataFormModalInputLibrary ? dataFormModalInputLibrary : 'no lib selected'}
                        </DropdownToggle>
                        <DropdownMenu>
                            {Object.keys(this.props.blocksPresets).map((key, i) => (
                                <DropdownItem key={i} onClick={this.parseSelectLib}>{key}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </UncontrolledDropdown>
    
                    <Label>
                        Cell
                    </Label>
                    {dataFormModalInputLibrary ?
                        <UncontrolledDropdown>
                            <DropdownToggle caret>
                                {dataFormModalInputCell ? dataFormModalInputCell : 'no cell selected'}
                            </DropdownToggle>
                            <DropdownMenu>
                                {Object.keys(this.props.blocksPresets[dataFormModalInputLibrary]).map((key, i) => (
                                    <DropdownItem key={i} onClick={this.parseSelectCell}>{key}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        :
                        <UncontrolledDropdown>
                            <DropdownToggle caret disabled>
                                {'select lib first'}
                            </DropdownToggle>
                        </UncontrolledDropdown>
                    }
    
                    <Label>
                        View
                    </Label>
                    {dataFormModalInputCell ?
                        <UncontrolledDropdown>
                            <DropdownToggle caret>
                                {dataFormModalInputView ? dataFormModalInputView : 'no view selected'}
                            </DropdownToggle>
                            <DropdownMenu>
                                {this.props.blocksPresets[dataFormModalInputLibrary][dataFormModalInputCell].map((key, i) => (
                                    <DropdownItem key={i} onClick={this.parseSelectView}>{key}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        :
                        <UncontrolledDropdown>
                            <DropdownToggle caret disabled>
                                {'select lib & cell first'}
                            </DropdownToggle>
                        </UncontrolledDropdown>
                    }
    
                    <Label>
                        View type
                    </Label>
                    <UncontrolledDropdown>
                        <DropdownToggle caret>
                            {dataFormModalInputCellType ? dataFormModalInputCellType : 'no cell type selected'}
                        </DropdownToggle>
                        <DropdownMenu>
                            {this.props.blocksCellTypes.map((key, i) => (
                                <DropdownItem key={i} onClick={this.parseSelectCellType}>{key}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </UncontrolledDropdown>
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
    blocksPresets: state.schemeStore.blocksPresets,
    blocksCellTypes: state.schemeStore.blocksCellTypes,
});

export default connect(mapStateToProps, {saveBlockInScheme})(DataFormModal);