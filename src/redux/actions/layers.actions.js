import { TOGGLE_LAYER_VISIBILITY, TOGGLE_SUBLAYER_VISIBILITY } from '../../constants/actions';

export const toggleLayerVisibility = (key) => ({ type: TOGGLE_LAYER_VISIBILITY, payload: { key } });
export const toggleSubLayerVisibility = (layerKey, sublayerKey) => layerKey && sublayerKey &&
  ({ type: TOGGLE_SUBLAYER_VISIBILITY, payload: { layerKey, sublayerKey } });
