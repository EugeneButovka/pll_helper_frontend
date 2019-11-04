import {
    INIT_SCHEME_REQUEST,
    INIT_SCHEME_SUCCESS,
    INIT_SCHEME_FAIL,
    
    SAVE_SCHEME_DATA,
    SAVE_BLOCK_IN_SCHEME
} from "../actionTypes";

const initialState = {
    error: null,
    isLoading: false,
    requestCompleted: false,
    blocksPresets: {},
    blocksData: null,
    blocksNames: ["detector1", "amplitudeControl1"]
    
};

export default function (state = initialState, action) {
    switch (action.type) {
        case INIT_SCHEME_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case INIT_SCHEME_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                //blocksPresets: action.payload,
                blocksData: action.payload,
                requestCompleted: true
            };
        case INIT_SCHEME_FAIL:
            return {
                ...state,
                error: 'get schemeDataPresets fail',
                isLoading: false,
                requestCompleted: true
            };
    
        case SAVE_SCHEME_DATA:
            return {
                ...state,
                blocksData: action.payload
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