import geojsonBorders from '../../assets/layers/borders.json';
import geojsonRegions from '../../assets/layers/regions.json';
import geojsonRivers from '../../assets/layers/rivers.json';
import geojsonCities from '../../assets/layers/cities.json';
import geojsonOOPT from '../../assets/layers/oopt.json';
import geojsonSeas from '../../assets/layers/seas.json';
import { vector } from '../../components/source';
import GeoJSON from 'ol/format/GeoJSON';
import { get } from 'ol/proj';
import * as styles from '../../core/layers/styles';

const PROJECTION = 'EPSG:3857';

const LAYERS = {
  borders: {
    id: 0,
    name: 'Границы',
    commonStyle: styles.border,
    sources: [
      {
        id: 0,
        layer: vector({
          features: new GeoJSON().readFeatures(geojsonBorders, { featureProjection: get(PROJECTION) }),
        })
      }
    ],
  },
  regions: {
    id: 1,
    name: 'Регионы',
    commonStyle: styles.region,
    sources: [
      {
        id: 0,
        layer: vector({
          features: new GeoJSON().readFeatures(geojsonRegions, { featureProjection: get(PROJECTION) }),
        })
      }
    ]
  },
  rivers: {
    id: 2,
    name: 'Реки',
    commonStyle: styles.river,
    sources: [
      {
        id: 0,
        layer: vector({
          features: new GeoJSON().readFeatures(geojsonRivers, { featureProjection: get(PROJECTION) }),
        })
      }
    ]
  },
  cities: {
    id: 3,
    name: 'Города',
    commonStyle: styles.city,
    sources: [
      {
        id: 0,
        layer: vector({
          features: new GeoJSON().readFeatures(geojsonCities, { featureProjection: get(PROJECTION) }),
        })
      }
    ]
  },
  protectedArea: {
    id: 4,
    name: 'ООПТ',
    commonStyle: styles.oopt,
    sources: [
      {
        id: 0,
        layer: vector({
          features: new GeoJSON().readFeatures(geojsonOOPT, { featureProjection: get(PROJECTION) }),
        })
      }
    ]
  },
  seas: {
    id: 5,
    name: 'Моря',
    commonStyle: styles.oopt,
    sources: [
      {
        id: 0,
        layer: vector({
          features: new GeoJSON().readFeatures(geojsonSeas, { featureProjection: get(PROJECTION) }),
        })
      }
    ]
  },
};

export default LAYERS;
