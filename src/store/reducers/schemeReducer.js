import {
    INIT_SCHEME_REQUEST,
    INIT_SCHEME_SUCCESS,
    INIT_SCHEME_FAIL,
    
    CHAR_VCO_REQUEST,
    CHAR_VCO_PENDING,
    CHAR_VCO_SUCCESS,
    CHAR_VCO_FAIL,
    
    GET_MODEL_REQUEST,
    GET_MODEL_PENDING,
    GET_MODEL_SUCCESS,
    GET_MODEL_FAIL,
    
    SAVE_SCHEME_DATA,
    SAVE_BLOCK_IN_SCHEME,
    SAVE_PARAMETERS_DATA
} from "../actionTypes";

const initialState = {
    error: null,
    isLoading: false,
    requestCompleted: false,
    blocksPresets: {},
    blocksCellTypes: {},
    blocksData: null,
    blocksNames: ["detector1", "amplitudeControl1", "vcoBlock1"],
    vcoCharacterizationStatus: 'NOT_CHARACTERIZED',
    vcoCharacterizationInfo: '',
    parametersData: null,
    buildModelStatus: 'WAITING_INPUT_DATA',
    buildModelData: null
    
};

export default function (state = initialState, action) {
    switch (action.type) {
        case INIT_SCHEME_REQUEST:
            return {
                ...state,
                isLoading: true,
                requestCompleted: false
            };
        case INIT_SCHEME_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                blocksPresets: action.payload.presets,
                blocksCellTypes: action.payload.cellTypes,
                blocksData: action.payload.blocksData,
                requestCompleted: true
            };
        case INIT_SCHEME_FAIL:
            return {
                ...state,
                error: 'get schemeDataPresets fail',
                isLoading: false,
                requestCompleted: false
            };
    
            
        case CHAR_VCO_REQUEST:
            return {
                ...state,
                isLoading: true,
                requestCompleted: false,
                vcoCharacterizationStatus: 'SENDING_REQUEST'
            };
        case CHAR_VCO_PENDING:
            return {
                ...state,
                vcoCharacterizationStatus: 'IN_PROCESS'
            };
        case CHAR_VCO_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                vcoCharacterizationStatus: 'COMPLETE',
                vcoCharacterizationInfo: action.payload,
                requestCompleted: true
            };
        case CHAR_VCO_FAIL:
            return {
                ...state,
                error: 'get vco char fail',
                vcoCharacterizationStatus: 'ERROR',
                isLoading: false,
                requestCompleted: false
            };
    
    
        case GET_MODEL_REQUEST:
            return {
                ...state,
                isLoading: true,
                requestCompleted: false,
                buildModelStatus: 'SENDING_REQUEST'
            };
        case GET_MODEL_PENDING:
            return {
                ...state,
                buildModelStatus: 'IN_PROCESS'
            };
        case GET_MODEL_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                buildModelStatus: 'COMPLETE',
                buildModelData: action.payload,
                requestCompleted: true
            };
        case GET_MODEL_FAIL:
            return {
                ...state,
                error: 'get model data fail',
                buildModelStatus: 'ERROR',
                isLoading: false,
                requestCompleted: false
            };
            
            
    
        case SAVE_SCHEME_DATA:
            return {
                ...state,
                blocksData: action.payload
            };
    
        case SAVE_PARAMETERS_DATA:
            return {
                ...state,
                parametersData: action.payload
            };
    
        case SAVE_BLOCK_IN_SCHEME:
            return {
                ...state,
                blocksData: {
                    ...state.blocksData,
                    [action.payload.blockName]: {
                        //...state.blocksData[action.payload.blockName],
                        ...action.payload.blockData,
                        inputComplete: true
                    }
                }
            };
            
            
        //default routine
        default:
            return state;
    }
}