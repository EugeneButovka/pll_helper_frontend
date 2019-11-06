import {cadServer} from "../../core/axios";
import {
    initSchemeRequestAction,
    initSchemeSuccessAction,
    initSchemeFailAction,
    
    saveSchemeAction,
    saveBlockInSchemeAction
    
} from '../actions/schemeActions';


const generateBlocksInitialStates = () => (dispatch, getState) => {
    const {blocksNames} = getState().schemeStore;
    console.log('getState()', getState());
    
    let blocksInitialStates = {};
    blocksNames.forEach((item, i) => {
        blocksInitialStates[item] = {
            id: i,
            //selected: false,
            name: item,
            library: "",
            cell: "",
            view: "",
            cellType: "",
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
        const presetsResponse = await cadServer.get('/presets');
        const cellTypesResponse = await cadServer.get('/celltypes');
        console.log('cellTypesResponse', cellTypesResponse);
        const defaultBlocksData = dispatch(generateBlocksInitialStates());//TODO: replace for network get
        dispatch(initSchemeSuccessAction(presetsResponse.data.presets, cellTypesResponse.data.celltypes , defaultBlocksData));
        
        console.log('init scheme success');
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