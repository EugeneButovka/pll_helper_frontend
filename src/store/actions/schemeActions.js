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


//initializing scheme
export const initSchemeRequestAction = () => ({
    type: INIT_SCHEME_REQUEST,
});

export const initSchemeSuccessAction = (presets, cellTypes, blocksData) => ({
    type: INIT_SCHEME_SUCCESS,
    payload: {presets, cellTypes, blocksData}
});

export const initSchemeFailAction = (payload) => ({
    type: INIT_SCHEME_FAIL,
    payload: payload
});


//vco characterization
export const characterizeVCORequestAction = () => ({
    type: CHAR_VCO_REQUEST,
});

export const characterizeVCOPendingAction = (pendingStatus) => ({
    type: CHAR_VCO_PENDING,
    payload: pendingStatus
});

export const characterizeVCOSuccessAction = (vcoData) => ({
    type: CHAR_VCO_SUCCESS,
    payload: vcoData
});

export const characterizeVCOFailAction = (error) => ({
    type: CHAR_VCO_FAIL,
    payload: error
});


//getting model data
export const getModelDataRequestAction = () => ({
    type: GET_MODEL_REQUEST,
});

export const getModelDataPendingAction = (pendingStatus) => ({
    type: GET_MODEL_PENDING,
    payload: pendingStatus
});

export const getModelDataSuccessAction = (modelData) => ({
    type: GET_MODEL_SUCCESS,
    payload: modelData
});

export const getModelDataFailAction = (error) => ({
    type: GET_MODEL_FAIL,
    payload: error
});


// saving parameters
export const saveParametersAction = (parametersData) => ({
    type: SAVE_PARAMETERS_DATA,
    payload: parametersData
});

// saving scheme
export const saveSchemeAction = (schemeData) => ({
    type: SAVE_SCHEME_DATA,
    payload: schemeData
});




// saving single block scheme
export const saveBlockInSchemeAction = (blockName, blockData) => ({
    type: SAVE_BLOCK_IN_SCHEME,
    payload: {blockName, blockData}
});