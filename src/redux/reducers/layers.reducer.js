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

import industrialZoneLeninskiy from '../../assets/layers/industrialZones/industrial_zone_leninskiy.json';
import industrialZoneOktyabrsky from '../../assets/layers/industrialZones/industrial_zone_oktyabrsky.json';
import industrialZonePervomaysky from '../../assets/layers/industrialZones/industrial_zone_pervomaysky.json';
import industrialZoneUstinovsky from '../../assets/layers/industrialZones/industrial_zone_ustinovskiy.json';

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
  industrialZoneLeninskiy,
  industrialZoneOktyabrsky,
  industrialZonePervomaysky,
  industrialZoneUstinovsky,
];

const PROJECTION = 'EPSG:3857';

const initialState = {
  urfo: {
    name: 'Уральский федеральный округ',
    options: {
      visible: false,
    },
    subjects: {
      borders: {
        id: 0,
        name: 'Границы',
        options: {
          visible: false,
          style: styles.border,
        },
        vectors: [
          vector({
            features: new GeoJSON().readFeatures(geojsonBorders, { featureProjection: get(PROJECTION) }),
          })
        ],
      },
      regions: {
        id: 1,
        name: 'Регионы',
        options: {
          visible: false,
          style: styles.region,
        },
        vectors: [
          vector({
            features: new GeoJSON().readFeatures(geojsonRegions, { featureProjection: get(PROJECTION) }),
          })
        ]
      },
      seas: {
        id: 2,
        name: 'Моря',
        options: {
          visible: false,
          style: styles.seas,
        },
        vectors: [
          vector({
            features: new GeoJSON().readFeatures(geojsonSeas, { featureProjection: get(PROJECTION) }),
          })
        ]
      },
      rivers: {
        id: 3,
        name: 'Реки',
        options: {
          visible: false,
          style: styles.river,
        },
        vectors: [
          vector({
            features: new GeoJSON().readFeatures(geojsonRivers, { featureProjection: get(PROJECTION) }),
          })
        ]
      },
      cities: {
        id: 4,
        name: 'Города',
        options: {
          visible: false,
          style: styles.city,
        },
        vectors: [
          vector({
            features: new GeoJSON().readFeatures(geojsonCities, { featureProjection: get(PROJECTION) }),
          })
        ]
      },
      protectedArea: {
        id: 5,
        name: 'ООПТ',
        options: {
          visible: false,
          style: styles.oopt,
        },
        vectors: [
          vector({
            features: new GeoJSON().readFeatures(geojsonOOPT, { featureProjection: get(PROJECTION) }),
          })
        ]
      },
    }
  },
  izhevsk: {
    name: 'Ижевск',
    options: {
      visible: true,
    },
    subjects: {
      noise: {
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
      landscaping: {
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
      industrialZones: {
        name: 'Промышленные зоны',
        options: {
          visible: true,
          prevVisible: null,
        },
        vectors: emissions.map((emission) => [
          vector({
            features: new GeoJSON().readFeatures(emission, { featureProjection: get(PROJECTION) }),
          }),
          styles.industrialZones
        ])
      }

    }
  }
};

const layerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_LAYER_VISIBILITY:
      const layer = { ...state[payload.key] };
      const isLayerVisible = !layer.options.visible;
      layer.options.visible = isLayerVisible;
      if (isLayerVisible) {
        let isSomeSublayerVisible = false;
        Object.values(layer.subjects).forEach(subject => {
          const visible = subject.options.prevVisible ?? true;
          subject.options.visible = visible;
          if (visible) {
            isSomeSublayerVisible = true;
          }
        });
        if (!isSomeSublayerVisible) {
          Object.values(layer.subjects).forEach(subject => {
            subject.options.visible = true;
          });
        }
      } else {
        Object.values(layer.subjects).forEach(subject => {
          subject.options.prevVisible = subject.options.visible;
          subject.options.visible = false;
        });
      }
      return { ...state, [payload.key]: layer };
    case TOGGLE_SUBLAYER_VISIBILITY:
      if (!(payload.layerKey in state
        && payload.sublayerKey in state[payload.layerKey].subjects)) return state;

      const newState = { ...state };
      const { subjects } = state[payload.layerKey];

      const toggledSublayer = subjects[payload.sublayerKey];

      const isVisible = !toggledSublayer.options.visible;
      toggledSublayer.options.prevVisible = !isVisible;
      toggledSublayer.options.visible = isVisible;
      if (isVisible) {
        newState[payload.layerKey].options.visible = true;
      }

      if (Object.values(subjects).every(subject => !subject.options.visible)) {
        newState[payload.layerKey].options.visible = false;
      }
      return newState;
    default: return state;
  }
};

export default layerReducer;
