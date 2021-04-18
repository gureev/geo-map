import GeoJSON from 'ol/format/GeoJSON';
import { get } from 'ol/proj';
import { vector } from '../../components/source';
import { TOGGLE_LAYER_VISIBILITY, TOGGLE_SUBLAYER_VISIBILITY } from '../../constants/actions';
import * as styles from '../../core/layers/styles';

import geojsonBorders from '../../assets/layers/borders.json';
import geojsonRegions from '../../assets/layers/regions.json';
import geojsonRivers from '../../assets/layers/rivers.json';
import geojsonCities from '../../assets/layers/cities.json';
import geojsonOOPT from '../../assets/layers/oopt.json';
import geojsonSeas from '../../assets/layers/seas.json';

import noise58 from '../../assets/layers/noise/noise58.json';
import noise61 from '../../assets/layers/noise/noise61.json';
import noise64 from '../../assets/layers/noise/noise64.json';
import noise70 from '../../assets/layers/noise/noise70.json';
import noise73 from '../../assets/layers/noise/noise73.json';
import noise76 from '../../assets/layers/noise/noise76.json';
import noise79 from '../../assets/layers/noise/noise79.json';

import landscaping0 from '../../assets/layers/landscaping/landscaping_0-19.json';
import landscaping20 from '../../assets/layers/landscaping/landscaping_20-39.json';
import landscaping40 from '../../assets/layers/landscaping/landscaping_40-59.json';
import landscaping60 from '../../assets/layers/landscaping/landscaping_60-100.json';

import emissionsLeninskiy from '../../assets/layers/emissions/emissions_leninskiy.json';
import emissionsOktyabrsky from '../../assets/layers/emissions/emissions_oktyabrsky.json';
import emissionsPervomaysky from '../../assets/layers/emissions/emissions_pervomaysky.json';
import emissionsUstinovsky from '../../assets/layers/emissions/emissions_ustinovskiy.json';

const noises = [
  [noise58, 'rgba(251, 249, 224, 1)'],
  [noise61, 'rgba(249, 236, 142, 1)'],
  [noise64, 'rgba(255, 194, 101, 1)'],
  [noise70, 'rgba(250, 147, 104, 1)'],
  [noise73, 'rgba(198, 134, 106, 1)'],
  [noise76, 'rgba(198, 134, 106, 1)'],
  [noise79, 'rgba(198, 134, 106, 1)'],
];

const landscaping = [
  [landscaping0, 'rgba(237, 254, 210, 0.5)'],
  [landscaping20, 'rgba(159, 207, 145, 0.5)'],
  [landscaping40, 'rgba(83, 176, 64, 0.5)'],
  [landscaping60, 'rgba(0, 129, 0, 0.5)'],
];

const emissions = [
  emissionsLeninskiy,
  emissionsOktyabrsky,
  emissionsPervomaysky,
  emissionsUstinovsky,
];

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
  seas: {
    id: 2,
    name: 'Моря',
    options: {
      visible: true,
      style: styles.seas,
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
  rivers: {
    id: 3,
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
    id: 4,
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
    id: 5,
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
  izhevsk: {
    id: 6,
    name: 'Ижевск',
    options: {
      visible: true,
      style: styles.oopt,
    },
    layers: [
      {
        id: 0,
        key: 'noise',
        name: 'Уровень эквивалентного шума',
        options: {
          visible: true,
          prevVisible: null,
        },
        vectors: noises.map(([noise, color]) => [
          vector({
            features: new GeoJSON().readFeatures(noise, { featureProjection: get(PROJECTION) })
          }),
          styles.noise(color)
        ])
      },
      {
        id: 1,
        key: 'landscaping',
        name: 'Озеленение',
        options: {
          visible: true,
          prevVisible: null,
        },
        vectors: landscaping.map(([landscape, fillColor]) => [
          vector({
            features: new GeoJSON().readFeatures(landscape, { featureProjection: get(PROJECTION) }),
          }),
          styles.landscaping(fillColor)
        ])
      },
      {
        id: 2,
        key: 'emissions',
        name: 'Выбросы',
        options: {
          visible: true,
          prevVisible: null,
        },
        vectors: emissions.map((emission) => [
          vector({
            features: new GeoJSON().readFeatures(emission, { featureProjection: get(PROJECTION) }),
          }),
          styles.emissions
        ])
      }

    ]
  }
};

const layerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_LAYER_VISIBILITY:
      const layer = { ...state[payload.key] };
      const isLayerVisible = !layer.options.visible;
      layer.options.visible = isLayerVisible;
      if (layer.layers[0].key) {
        if (isLayerVisible) {
          let isSomeSublayerVisible = false;
          layer.layers.forEach(sublayer => {
            const visible = sublayer.options.prevVisible ?? true;
            sublayer.options.visible = visible;
            if (visible) {
              isSomeSublayerVisible = true;
            }
          });
          if (!isSomeSublayerVisible) {
            layer.layers.forEach(sublayer => {
              sublayer.options.visible = true;
            });
          }
        } else {
          layer.layers.forEach(sublayer => {
            sublayer.options.prevVisible = sublayer.options.visible;
            sublayer.options.visible = false;
          });
        }
      }
      return { ...state, [payload.key]: layer };
    case TOGGLE_SUBLAYER_VISIBILITY:
      const newState = { ...state };

      const sublayers = state[payload.layerKey].layers.map(sublayer => {
        if (sublayer.key === payload.sublayerKey) {
          const isVisible = !sublayer.options.visible;

          sublayer.options.prevVisible = !isVisible;
          sublayer.options.visible = isVisible;
          if (isVisible) {
            newState[payload.layerKey].options.visible = true;
          }
        }
        return sublayer;
      });
      if (sublayers.every(sublayers => !sublayers.options.visible)) {
        newState[payload.layerKey].options.visible = false;
      }
      return newState;
    default: return state;
  }
};

export default layerReducer;
