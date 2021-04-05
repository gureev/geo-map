import { TOGGLE_LAYER_VISIBILITY } from '../../constants/actions';

export const toggleLayerVisibility = (key) => ({ type: TOGGLE_LAYER_VISIBILITY, payload: { key } });
