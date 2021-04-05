import GeoJSON from 'ol/format/GeoJSON';
import { get } from 'ol/proj';
import { vector } from '../../components/source';
import { TOGGLE_LAYER_VISIBILITY } from '../../constants/actions';
import * as styles from '../../core/layers/styles';

import geojsonBorders from '../../assets/layers/borders.json';
import geojsonRegions from '../../assets/layers/regions.json';
import geojsonRivers from '../../assets/layers/rivers.json';
import geojsonCities from '../../assets/layers/cities.json';
import geojsonOOPT from '../../assets/layers/oopt.json';
import geojsonSeas from '../../assets/layers/seas.json';

const PROJECTION = 'EPSG:3857';

const initialState = {
  borders: {
    id: 0,
    name: 'Границы',
    options: {
      visible: true,
      style: styles.border,
    },
    layers: [
      {
        id: 0,
        vectors: [
          vector({
            features: new GeoJSON().readFeatures(geojsonBorders, { featureProjection: get(PROJECTION) }),
          })
        ]
      }
    ],
  },
  regions: {
    id: 1,
    name: 'Регионы',
    options: {
      visible: true,
      style: styles.region,
    },
    layers: [
      {
        id: 0,
        vectors: [
          vector({
            features: new GeoJSON().readFeatures(geojsonRegions, { featureProjection: get(PROJECTION) }),
          })
        ]
      }
    ]
  },
  rivers: {
    id: 2,
    name: 'Реки',
    options: {
      visible: true,
      style: styles.river,
    },
    layers: [
      {
        id: 0,
        vectors: [
          vector({
            features: new GeoJSON().readFeatures(geojsonRivers, { featureProjection: get(PROJECTION) }),
          })
        ]
      }
    ]
  },
  cities: {
    id: 3,
    name: 'Города',
    options: {
      visible: true,
      style: styles.city,
    },
    layers: [
      {
        id: 0,
        vectors: [
          vector({
            features: new GeoJSON().readFeatures(geojsonCities, { featureProjection: get(PROJECTION) }),
          })
        ]
      }
    ]
  },
  protectedArea: {
    id: 4,
    name: 'ООПТ',
    options: {
      visible: true,
      style: styles.oopt,
    },
    layers: [
      {
        id: 0,
        vectors: [
          vector({
            features: new GeoJSON().readFeatures(geojsonOOPT, { featureProjection: get(PROJECTION) }),
          })
        ]
      }
    ]
  },
  seas: {
    id: 5,
    name: 'Моря',
    options: {
      visible: true,
      style: styles.oopt,
    },
    layers: [
      {
        id: 0,
        vectors: [
          vector({
            features: new GeoJSON().readFeatures(geojsonSeas, { featureProjection: get(PROJECTION) }),
          })
        ]
      }
    ]
  },
};

const layerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_LAYER_VISIBILITY:
      return {
        ...state,
        [payload.key]: {
          ...state[payload.key],
          options: {
            ...state[payload.key].options,
            visible: !state[payload.key].options.visible,
          }
        }
      };
    default: return state;
  }
};

export default layerReducer;
