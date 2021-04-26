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

import kiza1 from '../../assets/layers/kiza/kiza1.json';
import kiza15 from '../../assets/layers/kiza/kiza1.5.json';
import kiza23 from '../../assets/layers/kiza/kiza2.3.json';
import kiza28 from '../../assets/layers/kiza/kiza2.8.json';
import kiza33 from '../../assets/layers/kiza/kiza3.3.json';

import index5 from '../../assets/layers/ib_meb/index5.json';
import index7 from '../../assets/layers/ib_meb/index7.json';
import index9 from '../../assets/layers/ib_meb/index9.json';
import index11 from '../../assets/layers/ib_meb/index11.json';
import index13 from '../../assets/layers/ib_meb/index13.json';
import index15 from '../../assets/layers/ib_meb/index15.json';

import iza14 from '../../assets/layers/iza/iza_1-4.json';
import iza17 from '../../assets/layers/iza/iza_1-7.json';

import izv01 from '../../assets/layers/izv/izv_0-1.json';
import izv03 from '../../assets/layers/izv/izv_0-3.json';
import izv07 from '../../assets/layers/izv/izv_0-7.json';

import span13 from '../../assets/layers/span_1990/span_1-3_1990.json';
import span17 from '../../assets/layers/span_1990/span_1-7_1990.json';
import span23 from '../../assets/layers/span_1990/span_2-3_1990.json';
import span28 from '../../assets/layers/span_1990/span_2-8_1990.json';

import span03_2000 from '../../assets/layers/span_2000/span_0-3_2000.json';
import span07_2000 from '../../assets/layers/span_2000/span_0-7_2000.json';
import span09_2000 from '../../assets/layers/span_2000/span_0-9_2000.json';
import span12_2000 from '../../assets/layers/span_2000/span_1-2_2000.json';

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

const kizas = [
  [kiza1, 'rgba(128, 207, 127, 0.5)'],
  [kiza15, 'rgba(255, 254, 128, 0.5)'],
  [kiza23, 'rgba(239, 184, 127, 0.5)'],
  [kiza28, 'rgba(255, 127, 128, 0.5)'],
  [kiza33, 'rgba(166, 147, 128, 0.5)'],
];

const ibMeb = [
  [index5, 'rgba(79, 40, 0, 0.5)'],
  [index7, 'rgba(254, 0, 0, 0.5)'],
  [index9, 'rgba(207, 104, 1, 0.5)'],
  [index11, 'rgba(255, 255, 1, 0.5)'],
  [index13, 'rgba(0, 176, 0, 0.5)'],
  [index15, 'rgba(1, 80, 0, 0.5)'],
];

const izas = [
  [iza14, 'rgba(253, 233, 141, 0.5)'],
  [iza17, 'rgba(255, 164, 138, 0.5)'],
];

const izvs = [
  [izv01, 'rgba(126, 199, 115, 0.6)'],
  [izv03, 'rgba(244, 242, 217, 0.6)'],
  [izv07, 'rgba(217, 112, 111, 0.6)'],
];

const spans = [
  [
    [span13, 'rgba(255, 192, 124, 0.5)'],
    [span17, 'rgba(255, 95, 95, 0.5)'],
    [span23, 'rgba(255, 0, 0, 0.5)'],
    [span28, 'rgba(148, 0, 0, 0.5)'],
  ],
  [
    [span03_2000, 'rgba(89, 254, 255, 0.5)'],
    [span07_2000, 'rgba(90, 255, 155, 0.5)'],
    [span09_2000, 'rgba(255, 255, 101, 0.5)'],
    [span12_2000, 'rgba(255, 192, 124, 0.5)'],
  ]
];

const PROJECTION = 'EPSG:3857';

const initialState = {
  izhevsk: {
    name: 'Ижевск',
    options: {
      visible: true,
    },
    subjects: {
      noise: {
        name: 'Уровень эквивалентного шума',
        options: {
          visible: false,
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
          visible: false,
          prevVisible: null,
        },
        vectors: emissions.map((emission) => [
          vector({
            features: new GeoJSON().readFeatures(emission, { featureProjection: get(PROJECTION) }),
          }),
          styles.industrialZones
        ])
      },
      kiza: {
        name: 'КИЗА',
        options: {
          visible: false,
          prevVisible: null,
        },
        vectors: kizas.map(([kiza, fillColor]) => [
          vector({
            features: new GeoJSON().readFeatures(kiza, { featureProjection: get(PROJECTION) }),
          }),
          styles.kiza(fillColor)
        ])
      },
      ibMeb: {
        name: 'Индекс медико-экологического благополучия',
        options: {
          visible: false,
          prevVisible: null,
        },
        vectors: ibMeb.map(([ib, fillColor]) => [
          vector({
            features: new GeoJSON().readFeatures(ib, { featureProjection: get(PROJECTION) }),
          }),
          styles.kiza(fillColor)
        ])
      },
      iza: {
        name: 'Индекс загрязнения атмосферного воздуха в среднегодовом исчислении (нач. 2000г.)',
        options: {
          visible: false,
          prevVisible: null,
        },
        vectors: izas.map(([iza, fillColor]) => [
          vector({
            features: new GeoJSON().readFeatures(iza, { featureProjection: get(PROJECTION) }),
          }),
          styles.landscaping(fillColor)
        ])
      },
      izv: {
        name: 'Состояние питьевой воды (нач. 2000г.)',
        options: {
          visible: false,
          prevVisible: null,
        },
        vectors: izvs.map(([izv, fillColor]) => [
          vector({
            features: new GeoJSON().readFeatures(izv, { featureProjection: get(PROJECTION) }),
          }),
          styles.landscaping(fillColor)
        ])
      },
      span1990: {
        name: 'Суммарный показатель антропогенной нагрузки (1990г.)',
        options: {
          visible: false,
          prevVisible: null,
        },
        vectors: spans[0].map(([span, fillColor]) => [
          vector({
            features: new GeoJSON().readFeatures(span, { featureProjection: get(PROJECTION) }),
          }),
          styles.landscaping(fillColor)
        ])
      },
      span2000: {
        name: 'Суммарный показатель антропогенной нагрузки (2000г.)',
        options: {
          visible: false,
          prevVisible: null,
        },
        vectors: spans[1].map(([span, fillColor]) => [
          vector({
            features: new GeoJSON().readFeatures(span, { featureProjection: get(PROJECTION) }),
          }),
          styles.landscaping(fillColor)
        ])
      },
    }
  },
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
