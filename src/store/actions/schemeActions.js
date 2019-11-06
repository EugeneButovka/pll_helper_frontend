import {
    INIT_SCHEME_REQUEST,
    INIT_SCHEME_SUCCESS,
    INIT_SCHEME_FAIL,
    
    SAVE_SCHEME_DATA,
    SAVE_BLOCK_IN_SCHEME
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