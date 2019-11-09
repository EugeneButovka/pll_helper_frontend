import {cadServer} from "../../core/axios";
import {
    initSchemeRequestAction,
    initSchemeSuccessAction,
    initSchemeFailAction,
    
    characterizeVCORequestAction,
    characterizeVCOPendingAction,
    characterizeVCOSuccessAction,
    characterizeVCOFailAction,
    
    getModelDataRequestAction,
    getModelDataPendingAction,
    getModelDataSuccessAction,
    getModelDataFailAction,
    
    saveSchemeAction,
    saveBlockInSchemeAction,
    saveParametersAction
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
        dispatch(initSchemeSuccessAction(presetsResponse.data.presets, cellTypesResponse.data.celltypes, defaultBlocksData));
        
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


export const saveParameters = parametersData => async dispatch => {
    console.log('saving parameters data');
    dispatch(saveParametersAction(parametersData));
};



export const characterizeVCO = () => async (dispatch, getState) => {
    console.log('get vco char request');
    dispatch(characterizeVCORequestAction());
    
    const VCOInputData = getState().schemeStore.blocksData['vcoBlock1'];
    
    //requesting vco characterization data with polling pattern
    let vcoRes = null;
    let reqTimer = setInterval(async () => {
        vcoRes = await cadServer.get('/vcochar', VCOInputData);
        //console.log('vcoRes', vcoRes);
        if (vcoRes.status !== 200 && vcoRes.status !== 206) {
            console.log('get vco char error');
            clearInterval(reqTimer);
            dispatch(characterizeVCOFailAction());
        }
        if (vcoRes.data.status === 'processing') {
            vcoRes.data.readyness = 'there will be %'; //TODO: remove when backend done
            console.log('getting vco char progress');
            dispatch(characterizeVCOPendingAction(vcoRes.data.readyness));
        }
        if (vcoRes.data.status === 'ready') {
            vcoRes.data.char = 'there will be data';//TODO: remove when backend done
            console.log('get vco char success');
            clearInterval(reqTimer);
            dispatch(characterizeVCOSuccessAction(vcoRes.data.char));
        }
        
    }, 2000); //3 sec interval requests until get VCO data
};


export const getModelData = () => async (dispatch, getState) => {
    console.log('get model data request');
    dispatch(getModelDataRequestAction());
    
    const VCOInputData = getState().schemeStore.blocksData;
    
    //requesting vco characterization data with polling pattern
    let modelRes = null;
    let reqTimer = setInterval(async () => {
        modelRes = await cadServer.get('/makemodel', VCOInputData);
        console.log('modelRes', modelRes);
        if (modelRes.status !== 200 && modelRes.status !== 206) {
            console.log('get model data error');
            clearInterval(reqTimer);
            dispatch(getModelDataFailAction());
        }
        if (modelRes.data.status === 'processing') {
            modelRes.data.readyness = 'there will be %'; //TODO: remove when backend done
            console.log('get model data progress');
            dispatch(getModelDataPendingAction(modelRes.data.readyness));
        }
        if (modelRes.data.status === 'ready') {
            console.log('get model data success');
            clearInterval(reqTimer);
            dispatch(getModelDataSuccessAction(modelRes.data.plot));
        }
        
    }, 2000); //3 sec interval requests until get VCO data
};