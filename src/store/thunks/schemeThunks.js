import {cadServer} from "../../core/axios";
import {
    initSchemeRequestAction,
    initSchemeSuccessAction,
    initSchemeFailAction,
    
    saveSchemeAction,
    saveBlockInSchemeAction
    
} from '../actions/schemeActions';


const generateBlocksInitialStates = () => async (dispatch, getState) => {
    const {blocksNames} = getState().schemeStore;
    console.log('getState()', getState());
    
    let blocksInitialStates = {};
    blocksNames.forEach((item, i) => {
        blocksInitialStates[item] = {
            id: i,
            //selected: false,
            name: item,
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
    //console.log('blocksInitialStates', blocksInitialStates);
    return blocksInitialStates;
};

export const initScheme = () => async dispatch => {
    console.log('init scheme request');
    dispatch(initSchemeRequestAction());
    
    
    //requesting scheme data selectors presets form server
    try {
        //const res = await cadServer.get('/scheme/presets');
        
        const res = await dispatch(generateBlocksInitialStates());//TODO: replace for network get
        dispatch(initSchemeSuccessAction(res));
        
        console.log('init scheme success: ', res);
        //dispatch(initSchemeSuccessAction(res.data));
    } catch (error) {
        console.log('init scheme error: ', error);
        dispatch(initSchemeFailAction(error));
    }
};

export const saveScheme = schemeData => async dispatch => {
    console.log('saving scheme');
    dispatch(saveSchemeAction(schemeData));
};


export const saveBlockInScheme = (blockName, blockData) => async dispatch => {
    console.log(`saving block ${blockName} in scheme`);
    
    dispatch(saveBlockInSchemeAction(blockName, blockData));
};