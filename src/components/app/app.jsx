import React, { useReducer, useRef } from 'react';
import Map from '../map/map';
import { Layers, TileLayer, VectorLayer } from '../layers';
import { osm, vector } from '../source';
import { get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { Controls, FullScreenControl } from '../controls';
import Input from '../input/input';
import * as actions from '../../constants/actions';
import * as styles from '../../core/layers/styles';
import './app.scss';

const geojsonObjectBorders = require('../../assets/layers/borders.json');
const geojsonObjectRegions = require('../../assets/layers/regions.json');
const geojsonObjectRivers = require('../../assets/layers/rivers.json');
const geojsonObjectCities = require('../../assets/layers/cities.json');
const geojsonObjectOOPT = require('../../assets/layers/oopt.json');
const geojsonObjectSeas = require('../../assets/layers/seas.json');

const initialState = {
  osm: {
    visible: true,
  },
  borders: {
    visible: true,
  },
  regions: {
    visible: true,
  },
  rivers: {
    visible: true,
  },
  cities: {
    visible: true,
  },
  oopt: {
    visible: true,
  },
  seas: {
    visible: true,
  },
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case actions.OSM.SHOW:
      return {
        ...state,
        osm: {
          ...state.osm,
          visible: payload
        }
      };
    case actions.BORDERS.SHOW:
      return {
        ...state,
        borders: {
          ...state.borders,
          visible: payload
        }
      };
    case actions.REGIONS.SHOW:
      return {
        ...state,
        regions: {
          ...state.regions,
          visible: payload
        }
      };
    case actions.RIVERS.SHOW:
      return {
        ...state,
        rivers: {
          ...state.rivers,
          visible: payload
        }
      };
    case actions.CITIES.SHOW:
      return {
        ...state,
        cities: {
          ...state.cities,
          visible: payload
        }
      };
    case actions.OOPT.SHOW:
      return {
        ...state,
        oopt: {
          ...state.oopt,
          visible: payload
        }
      };
    case actions.SEAS.SHOW:
      return {
        ...state,
        seas: {
          ...state.seas,
          visible: payload
        }
      };
    default: return state;
  }
};

const App = () => {
  const zoom = useRef(9);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCheckbox = (actionType) => (event) => dispatch({ type: actionType, payload: event.target.checked });

  return (
    <div className='app'>
      <Map zoom={zoom.current}>
        <Layers>
          {state.osm.visible && (
            <TileLayer
              source={osm()}
              zIndex={0}
            />
          )}
          <VectorLayer
            source={vector({
              features: new GeoJSON().readFeatures(geojsonObjectBorders, { featureProjection: get('EPSG:3857') }),
            })}
            style={styles.border}
            options={state.borders}
          />
          <VectorLayer
            source={vector({
              features: new GeoJSON().readFeatures(geojsonObjectRegions, { featureProjection: get('EPSG:3857') }),
            })}
            style={styles.region}
            options={state.regions}
          />
          <VectorLayer
            source={vector({
              features: new GeoJSON().readFeatures(geojsonObjectRivers, { featureProjection: get('EPSG:3857') }),
            })}
            style={styles.river}
            options={state.rivers}
          />
          <VectorLayer
            source={vector({
              features: new GeoJSON().readFeatures(geojsonObjectCities, { featureProjection: get('EPSG:3857') }),
            })}
            style={styles.city}
            options={state.cities}
          />
          <VectorLayer
            source={vector({
              features: new GeoJSON().readFeatures(geojsonObjectOOPT, { featureProjection: get('EPSG:3857') }),
            })}
            style={styles.oopt}
            options={state.oopt}
          />
          <VectorLayer
            source={vector({
              features: new GeoJSON().readFeatures(geojsonObjectSeas, { featureProjection: get('EPSG:3857') }),
            })}
            style={styles.oopt}
            options={state.seas}
          />
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
        <Controls className='ol-map__controls'>
          <Input
            type="checkbox"
            checked={state.osm.visible}
            onChange={handleCheckbox(actions.OSM.SHOW)}
            label='Карта OSM'
          />
          <Input
            type="checkbox"
            checked={state.borders.visible}
            onChange={handleCheckbox(actions.BORDERS.SHOW)}
            label='Границы'
          />
          <Input
            type="checkbox"
            checked={state.regions.visible}
            onChange={handleCheckbox(actions.REGIONS.SHOW)}
            label='Регионы'
          />
          <Input
            type="checkbox"
            checked={state.rivers.visible}
            onChange={handleCheckbox(actions.RIVERS.SHOW)}
            label='Реки'
          />
          <Input
            type="checkbox"
            checked={state.seas.visible}
            onChange={handleCheckbox(actions.SEAS.SHOW)}
            label='Моря'
          />
          <Input
            type="checkbox"
            checked={state.oopt.visible}
            onChange={handleCheckbox(actions.OOPT.SHOW)}
            label='ООПТ'
          />
          <Input
            type="checkbox"
            checked={state.cities.visible}
            onChange={handleCheckbox(actions.CITIES.SHOW)}
            label='Города'
          />
        </Controls>
      </Map>
    </div>
  );
};

export default App;
